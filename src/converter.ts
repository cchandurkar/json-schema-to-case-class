import { IConfigResolved, ICaseClassDef, IResolveRefsResult, IConfig } from './interfaces';

import get from 'lodash/get';
import map from 'lodash/map';

import * as allTextCases from 'change-case';

import $RefParser from '@apidevtools/json-schema-ref-parser';
import { Config } from './config';
import { format } from './formatter';
import { validations } from './validations';

export {
  supportedTextCases,
  convert,
  validate,
  stripSchema,
  resolveRefs
}

/** Type mapping between JSON Schema and Scala **/
const typeMap = {
  integer: 'Int',
  string: 'String',
  number: 'Double',
  boolean: 'Boolean',
  array: 'List',
  object: 'Any'
};

// Export list of supported text cases and their transform functions.
// Keys of this object can be used for `classNameTextCase` and `classParamsTextCase` config.
const supportedTextCases = Object.keys(allTextCases)
  .filter(d => d.endsWith('Case'))
  .reduce((acc, key) => {
    return { ...acc, [key]: get(allTextCases, key) }
  }, {});

/**
 * 1. Validate schema.
 * 2. Resolve local/remote schema references.
 * 3. Strip JSON schema into simplified format.
 * 4. Format simplified schema into format
 *
 * @param schema
 * @param config
 */
const convert = async (schema: any, config?: IConfig): Promise<string> => {
  const resolved = Config.resolve(config);
  return validate(schema)
    .then(() => resolveRefs(schema))
    .then(res => stripSchema(res.schema, resolved))
    .then(res => format(res, resolved))
};

/**
 * Validates if provided schema is valid.
 * TODO: Add more validates as deem necessary.
 *
 * @param schema
 */
const validate = async (schema: any) : Promise<boolean> => {
  console.assert(schema.properties, 'Required field not found or null: "properties"');
  return true;
};

/**
 * This function basically strips the JSON Schema into simplified format
 * which can be used by formatter(s).
 *
 * @param schema
 * @param config
 */
const stripSchema = async (schema: any, config: IConfigResolved) : Promise<ICaseClassDef> => {
  return stripSchemaObject(schema, 1, config.topLevelCaseClassName, config);
};

/**
 * Parse remote and local references in JSON Schema
 * @param schema
 */
const resolveRefs = async (schema: any): Promise<IResolveRefsResult> => {
  return $RefParser
    .dereference(schema, { dereference: { circular: 'ignore', onDereference: (path, value) => {} } })
    .then(result => { return { error: null, schema: result } })
    .catch(err => { return { error: err, schema: null } });
};

/**
 * Extract validation fields from the properties object.
 *
 * @param paramName
 * @param paramObject
 */
const extractValidations = (paramName: string, paramObject: any): any => {
  return Object.keys(paramObject)
    .filter(key => validations[key])
    .reduce((res: any, key: string) => {
      return { ...res, [key]: paramObject[key] };
    }, {})
};

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
  const classNameTextCase = get(supportedTextCases, config.classNameTextCase, (x: string|null) => x);
  const classParamsTextCase = get(supportedTextCases, config.classParamsTextCase, (x: string|null) => x);

  // Use schema object 'title' field to derive case class name.
  // For nested properties, use the object 'key' as case class name.
  // For top-level case class it will use `caseClassName` if 'title' field is not provided.
  const schemaObjectTitle = get(schemaObject, 'title', entityTitle);
  const entityName = classNameTextCase.call(supportedTextCases, schemaObjectTitle);
  const entityDescription = get(schemaObject, 'description');
  const requiredParams = get(schemaObject, 'required', []);

  // Transform every parameter of this schema object
  const parameters = map(schemaObject.properties, (paramObject, key) => {

    // Get and convert case class parameter's name, type and description
    const paramName = classParamsTextCase.call(supportedTextCases, key);
    const description = paramObject.description;
    const validations = extractValidations(paramName, paramObject);
    let nestedObject = null;
    let genericType = null;
    let enumeration = null;

    // Check if parameter has enumeration
    if (paramObject.enum) {
      enumeration = paramObject.enum;
    }

    // For nested objects, use parameter name as
    // case class name ( if title property is not defined )
    let paramType = get(typeMap, paramObject.type, config.defaultGenericType);
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
      isRequired: requiredParams.includes(key),
      paramName,
      paramType,
      genericType,
      enumeration,
      description,
      validations,
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
