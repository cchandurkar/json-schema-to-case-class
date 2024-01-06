import { IConfigResolved, IEntity, IResolveRefsResult, IAttribute, TextCaseFn } from './interfaces';
import get from 'lodash/get';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import mergeWith from 'lodash/mergeWith';

import * as allTextCases from 'change-case';

import $RefParser from '@apidevtools/json-schema-ref-parser';
import { validations } from './validations';

/** Type mapping between JSON Schema and Scala **/
// const typeMap = {
//   integer: 'Int',
//   string: 'String',
//   number: 'Double',
//   boolean: 'Boolean',
//   array: 'List',
//   object: 'Any'
// };

// /** Type mapping between JSON Schema and Scala **/
// const typeMap = {
//   integer: 'int',
//   string: 'string',
//   number: 'float',
//   boolean: 'boolean',
//   array: 'array',
//   object: 'record',
//   null: 'null'
// };

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
    throw new Error(`Require at least one of the following fields at top-level: ${fields}`);
  }
  return true;
};

// export const getSanitizers = (schema: any, config: IConfigResolved): any => {
//   const hasTopLevelRef = ('properties' in schema === false) && 'definitions' in schema && '$ref' in schema;
//   return {
//     pre: () => preResolveSanitize(schema, hasTopLevelRef, config),
//     post: (resolvedSchema: ICaseClassDef) => postResolveSanitize(resolvedSchema, hasTopLevelRef)
//   }
// }

// const preResolveSanitize = (schema: any, hasTopLevelRef: boolean, config: IConfigResolved): any => {
//   if (hasTopLevelRef) {
//     const { $ref, ...schemaData } = schema;
//     schemaData.type = 'object';
//     schemaData.properties = { [config.topLevelCaseClassName]: { $ref } };
//     return schemaData;
//   }
//   return schema
// }

// const postResolveSanitize = (resolvedSchema: ICaseClassDef, hasTopLevelRef: boolean) => {
//   return hasTopLevelRef ? resolvedSchema.parameters[0].nestedObject : resolvedSchema;
// }

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

const arrayMerge = (objValue: any, srcValue: any) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

const arrayMergeUnique = (objValue: any, srcValue: any) => {
  if (Array.isArray(objValue)) {
    return uniq(objValue.concat(srcValue));
  }
}

/**
 * Resolves composit sub-schema from `allOf`.
 * `anyOf` and `oneOf` are not yet supported.
 *
 *  @param paramObject
 */
const resolveCompositSubSchema = (paramObject: any) => {
  if (paramObject.oneOf) {
    return resolveOneOf(paramObject);
  } else if (paramObject.allOf) {
    return resolveAllOf(paramObject);
  } else {
    return paramObject;
  }
}

const resolveAllOf = (paramObject: any) => {
  const allOf: Array<any> = paramObject.allOf || [];
  allOf.forEach(subSchema => {
    if (subSchemaIdentifiers.some(key => key in subSchema)) {
      paramObject = mergeWith(subSchema, paramObject, arrayMerge)
    }
  })
  return paramObject
}

const resolveOneOf = (paramObject: any) => {
  const oneOf: any[] = paramObject.oneOf || [];
  const oneOfNonNull: any[] = oneOf.filter(subschema => subschema.type !== 'null');
  if (oneOfNonNull.length === 1) {
    paramObject = oneOfNonNull[0];
  }
  return paramObject;
}

const getJsonSchemaObjectType = (schemaObject: any): string => {
  if (schemaObject.type === 'array' || schemaObject.items) { return 'array'; }
  if (schemaObject.type === 'object' || schemaObject.properties) { return 'object'; }
  if (Array.isArray(schemaObject.type)) {
    const nonNullTypes = schemaObject.type.filter((t: string) => t !== 'null');
    if (nonNullTypes.length === 1) {
      return nonNullTypes[0];
    }
  }
  return schemaObject.type;
};

const getRequired = (schemaObject: any): boolean | Array<string> => {
  if (!schemaObject || !schemaObject.required) return false;
  return schemaObject.required;
}

/**
 * Parses JSON schema into entities and attributes
 *
 * @param schema
 * @param config
 */
export const parse = async (schema: any, config: IConfigResolved) : Promise<IEntity[]> => {
  const entities: IEntity[] = [];
  const registry = { entities, entitiesTypeMap: { } };

  // If schema only has `definitions` but no `properties` or schema compositions, process that first.
  // Delete top-level `$ref` as it's references do not get resolved properly.
  if('$ref' in schema) {
    delete schema['$ref'];
  }
  handleTopLevelReferences(schema, config, registry);

  return traverse(schema, config.topLevelEntityName, config);
};

/**
 * Process "definitions" block. This happens only when the top-level object does not an "object".
 *
 * @param schema Schema to extract "definitions" from
 * @param config Schema conversion config
 * @param depth Depth of the current object from root
 * @param entities A list of entities
 */
const handleTopLevelReferences = (schema: any, config: IConfigResolved, registry: any) => {
  if ('definitions' in schema && ) {
    delete schema['$ref'];
  }
};



const processObject = (schema: any, config: IConfigResolved, entities: Entity[])

/**
 * Recursive function that traverses the nested JSON Schema
 * and generates the simplified version of it. Every level of the schema
 * becomes one case class.
 *
 * @param currentDepth - Current depth of schema object being parsed.
 * @param entityTitle - Used for case class name if 'title' field is not provided.
 * @param config - configuration instance.
 */
const traverse = (schemaObject: any, entityTitle: string, config: IConfigResolved) : ICaseClassDef => {

  // Text cases
  const entityTextCase = get(supportedTextCases, config.entityTextCase, (x: string) => x);
  const attributeTextCase = get(supportedTextCases, config.attributeTextCase, (x: string) => x);

  // Use schema object 'title' field to derive case class name.
  // For nested properties, use the object 'key' as case class name.
  // For top-level case class it will use `caseClassName` if 'title' field is not provided.
  const schemaObjectTitle: string = get(schemaObject, 'title', entityTitle);
  const entityName: string = entityTextCase.call(supportedTextCases, schemaObjectTitle);
  const entityDescription: string = get(schemaObject, 'description');
  const requiredParams: boolean | string[] = get(schemaObject, 'required', false);

  // Flatten If-then-else
  // `if` is usually set on existing `properties` so we can ignore that for now.
  if ('if' in schemaObject) {
    if ('then' in schemaObject) {
      schemaObject = mergeWith(schemaObject.then, schemaObject, arrayMergeUnique);
    }
    if ('else' in schemaObject) {
      schemaObject = mergeWith(schemaObject.then, schemaObject, arrayMergeUnique);
    }
  }

  // iterate over either `properties` or `definitions` array
  const topLevelProperties: any = schemaObject.properties;

  const parameters: ICaseClassDefParams[] = map(topLevelProperties, (paramObject, key) => {

    // Resolve Sub-schema
    paramObject = resolveCompositSubSchema(paramObject);

    // Get and convert case class parameter's name, type and description
    const paramName = attributeTextCase(key);
    const description: string = paramObject.description;
    const validations = extractValidations(paramObject);
    const compositValidations = extractCompositValidations(paramObject);
    let nestedObject: ICaseClassDef | null = null;

    // Check if parameter has `const`
    if ('type' in paramObject === false && 'const' in paramObject) {
      paramObject.type = typeof paramObject.const;
    }

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
      let genericType: string | null = paramType === 'array' ? config.defaultGenericType : null;

      // Process nested array first as it does not consume depth
      if (paramObjectType === 'array' && nestedSchemaObject.items) {
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
