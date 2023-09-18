import { ScalaFormatter, ScalaConfig, TypescriptFormatter, TypescriptConfig } from './formatters';
import { JSONSchema, JSONSchemaEnum, InputConfig, ParsedJSONSchema, ValidationResult, AttrGenericType, Entity, Attribute, AttributeType } from './types';
import $RefParser from '@apidevtools/json-schema-ref-parser';

/**
 * Converts given JSON schema into provided formatters
 * @param schema
 * @param config
 */
export const scala = async (schema: JSONSchema, config: ScalaConfig): Promise<string> => {
  return convert(schema, config)
    .then(parsed => new ScalaFormatter().format(parsed, config));
}

/**
 * Converts given JSON schema into provided formatters
 * @param schema
 * @param config
 */
export const typescript = async (schema: JSONSchema, config: TypescriptConfig): Promise<string> => {
  return convert(schema, config)
    .then(parsed => new TypescriptFormatter().format(parsed, config));
}

// -----------------------------------------
// Internal API
// -----------------------------------------

const convert = async (schema: JSONSchema, config: InputConfig): Promise<ParsedJSONSchema> => {

  // Validate input schema
  const validation = validate(schema)
  if (!validation.valid) {
    throw new Error(`Invalid JSON Schema: ${validation.errors.join('\n')}`)
  }

  // Sanitize input schema
  const resolvedSchema = await resolveRefs(sanitize(schema, config));
  if (resolvedSchema.error || !resolvedSchema.result) {
    throw new Error(`Error resolving schema references: ${resolvedSchema.error}`)
  }

  // Recursively parse the schema
  return parse(resolvedSchema.result, config);

}

/**
 * Validates given JSON Schema
 * @param schema
 * @returns
 */
const validate = (schema: JSONSchema): ValidationResult => {
  return { valid: true, errors: [] }
}

/**
 * Extract last readable chunk from "$ref" path. For example: "#/definitions/Top" -> "Top".
 * @param path Reference path to sanitize
 * @param config Schema conversion config
 * @returns Extracted readable path identifier
 */
const getObjectNameFromRefPath = (path: string, config: InputConfig): string => {
  if (!path) return config.defaultTopLevelCaseClassName;
  else {
    const pathChunks = path.split('/');
    return pathChunks[pathChunks.length - 1];
  }
}

/**
 * If top-level schema is not an "object" but has "definitions".
 * We sanitize this object because this schema is not handled by `$RefParser`.
 *
 * @param schema Schema to sanitize
 * @param config Schema conversion config
 * @returns Sanitized schema
 */
const sanitize = (schema: JSONSchema, config: InputConfig): JSONSchema => {
  if (!schema.properties && schema.definitions && schema.$ref) {
    const { $ref, ...schemaData } = schema;
    schemaData.type = 'object';
    const key = getObjectNameFromRefPath($ref, config);
    schemaData.properties = { [key]: { $ref } };
    return schemaData;
  }
  return schema;
}

/**
 * Parse remote and local references in JSON Schema
 * @param schema
 */
export const resolveRefs = async (schema: any): Promise<any> => {
  const onDereference = (path: string, value: any) => { value.dereferenceSource = path; }
  return $RefParser
    .dereference(schema, { dereference: { circular: 'ignore', onDereference } })
    .then((result: any) => { return { error: null, schema: result } })
    .catch((err: any) => { return { error: err, schema: null } });
};

// -----------------------------------------
// JSON Schema Parsing
// -----------------------------------------

/**
 * Start parsing schema
 * @param schema Schema to parse
 * @param config Schema conversion config
 * @returns A list of entities
 */
const parse = async (schema: JSONSchema, config: InputConfig): Promise<ParsedJSONSchema> => {
  const entities: Entity[] = [];
  processDefinitions(schema, config, 0, entities);
  if (schema.type && schema.type === 'object') {
    const topLevelEntity = processObject(schema, config, 0, entities, schema.title || config.defaultTopLevelCaseClassName);
    entities.push(topLevelEntity);
  }
  return { entities };
}

/**
 * Process "definitions" block. This happens only when the top-level object does not an "object".
 *
 * @param schema Schema to extract "definitions" from
 * @param config Schema conversion config
 * @param depth Depth of the current object from root
 * @param entities A list of entities
 */
