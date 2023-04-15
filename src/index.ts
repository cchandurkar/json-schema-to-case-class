import { resolveRefs, stripSchema, validate, supportedTextCases, getSanitizers } from './converter';
import { format } from './formatter';
import { IConfig } from './interfaces';
import { Config } from './config';
import log4js from 'log4js'

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

    // Setup logger
    const logger = log4js.getLogger('js2cc API');
    logger.level = config?.debug ? 'debug' : 'info';

    logger.debug('Resolving config');
    const resolved = Config.resolve(config);
    const sanitizers = getSanitizers(schema, resolved);

    logger.debug('Validating input schema');
    return validate(schema)
      .then(() => {
        logger.debug('Sanitizing schema');
        return sanitizers.pre()
      })
      .then(async (sanitizedSchema) => {
        if (!resolved.parseRefs) return Promise.resolve(sanitizedSchema);
        logger.debug('Resolving schema references');
        const parsedSchema = await resolveRefs(sanitizedSchema);
        if (parsedSchema.error || !parsedSchema.schema) {
          throw new Error(`Error parsing schema references: ${parsedSchema.error}`)
        }
        return parsedSchema.schema;
      })
      .then(res => {
        logger.debug('Parsing schema');
        return stripSchema(res, resolved)
      })
      .then((res) => {
        logger.debug('Post-processing sanitization');
        return sanitizers.post(res)
      })
      .then(res => {
        logger.debug('Formatting');
        return format(res, resolved)
      })
  }

}

export default SchemaConverter;
module.exports = SchemaConverter;

// // Browser: Inject `SchemaConverter` in Window object
const globalAny:any = global;
globalAny.SchemaConverter = SchemaConverter;
