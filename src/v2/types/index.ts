// -------------------------------
// JSON Schema Types
// -------------------------------

import type {
  JSONSchema4,
  JSONSchema4Object,
  JSONSchema4Type,
  JSONSchema6,
  JSONSchema6Definition,
  JSONSchema6Type,
  JSONSchema6Object,
  JSONSchema7,
  JSONSchema7Definition,
  JSONSchema7Type,
  JSONSchema7Object
} from 'json-schema';

export type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7;
export type JSONSchemaObject = JSONSchema4Object | JSONSchema6Object | JSONSchema7Object;
export type JSONSchemaDefinition = JSONSchema6Definition | JSONSchema7Definition;
export type JSONSchemaEnum = JSONSchema4Type | JSONSchema6Type | JSONSchema7Type;

// -------------------------------
// Configs and Formatters
// -------------------------------

export type InputConfig = {
  maxDepth: Number,
  resolveRefs: Boolean,
  defaultTopLevelCaseClassName: string,
  defaultType: string
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

export type AttrGenericType = String | Entity | AttributeType;
export type AttributeType = {
  primary: String | Entity,
  generic?: AttrGenericType
}

export type Entity = null | undefined | {
  name?: String,
  description?: String,
  attributes: Attribute[],
  constraints?: any[]
}

export type Attribute = {
  name: String,
  type: AttributeType,
  description?: String,
  constraints?: any[],
  enumerations?: any [],
  required: boolean | null
}
