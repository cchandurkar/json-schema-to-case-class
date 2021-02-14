import { IConfig } from "./types";
import extend from 'lodash/extend';


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
    return extend( config, Config.default );
  }

}
