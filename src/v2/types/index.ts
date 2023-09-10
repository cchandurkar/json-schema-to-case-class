// -------------------------------
// JSON Schema Types
// -------------------------------

import type {
  JSONSchema4,
  JSONSchema4Object,
  JSONSchema6,
  JSONSchema6Definition,
  JSONSchema6Object,
  JSONSchema7,
  JSONSchema7Definition,
  JSONSchema7Object
} from 'json-schema';

export type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7 | boolean;
export type JSONSchemaObject = JSONSchema4Object | JSONSchema6Object | JSONSchema7Object;

// -------------------------------
// Configs and Formatters
// -------------------------------

export type InputConfig = {
  maxDepth: Number,
  resolveRefs: Boolean
}

export type KeyValue = { [key: string]: any; }
export type FormatterConfig = KeyValue & {
  generateComments?: Boolean,
  generateValidations?: Boolean,
  generateEnumerations?: Boolean
};

export type ValidationResult = {
  valid: Boolean,
  errors: string[]
}

export type RefResolveResult = {
  error: string | null
  result: JSONSchema | null,
}

// -------------------------------
// Parsed Schema Types
// -------------------------------

export type ParsedJSONSchema = {
  entities: Entity[]
}

export type Entity = {
  name?: String,
  description?: String,
  attributes: Attribute[],
  constraints?: any[]
}

export type Attribute = {
  name: String,
  type: String | Entity,
  genericType?: String | Entity,
  constraints?: any[],
  required: boolean
}
