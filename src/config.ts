import { IConfig } from "./types";
import extendWith from 'lodash/extendWith';


export class Config {

  static default: IConfig = {
    maxDepth: 0,
    optionSetting: "useOptions",
    classNameTextCase: 'pascalCase',
    classParamsTextCase: 'snakeCase',
    topLevelCaseClassName: 'MyCaseClass',
    defaultGenericType: "Any",
    parseRefs: true,
    generateComments: false
  };

  static resolve( config: IConfig ) {
    return extendWith( Config.default, config, ( oldVal, newVal ) => {
      return newVal === null || newVal === undefined ? oldVal : newVal
    } );
  }

}
