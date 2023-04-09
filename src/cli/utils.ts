
import { readFileSync, writeFileSync } from 'fs';
import { Config } from '../config';

export const readFile = (src: string): string => {
  try {
    return readFileSync(src, { encoding: 'utf8', flag: 'r' });
  } catch (e: any) {
    const message = `Error reading input file: ${e.message}`
    throw new Error(message);
  }
}

export const writeFile = (path: string, content: string): void => {
  try {
    return writeFileSync(path, content, { encoding: 'utf8', flag: 'w' });
  } catch (e: any) {
    const message = `Error writing output file: ${e.message}`
    throw Error(message);
  }
}

export const parseJSON = (content: string): any => {
  try {
    return JSON.parse(content)
  } catch (e: any) {
    const message = `Not a valid JSON: ${e.message}`
    throw Error(message);
  }
}

export const sanitizedAPIConfigs = (options: any) => {
  const sanitized: {[s: string]: any} = {}
  for (const key in Config.default) {
    const value = key in options ? options[key] : (<any>Config.default)[key];
    sanitized[key] = value;
  }
  return sanitized;
}

export const appVersion = (): string => {
  return parseJSON(readFile('./package.json')).version;
}
