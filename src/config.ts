import { IConfig, IConfigResolved } from './interfaces'
import extendWith from 'lodash/extendWith'

export class Config {

  static default: IConfigResolved = {
    maxDepth: 0,
    optionSetting: 'useOptions',
    classNameTextCase: 'pascalCase',
    classParamsTextCase: 'snakeCase',
    topLevelCaseClassName: 'MyCaseClass',
    defaultGenericType: 'Any',
    parseRefs: true,
    generateComments: false,
    generateValidations: false
  };

  static resolve (config?: IConfig): IConfigResolved {
    if (!config) return Config.default;
    return extendWith(Config.default, config, (oldVal, newVal) => {
      return newVal === null || newVal === undefined ? oldVal : newVal
    });
  }

}
