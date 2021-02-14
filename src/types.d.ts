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
  caseClassName: string,
  caseClassDescription?: string,
  parameters: Array<{
    paramName: string,
    paramType: string,
    nestedObject?: ICaseClassDef
  }>
}
