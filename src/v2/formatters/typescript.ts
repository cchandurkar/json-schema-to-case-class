import { BaseFormatter } from '.';
import { ParsedJSONSchema, InputConfig } from '../types';

export type TypescriptConfig = InputConfig & { }
export class TypescriptFormatter extends BaseFormatter {
  format (schema: ParsedJSONSchema, config: TypescriptConfig): string {
    return ''
  }
}
