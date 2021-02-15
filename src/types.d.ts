export interface IConfig {
  maxDepth: number,
  optionSetting?: string,
  classNameTextCase?: string,
  classParamsTextCase?: string,
  topLevelCaseClassName?: string,
  defaultGenericType?: string,
  parseRefs?: boolean,
  generateComments?: boolean
}

export interface ICaseClassDef {
  entityName: string,
  entityDescription?: string,
  parameters: Array<ICaseClassDefParams>
}

export interface ICaseClassDefParams {
  paramName: string,
  isRequired: boolean,
  paramType: string,
  nestedObject?: ICaseClassDef
}

