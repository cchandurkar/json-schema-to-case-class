import { BaseFormatter } from '.';
import { ParsedJSONSchema, FormatterConfig } from '../types';

export class SQLFormatter extends BaseFormatter {
  format (schema: ParsedJSONSchema, config: FormatterConfig): string {
    return ''
  }
}
