import { BaseFormatter } from '.';
import { ParsedJSONSchema, InputConfig } from '../types';

export type ScalaConfig = InputConfig & { }

export class ScalaFormatter extends BaseFormatter {
  format (schema: ParsedJSONSchema, config: ScalaConfig): string {
    return ''
  }
}
