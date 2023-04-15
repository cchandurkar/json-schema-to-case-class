import { Command, Option } from 'commander'
import { readFile, writeFile, parseJSON, appVersion, sanitizedAPIConfigs, wrappedError } from './utils'
import { Config } from '../config'
import SchemaConverter from '../index'
import log4js from 'log4js'

const logger = log4js.getLogger('js2cc CLI');
logger.level = 'info';

const processResult = (result: string, options: any) => {
  if (options.output) {
    logger.debug(`Writing output to file: ${options.output}`)
    writeFile(options.output, result)
  } else {
    console.log(result)
  }
}

export const processSchema = async (src: string, options: any) => {

  // Sanizie input configs.
  // It strips extra options not required by the API.
  const config = sanitizedAPIConfigs(options);
  logger.debug('Config: ', config);

  // Validate and process input schema file
  // TODO: Support reading remote schemas
  logger.debug(`Processing input file: ${src}`)
  const schema = parseJSON(readFile(src));

  // Use the API to convert input schema
  logger.debug('Converting schama to case class')
  return SchemaConverter.convert(schema, config)
    .then(result => {
      logger.debug('Processing results');
      processResult(result, options)
    })
    .catch(err => {
      throw wrappedError(new Error(`Failed to convert schema: ${err.message}`), err);
    })

};

export const createCommand = (): Command => {

  const program = new Command();
  const maxDepth = new Option('-d, --max-depth <number>', 'Maximum depth to parse nested JSON schema')
    .default(Config.default.maxDepth)
    .argParser(parseInt);

  const optionSettings = new Option('-s, --option-setting <type>', 'Wrap non-required fields in `Option`')
    .default(Config.default.optionSetting)
    .choices(['noOptions', 'useOptions', 'useOptionsForAll']);

  program
    .name('js2cc')
    .version(appVersion(), '-v, --version', 'Library version')
    .description('Convert JSON schemas into scala case class')
    .usage('<src> [options]')
    .argument('<src>', 'Path to json schema. It must be a local file. Support for reading URLs will be added in future version.')
    .addOption(maxDepth)
    .addOption(optionSettings)
    .option('-n, --top-level-case-class-name <string>', 'Name of the top-level case class (Applies only if JSON schema does not have top-level `title` property.', Config.default.topLevelCaseClassName)
    .option('-d, --default-generic-type <string>', 'Default generic type for unparsable data types', Config.default.defaultGenericType)
    .option('-p, --parse-refs', 'Parse local and remote references', Config.default.parseRefs)
    .option('-c, --generate-comments', 'Generate scaladoc comments', Config.default.generateComments)
    .option('-v, --generate-validations', 'Generate assertions from validations in JSON schema', Config.default.generateValidations)
    .option('-e, --generate-enumerations', 'Generate enumerations', Config.default.generateEnumerations)
    .option('-o, --output <string>', 'File name to write output to. If not provided, output will be written to console.', Config.default.generateEnumerations)
    .option('-D, --debug', 'Write more detailed output to console', false)

  const exampleHelpText = '\nExample call:\n  $ js2cc ./local/sample-schema.json -n Person -s useOptions -o sample-output.scala --debug\n'
  program.showHelpAfterError();
  program.addHelpText('after', exampleHelpText);

  program.on('option:debug', () => {
    logger.level = 'debug';
  });

  return program;

};
