
// import traverse from 'json-schema-traverse';

// import * as simpleSchema from './tests/test-data/simple-schema.json'
// import * as simpleSchemaNoTitle from './tests/test-data/simple-schema-no-title.json'
// import * as nestedSchema from './tests/test-data/nested-schema.json';
// import * as stringEnumSchema from './tests/test-data/enum-string-schema.json';
// import * as allOfSchema from './tests/test-data/compositions-allOf-simple.json'
// import * as allOfWithReferencesSchema from './tests/test-data/compositions-allOf-references.json'
// import * as arrayOfObjectsSchema from './tests/test-data/array-of-objects.json'
// import * as arrayOfArrayStringSchema from './tests/test-data/array-of-array-string.json'
// import * as arrayOfArrayObjectSchema from './tests/test-data/array-of-array-object.json'
// import * as ifThenElse from './tests/test-data/if-then-else.json'

// const callback = (subschema: any, jsonPtr: string, rootSchema: any, parentJsonPtr?: string, parentKeyword?: string, parentSchema?: any, keyIndex?: string | number) => {
//   console.log("subschema", subschema);
//   console.log("jsonPtr", jsonPtr);
//   console.log("parentJsonPtr", parentJsonPtr);
//   console.log("parentKeyword", parentKeyword);
//   console.log("parentSchema", parentSchema);
//   console.log("keyIndex", keyIndex);
//   console.log("-------------------------------------");
// }

// export const parse = (schema: any, options: any): any => {
//   traverse(schema, { allKeys: true, cb: callback });
// };

// parse(nestedSchema, {});

import $RefParser from '@apidevtools/json-schema-ref-parser';
const util = require('util');

const mySchema: any = {
  "$schema": "http://json-schema.org/schema#",
  "definitions": {
      "Str":{
        "type": "string"
      },
      "Top": {
          "type": "object",
          "additionalProperties": false,
          "required": [
              "prop1",
              "prop2"
          ],
          "properties": {
              "prop1": {
                  "type": "string"
              },
              "prop2": {
                  "$ref": "#/definitions/Inner",
                  "min": 10
              }
          }
      },
      "Inner": {
          "type": "object",
          "additionalProperties": false,
          "required": [
              "inner1",
              "inner2"
          ],
          "properties": {
              "inner1": {
                  "type": "string"
              },
              "inner2": {
                  "type": "string"
              }
          }
      }
  }
};

const options: any = {
  dereference: {
    circular: 'ignore',
    onDereference: (path: string, value: any) => {
      console.log("dereferencing", path, value);
      value.dereferenced = path;
    }
  }
};

$RefParser.dereference(mySchema, options, (err: any, schema: any) => {
  if (err) console.error(err);
  else {
    console.log(util.inspect(schema, false, null, true /* enable colors */))
  }
});