const processDefinitions = (schema: JSONSchema, config: InputConfig, depth: number, entities: Entity[]) => {
  if (schema.definitions && typeof schema.definitions === 'object' && !schema.properties && !schema.allOf) {
    for (const name in schema.definitions) {
      const definition = schema.definitions[name];
      if (typeof definition !== 'boolean') {
        const defType = getObjectType(definition, config.defaultType);
        if (defType === 'object') {
          const entity: Entity = processObject(schema, config, depth, entities, name);
          entities.push(entity);
        }
      }
    }
  }
};

/**
 * Get the type of JSONSchema object
 * @param obj Schema object
 * @param defaultType Default type to use
 * @returns Type of the object
 */
const getObjectType = (obj: any, defaultType: string): string | null => {
  const objType = typeof obj;
  if (objType !== 'object') {
    return objType;
  }
  if (obj.type) return obj.type
  else if (obj.enum) {
    if (Array.isArray(obj.enum) && obj.enum.length) {
      return typeof obj.enum[0];
    } else {
      return defaultType;
    }
  }
  return objType;
}

/**
 * Processes array type. Array is converted into an Attribute type which is referenced in some entity.
 * @param schema Schema object to parse
 * @param config Schema conversion config
 * @param depth Current depth of the object from root
 * @param entities Entities collection
 * @param identifier Name to use for nested array of objects
 * @returns An Attribute that can be used in upstream entity
 */
const processArray = (schema: JSONSchema, config: InputConfig, depth: number, entities: Entity[], identifier?: string): AttributeType => {
  if (!schema.items || typeof schema.items !== 'object') return { primary: config.defaultType };
  const itemType = getObjectType(schema.items, config.defaultType);
  let attrType: String | Entity = null;
  let itemGenericType: AttrGenericType = null;
  switch (itemType) {
    case 'object':
      attrType = processObject(schema, config, depth + 1, entities, identifier);
      break;
    case 'array':
      attrType = 'array';
      itemGenericType = processArray(schema.items, config, depth + 1, entities, identifier);
      break;
  }
  return {
    primary: attrType,
    generic: itemGenericType
  };
}

/**
 * Process schema "object" type and convert it to {@link Entity}.
 * @param schema - Object schema
 * @param config - Conversion configuration
 * @param depth - Current depth of the object from root
 * @param entities - Existing set of entities
 * @param identifier - Name of the entity to be created
 * @returns An {@link Entity}
 */
const processObject = (schema: JSONSchema, config: InputConfig, depth: number, entities: Entity[], identifier?: string): Entity => {
  const attributes: Attribute[] = [];
  if (schema.properties && typeof schema.properties === 'object') {
    for (const name in schema.properties) {
      const property = schema.properties[name];
      if (typeof property === 'object') {
        const attribute: Attribute = processProperty(property, config, depth, entities, name);
        if (Array.isArray(schema.required) && !attribute.required) {
          attribute.required = schema.required.indexOf(name) > -1;
        }
        attributes.push(attribute);
      }
    }
  }
  return { name: identifier, description: schema.description, attributes: attributes, constraints: [] };
};

/**
 * Extract enumerations from given schema.
 * @param schema It could be a property or `property.items` fro array.
 * @returns Extracted enumerations (if any)
 */
const extractEnumerations = (schema: JSONSchema): JSONSchemaEnum[] => {
  return schema.enum && schema.enum.length ? schema.enum : [];
};

/**
 * Process object's property and convert it to {@link Attribute}
 * @param schema - Object property schema
 * @param config - Conversion configuration
 * @param depth - Current depth of the object from root
 * @param entities - Existing set of entities
 * @param identifier - Name of the attribute to be created
 * @returns An {@link Attribute}
 */
const processProperty = (schema: JSONSchema, config: InputConfig, depth: number, entities: Entity[], identifier: string): Attribute => {
  const schemaType = getObjectType(schema, config.defaultType);
  let attrType: String | Entity = null;
  let attrGenericType: AttrGenericType = null;
  let enumerations: JSONSchemaEnum = [];
  switch (schemaType) {
    case 'object':
      attrType = processObject(schema, config, depth + 1, entities, identifier);
      break;
    case 'array':
      attrType = 'array';
      attrGenericType = processArray(schema, config, depth + 1, entities);
      if (typeof schema.items === 'object') {
        enumerations = extractEnumerations(schema.items);
      }
      break;
    default:
      attrType = schemaType;
      enumerations = extractEnumerations(schema);
  }
  const required = typeof schema.required === 'boolean' ? schema.required : false;
  return {
    name: identifier,
    type: {
      primary: attrType,
      generic: attrGenericType
    },
    description: schema.description,
    required,
    enumerations
  };

}
