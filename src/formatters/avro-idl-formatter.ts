import { IConfigResolved, ICaseClassDef, ICaseClassDefParams } from '../interfaces';
import get from 'lodash/get';
import replace from 'lodash/replace';

import { pascalCase } from 'change-case'

// Reserve keywords are wrapped in backtick (`)
const reservedKeywords: string[] = [];

// Use backticks for param names with symbols
const invalidSymbols = [
  ':', '-', '+', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
  '>', '<', '/', ';', "'", '"', '{', '}', ':', '~', '`'
];

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
 * 1. If enumeration, use enumeration type.
 * 2. Add generic type (if any)
 * 3. Wrap types in `Option[]` where necessary.
 *
 * @param param
 * @param config
 */
const formatParamType = (param: ICaseClassDefParams, config: IConfigResolved): string => {
  if (config.generateEnumerations && param.enumeration && param.genericType) {
    param.paramType += `[${getEnumerationTypeName(param.paramName)}]`
  } else if (config.generateEnumerations && param.enumeration) {
    param.paramType = `${getEnumerationTypeName(param.paramName)}`;
  } else {
    param.paramType += param.genericType ? `<${param.genericType}>` : '';
  }
  return !param.isRequired && param.paramType !== 'null' ? `union { null, ${param.paramType} }` : param.paramType;
};

/**
 * Formats enumeration name
 * @param paramName
 */
const getEnumerationTypeName = (paramName: string): string => {
  return `${pascalCase(paramName)}`
};

/**
 * Build enumeration object for this parameter
 * @param paramName
 * @param enumArray
 */
const buildEnumeration = (paramName: string, enumArray: Array<string|number>): any => {
  const enumName: string = getEnumerationTypeName(paramName);
  return `\tenum ${enumName} {\n` +
    `\t\t${enumArray.join(', ')}\n` +
    '\t}\n';
};

/**
 * Recursively formats the stripped JSON Schema into Scala case classes.
 *
 * @param strippedSchema
 * @param config
 */
export const format = (strippedSchema: ICaseClassDef, config: IConfigResolved): string => {
  return `protocol ${strippedSchema.entityName} {\n\n` + formatRecords(strippedSchema, config) + '\n}';
};

/**
 * Recursively formats the stripped JSON Schema into Scala case classes.
 *
 * @param strippedSchema
 * @param config
 */
export const formatRecords = (strippedSchema: ICaseClassDef, config: IConfigResolved): string => {

  // Format case class parameter and type
  let output = `\trecord ${strippedSchema.entityName} {\n`;
  const classParams: Array<ICaseClassDefParams> = get(strippedSchema, 'parameters', []);

  // Hold enumerations
  const enumerations: Array<string> = [];

  // For every parameters[i] object:
  classParams.forEach((param, index) => {

    // Check if enumerations needs to be derived
    if (config.generateEnumerations && param.enumeration && param.enumeration.length) {
      enumerations.push(buildEnumeration(pascalCase(param.paramName), param.enumeration));
    }

    // 1. Format parameter name and type
    if (param.description) {
      const description = param.description.trim();
      const desc = replace(description, /\n/g, ('\n ' + Array(10 + param.paramName.length).join(' ')));
      output += `\t\t/** ${desc} */\n`;
    }
    output += `\t\t${formatParamType(param, config)} ${formatParamName(param)};\n`;
    if (param.description) {
      output += '\n';
    }
  });
  output += '\t}\n\n';

  // Look for nested objects
  output += classParams
    .map((p: ICaseClassDefParams) => p.nestedObject ? formatRecords(p.nestedObject, config) : '')
    .join('');

  return output + enumerations.join('\n\n');

  // Return output
  // return output.replace(/\t/g, '    ') + '\n' + enumerations.join('\n\n').replace(/\t/g, '    ');

};
