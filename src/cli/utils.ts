
import { readFileSync, writeFileSync } from 'fs';

export const readFile = (src: string): string => {
  try {
    return readFileSync(src, { encoding: 'utf8', flag: 'r' });
  } catch (e: any) {
    const message = `Error reading input file: ${e.message}`
    console.error(`\x1b[31m${message}\x1b[0m`)
    process.exit(1)
  }
}

export const writeFile = (path: string, content: string): void => {
  try {
    return writeFileSync(path, content, { encoding: 'utf8', flag: 'w' });
  } catch (e: any) {
    const message = `Error writing output file: ${e.message}`
    console.error(`\x1b[31m${message}\x1b[0m`)
    process.exit(1)
  }
}

export const parseJSON = (content: string): any => {
  try {
    return JSON.parse(content)
  } catch (e: any) {
    const message = `Not a valid JSON: ${e.message}`
    console.error(`\x1b[31m${message}\x1b[0m`);
    process.exit(1)
  }
}

export const sanitizedAPIConfigs = (options: any, defaults: any) => {
  const sanitized: {[s: string]: any} = {}
  for (const key in defaults) {
    const value = key in options ? options[key] : defaults[key];
    sanitized[key] = value;
  }
  return sanitized;
}

export const appVersion = (): string => {
  return parseJSON(readFile('./package.json')).version;
}