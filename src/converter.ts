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
  const fields = ['properties', 'definition'];
  if (!Object.keys(schema).filter(fields.includes.bind(fields))) {
    throw new Error(`Require at least of of the field at top-level: ${fields}`);
  }
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

export const getSanitizers = (schema: any, config: IConfigResolved): any => {
  const hasTopLevelRef = ('properties' in schema === false) && 'definitions' in schema && '$ref' in schema;
  return {
    pre: () => preResolveSanitize(schema, hasTopLevelRef, config),
    post: (resolvedSchema: ICaseClassDef) => postResolveSanitize(resolvedSchema, hasTopLevelRef)
  }
}

const preResolveSanitize = (schema: any, hasTopLevelRef: boolean, config: IConfigResolved): any => {
  if (hasTopLevelRef) {
    const { $ref, ...schemaData } = schema;
    schemaData.type = 'object';
    schemaData.properties = { [config.topLevelCaseClassName]: { $ref } };
    return schemaData;
  }
  return schema
}

const postResolveSanitize = (resolvedSchema: ICaseClassDef, hasTopLevelRef: boolean) => {
  return hasTopLevelRef ? resolvedSchema.parameters[0].nestedObject : resolvedSchema;
}

/**
 * Parse remote and local references in JSON Schema
 * @param schema
 */
export const resolveRefs = async (schema: any): Promise<IResolveRefsResult> => {
  return $RefParser
    .dereference(schema, { dereference: { circular: 'ignore' } })
    .then((result: any) => { return { error: null, schema: result } })
    .catch((err: any) => { return { error: err, schema: null } });
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

const getJsonSchemaObjectType = (schemaObject: any): string => {
  if (schemaObject.type === 'array' || schemaObject.items) { return 'array'; }
  if (schemaObject.type === 'object' || schemaObject.properties) { return 'object'; }
  return schemaObject.type;
};

const getRequired = (schemaObject: any): boolean | Array<string> => {
  if (!schemaObject || !schemaObject.required) return false;
  return schemaObject.required;
}

const hasDepthConditionMet = (config: IConfigResolved, currentDepth: number): boolean => {
  return config.maxDepth !== 0 && currentDepth >= config.maxDepth
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
  const requiredParams: boolean | string[] = get(schemaObject, 'required', false);

  // iterate over either `properties` or `definitions` array
  const topLevelProperties: any = schemaObject.properties;
  const parameters: ICaseClassDefParams[] = map(topLevelProperties, (paramObject, key) => {

    // Resolve Sub-schema
    paramObject = resolveCompositSubSchema(paramObject)

    // Get and convert case class parameter's name, type and description
    const paramName = classParamsTextCase(key);
    const description: string = paramObject.description;
    const validations = extractValidations(paramObject);
    const compositValidations = extractCompositValidations(paramObject);
    let nestedObject: ICaseClassDef | null = null;

    // Check if parameter has enumeration
    let enumeration: Array<string|number> | null = null;
    if ('enum' in paramObject && Array.isArray(paramObject.enum) && paramObject.enum.length) {
      enumeration = paramObject.enum;
      if (enumeration && 'type' in paramObject === false) {
        paramObject.type = typeof enumeration[0]
      }
    }

    const processPropertyField = (nestedSchemaObject: any): any => {

      // Get object type and paramType
      const paramObjectType = getJsonSchemaObjectType(nestedSchemaObject);
      let paramType: string = get(typeMap, paramObjectType, config.defaultGenericType);
      let genericType: string | null = paramType === 'List' ? config.defaultGenericType : null;

      // If we have reached the depth limit, bail-out
      if (hasDepthConditionMet(config, currentDepth)) {
        return { paramType, genericType };
      }

      // Process nested array first as it does not consume depth
      if (paramObjectType === 'array') {
        const arrayItemType = getJsonSchemaObjectType(nestedSchemaObject.items);
        if (arrayItemType === 'object') {
          nestedObject = stripSchemaObject(nestedSchemaObject.items, currentDepth + 1, paramName, config);
          genericType = nestedObject.entityName
        } else {
          enumeration = nestedSchemaObject.items.enum ? nestedSchemaObject.items.enum : enumeration;
          const nestedTypes = processPropertyField(nestedSchemaObject.items);
          genericType = nestedTypes.paramType;
          if (nestedTypes.genericType) {
            genericType += `[${nestedTypes.genericType}]`;
          }
        }
      }

      // Process nested objects
      if (paramObjectType === 'object') {
        nestedObject = stripSchemaObject(nestedSchemaObject, currentDepth + 1, paramName, config);
        paramType = nestedObject.entityName;
      }

      return { paramType, genericType };

    }

    const { paramType, genericType } = processPropertyField(paramObject);

    // 1. Either object property has `required` boolean field set to true OR
    // 2. ParamName is present in the parent object's required array.
    const paramObjectRequiredField = 'required' in paramObject && getRequired(paramObject) === true;
    const paramObjectRequired = Array.isArray(requiredParams) && requiredParams.includes(key);
    const isRequired = paramObjectRequiredField || paramObjectRequired;
    return {
      paramName,
      isRequired,
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
