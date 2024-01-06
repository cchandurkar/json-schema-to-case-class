import { IConfig, IConfigResolved } from './interfaces'
import extendWith from 'lodash/extendWith'

export class Config {

  public static readonly default: IConfigResolved = {
    maxDepth: 0,
    topLevelEntityName: 'MyEntity',
    entityTextCase: 'pascalCase',
    attributeTextCase: 'snakeCase',
    defaultGenericType: 'Any',
    parseRefs: true,
    generateComments: true,
    generateValidations: true,
    generateEnumerations: true
  };

  static resolve (config?: IConfig): IConfigResolved {
    if (!config) return Config.default;
    return extendWith({}, Config.default, config, (oldVal, newVal) => {
      return newVal === null || newVal === undefined ? oldVal : newVal
    });
  }

}
