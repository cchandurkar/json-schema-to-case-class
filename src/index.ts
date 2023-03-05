import { resolveRefs, stripSchema, validate, supportedTextCases } from './converter';
import { format } from './formatter';
import { IConfig } from './interfaces';
import { Config } from './config';

class SchemaConverter {

  static supportedTextCases = supportedTextCases;

  /**
   * Convert input json schema into scala case classes:
   *
   * 1. Validate schema.
   * 2. Resolve local/remote schema references.
   * 3. Strip JSON schema into simplified format.
   * 4. Format simplified schema into format
   *
   * @param schema
   * @param config
   */
  static async convert (schema: any, config?: IConfig): Promise<string> {
    const resolved = Config.resolve(config);
    return validate(schema)
      .then(() => resolveRefs(schema))
      .then(res => stripSchema(res.schema, resolved))
      .then(res => format(res, resolved))
  }

}

export default SchemaConverter;
module.exports = SchemaConverter;
// NodeJS: Export types and utility functions
// export * from './interfaces';
// export {
//   supportedTextCases,
//   resolveRefs,
//   stripSchema,
//   convert
// }

// // Browser: Inject `SchemaConverter` in Window object
const globalAny:any = global;
globalAny.SchemaConverter = SchemaConverter;
//   supportedTextCases,
//   resolveRefs,
//   stripSchema,
//   convert
// };
