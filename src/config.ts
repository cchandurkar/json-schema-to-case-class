import { IConfig, IConfigResolved } from './interfaces'
import extendWith from 'lodash/extendWith'

export class Config {

  public static readonly default: IConfigResolved = {
    maxDepth: 0,
    optionSetting: 'useOptions',
    classNameTextCase: 'pascalCase',
    classParamsTextCase: 'snakeCase',
    topLevelCaseClassName: 'MyCaseClass',
    defaultGenericType: 'Any',
    parseRefs: true,
    generateComments: false,
    generateValidations: false,
    generateEnumerations: false
  };

  static resolve (config?: IConfig): IConfigResolved {
    if (!config) return Config.default;
    return extendWith({}, Config.default, config, (oldVal, newVal) => {
      return newVal === null || newVal === undefined ? oldVal : newVal
    });
  }

}
