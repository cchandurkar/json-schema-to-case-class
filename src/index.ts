import { resolveRefs, stripSchema, validate, supportedTextCases, getSanitizers } from './converter';
import { caseClassFormatter, avroIDLFormatter } from './formatters/';
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
    const sanitizers = getSanitizers(schema, resolved);
    return validate(schema)
      .then(() => sanitizers.pre())
      .then((sanitizedSchema) => resolveRefs(sanitizedSchema))
      .then(res => stripSchema(res.schema, resolved))
      .then((res) => sanitizers.post(res))
      .then(res => avroIDLFormatter(res, resolved))
  }

}

export default SchemaConverter;
module.exports = SchemaConverter;

// // Browser: Inject `SchemaConverter` in Window object
const globalAny:any = global;
globalAny.SchemaConverter = SchemaConverter;
