import { IConfigResolved, ICaseClassDef, IResolveRefsResult, ICaseClassDefParams, TextCaseFn } from './interfaces';

import get from 'lodash/get';
import map from 'lodash/map';
import mergeWith from 'lodash/mergeWith';

import * as allTextCases from 'change-case';

import $RefParser from '@apidevtools/json-schema-ref-parser';
import { validations } from './validations';

/** Type mapping between JSON Schema and Scala **/
const typeMap = {
  integer: 'Int',
  string: 'String',
  number: 'Double',
  boolean: 'Boolean',
  array: 'List',
  object: 'Any'
};

const subSchemaIdentifiers: Array<string> = ['type', 'properties']

// Export list of supported text cases and their transform functions.
// Keys of this object can be used for `classNameTextCase` and `classParamsTextCase` config.
export const supportedTextCases: {[key: string]: TextCaseFn} = Object.keys(allTextCases)
  .filter(d => d.endsWith('Case'))
  .reduce((acc, key) => {
    return { ...acc, [key]: get(allTextCases, key) }
  }, {});

/**
 * Validates if provided schema is valid.
 * TODO: Add more validates as deem necessary.
 *
 * @param schema
 */
export const validate = async (schema: any) : Promise<boolean> => {
  if (!schema.properties) throw new Error('Required field not found or null: "properties"');
  return true;
};

/**
 * This function basically strips the JSON Schema into simplified format
 * which can be used by formatter(s).
 *
 * @param schema
 * @param config
 */
export const stripSchema = async (schema: any, config: IConfigResolved) : Promise<ICaseClassDef> => {
  return stripSchemaObject(schema, 1, config.topLevelCaseClassName, config);
};

/**
 * Parse remote and local references in JSON Schema
 * @param schema
 */
export const resolveRefs = async (schema: any): Promise<IResolveRefsResult> => {
  return $RefParser
    .dereference(schema, { dereference: { circular: 'ignore' } })
    .then(result => { return { error: null, schema: result } })
    .catch(err => { return { error: err, schema: null } });
};

/**
 * Extract composit validation fields from the properties object.
 * We currently only support `allOf`. Here we only extract validation
 * fields. Nested subSchemas are resolved in a step before this.
 *
 * @param paramObject
 */
const extractCompositValidations = (paramObject: any): { allOf: Array<any>} => {
  const allOf: Array<any> = paramObject.allOf || [];
  const filtered = allOf.filter(subSchema => {
    return !subSchemaIdentifiers.some(key => key in subSchema)
  })
  return { allOf: filtered }
};

/**
 * Extract validation fields from the properties object.
 *
 * @param paramObject
 */
const extractValidations = (paramObject: any): {[key: string]: any} => {
  return Object.keys(paramObject)
    .filter(key => validations[key])
    .reduce((res: any, key: string) => {
      return { ...res, [key]: paramObject[key] };
    }, {})
};

const customizer = (objValue: any, srcValue: any) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

/**
 * Resolves composit sub-schema from `allOf`.
 * `anyOf` and `oneOf` are not yet supported.
 *
 *  @param paramObject
 */
const resolveCompositSubSchema = (paramObject: any) => {
  const allOf: Array<any> = paramObject.allOf || [];
  allOf.forEach(subSchema => {
    if (subSchemaIdentifiers.some(key => key in subSchema)) {
      paramObject = mergeWith(subSchema, paramObject, customizer)
    }
  })
  return paramObject
}

/**
 * Recursive function that traverses the nested JSON Schema
 * and generates the simplified version of it. Every level of the schema
 * becomes one case class.
 *
 * @param schemaObject - Schema object to parse.
 * @param currentDepth - Current depth of schema object being parsed.
 * @param entityTitle - Used for case class name if 'title' field is not provided.
 * @param config - configuration instance.
 */
const stripSchemaObject = (schemaObject: any, currentDepth: number, entityTitle: string, config: IConfigResolved) : ICaseClassDef => {

  // Text cases
  const classNameTextCase = get(supportedTextCases, config.classNameTextCase, (x: string) => x);
  const classParamsTextCase = get(supportedTextCases, config.classParamsTextCase, (x: string) => x);

  // Use schema object 'title' field to derive case class name.
  // For nested properties, use the object 'key' as case class name.
  // For top-level case class it will use `caseClassName` if 'title' field is not provided.
  const schemaObjectTitle: string = get(schemaObject, 'title', entityTitle);
  const entityName: string = classNameTextCase.call(supportedTextCases, schemaObjectTitle);
  const entityDescription: string = get(schemaObject, 'description');
  const requiredParams: string[] = get(schemaObject, 'required', []);

  // Transform every parameter of this schema object
  const parameters: ICaseClassDefParams[] = map(schemaObject.properties, (paramObject, key) => {

    // Resolve Sub-schema
    paramObject = resolveCompositSubSchema(paramObject)

    // Get and convert case class parameter's name, type and description
    const paramName = classParamsTextCase(key);
    const description: string = paramObject.description;
    const validations = extractValidations(paramObject);
    const compositValidations = extractCompositValidations(paramObject);
    let nestedObject: ICaseClassDef | null = null;
    let genericType: string | null = null;
    let enumeration: Array<string|number> | null = null;

    // Check if parameter has enumeration
    if ('enum' in paramObject && Array.isArray(paramObject.enum) && paramObject.enum.length) {
      enumeration = paramObject.enum;
      if (enumeration && 'type' in paramObject === false) {
        paramObject.type = typeof enumeration[0]
      }
    }

    // For nested objects, use parameter name as
    // case class name ( if title property is not defined )
    let paramType: string = get(typeMap, paramObject.type, config.defaultGenericType);
    if (config.maxDepth === 0 || currentDepth < config.maxDepth) {
      if (paramObject.type === 'object') {
        nestedObject = stripSchemaObject(paramObject, currentDepth + 1, paramName, config);
        paramType = nestedObject.entityName;
      } else if (paramObject.type === 'array') {
        if (paramObject.items.type !== 'object') {
          enumeration = paramObject.items.enum ? paramObject.items.enum : enumeration;
          genericType = get(typeMap, paramObject.items.type, config.defaultGenericType);
        } else {
          nestedObject = stripSchemaObject(paramObject.items, currentDepth + 1, paramName, config);
          genericType = nestedObject.entityName;
        }
      }
    } else {
      if (paramObject.type === 'object') {
        paramType = config.defaultGenericType;
      } else if (paramObject.type === 'array') {
        genericType = config.defaultGenericType;
      }
    }

    // Parameter level data
    return {
      paramName,
      isRequired: requiredParams.includes(key),
      paramType,
      genericType,
      enumeration,
      description,
      validations,
      compositValidations,
      nestedObject
    };

  });

  // Return parsed result for this schema object
  return {
    entityName,
    entityDescription,
    parameters
  };

};
