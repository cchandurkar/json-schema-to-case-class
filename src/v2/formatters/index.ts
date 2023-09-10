import { ParsedJSONSchema, FormatterConfig } from '../types';
export { ScalaFormatter, ScalaConfig } from './scala';
export { TypescriptFormatter, TypescriptConfig } from './typescript';
export { SQLFormatter } from './sql';

export abstract class BaseFormatter {
  abstract format(schema: ParsedJSONSchema, config: FormatterConfig): string
}
