import { ScalaFormatter, ScalaConfig, TypescriptFormatter, TypescriptConfig } from './formatters';

import { JSONSchema, InputConfig, ParsedJSONSchema, ValidationResult, RefResolveResult, JSONSchemaDefinition, Entity } from './types';

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
  const resolvedSchema = await resolveRefs(sanitize(schema));
  if (resolvedSchema.error || !resolvedSchema.result) {
    throw new Error(`Error resolving schema references: ${resolvedSchema.error}`)
  }

  // Recursively parse the schema
  return parse(resolvedSchema.result, config)
}

const validate = (schema: JSONSchema): ValidationResult => {
  return { valid: true, errors: [] }
}

/**
 * Sanitizes input JSON Schema so that it can be processed easily. It does:
 * 1. If schemas only has `definitions` and not `properties`
 * @param schema 
 * @returns 
 */
const sanitize = (schema: JSONSchema): JSONSchema => {
  return schema;
}

const resolveRefs = async (schema: JSONSchema): Promise<RefResolveResult> => {
  return { error: null, result: schema };
}

// -----------------------------------------
// JSON Schema Parsing
// -----------------------------------------

const parse = async (schema: JSONSchema, config: InputConfig): Promise<ParsedJSONSchema> => {
  return processObject(schema, config, 0, undefined, new Map());
}

const validateObject = (obj: JSONSchema, config: InputConfig): ValidationResult => {
  return { valid: true, errors: [] }
}

const get_object_type = (obj: any): string | null => {
  if (obj.type) return obj.type
  else if (obj.enum && obj.enum.length) return typeof obj.enum[1]
  return null;
}

const processObject = (schema: JSONSchema, config: InputConfig, depth: number, title?: string, entities: Map<String, Entity>): ParsedJSONSchema => {

  if (typeof schema === 'boolean') {
    return { entities: [] }
  }

  // Process definitions first and add them to entities as they are usually referenced somewhere.
  if (schema.definitions && !schema.properties) {
    for (const name in schema.definitions) {
      if (!entities.has(name)) {
        processObject(schema.definitions[name], config, depth, name, entities)
      }
    }
  }

  const entity: Entity = { name: title, description: schema.description, attributes: [] };
  const required: string[] = schema.required || [];
  const properties = schema.properties || { };
  
  for (const prop in properties) {

    const attType = get_object_type(schema.properties[prop])
    
    switch (attType) {
      case 'object':
        processObject(schema.properties[prop], config, depth + 1, prop, entities);
        break;
      case 'array':
        processObject(schema.properties[prop], config, depth + 1, prop, entities);
        break;
      default:

        break;
    }

    entity.attributes.push({
      name: prop,
      type: prop,
      required: required.conta()
    })

    
  }

  

  

  

  // Validate Object
  const validation = validateObject(obj, config);
  if (!validation.valid) {
    throw new Error(`Invalid JSON Schema Object: ${validation.errors.join('\n')}`)
  }

  return {};
}

const convertToEntity(obj:  )
