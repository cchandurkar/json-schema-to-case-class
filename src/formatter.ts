import { IConfigResolved, ICaseClassDef, ICaseClassDefParams } from './interfaces';
import get from 'lodash/get';
import replace from 'lodash/replace';

// Reserve keywords are wrapped in backtick (`)
const reservedKeywords = [
  'abstract', 'case', 'catch', 'class', 'def', 'do', 'else', 'extends', 'false', 'final',
  'finally', 'for', 'forSome', 'if', 'implicit', 'import', 'lazy', 'match', 'new', 'null',
  'object', 'override', 'package', 'private', 'protected', 'return', 'sealed', 'super',
  'this', 'throw', 'trait', 'try', 'true', 'type', 'val', 'var', 'while', 'with', 'yield'
];

// Use backticks for param names with symbols
const invalidSymbols = [
  ':', '-', '+', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
  '>', '<', '/', ';', "'", '"', '{', '}', ':', '~', '`'
];

/**
 * Generates JavaDoc like comments for case classes.
 * It uses the 'description` property for JSON Schema.
 *
 * @param strippedSchema
 */
const generateCommentsFor = (strippedSchema: ICaseClassDef): string => {

  // Parameters
  const classParams = get(strippedSchema, 'parameters', []);

  // Generate
  let comment = '/**\n';

  // If class level description exits
  if (strippedSchema.entityDescription) {
    const desc = replace(strippedSchema.entityDescription, /\n/g, '\n * ');
    comment += ' * ' + desc + '\n';
    comment += ' *\n';
  }

  // Generate comment for every parameter of case class
  // Use description, if available
  classParams.forEach(param => {
    comment += (' * @param ' + param.paramName);
    if (param.description) {
      const desc = replace(param.description.trim(), /\n/g, ('\n *' + Array(10 + param.paramName.length).join(' ')));
      comment += ` ${desc}`;
    }
    comment += '\n';
  });
  comment += ' */\n';

  // Return the formatted comment
  return comment;

};

/**
 * Check if given parameter name should be wrapped in a backtick
 * @param paramName
 */
const shouldAddBacktick = (paramName: string) : boolean => {
  return reservedKeywords.includes(paramName) || invalidSymbols.some(s => paramName.includes(s));
};

/**
 * Format parameter names:
 * 1. Add backtick where necessary.
 *
 * @param param
 */
const formatParamName = (param: ICaseClassDefParams): string => {
  return shouldAddBacktick(param.paramName) ? `\`${param.paramName}\`` : param.paramName;
};

/**
 * Format parameter type:
 * 1. Wrap types in `Option[]` where necessary.
 *
 * @param param
 * @param config
 */
const formatParamType = (param: ICaseClassDefParams, config: IConfigResolved): string => {
  return (config.optionSetting === 'useOptions' && param.isRequired) || config.optionSetting === 'useOptionsForAll'
    ? `Option[${param.paramType}]`
    : param.paramType;
};

/**
 * Recursively formats the stripped JSON Schema into Scala case classes.
 *
 * @param strippedSchema
 * @param config
 */
export const format = (strippedSchema: ICaseClassDef, config: IConfigResolved): string => {

  // Check if need to generate comments
  const comment = config.generateComments ? generateCommentsFor(strippedSchema) : '';

  // Format case class parameter and type
  let output = comment + `case class ${strippedSchema.entityName} (\n`;
  const classParams: Array<ICaseClassDefParams> = get(strippedSchema, 'parameters', []);
  classParams.forEach((param, index) => {
    output += `\t ${formatParamName(param)}: ${formatParamType(param, config)}`;
    output += index < (classParams.length - 1) ? ',\n' : '\n'
  });
  output += ')\n\n';

  // Look for nested objects
  output += classParams
    .map((p: ICaseClassDefParams) => p.nestedObject ? format(p.nestedObject, config) : '')
    .join('');

  // Return output
  return output.replace(/\t/g, '    ');

};
