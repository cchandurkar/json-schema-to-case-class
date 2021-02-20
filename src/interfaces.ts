
/** Config with optional parameters **/
export interface IConfig {
    maxDepth: number;
    optionSetting?: string | null;
    classNameTextCase?: string | null;
    classParamsTextCase?: string | null;
    topLevelCaseClassName?: string | null;
    defaultGenericType?: string | null;
    parseRefs?: boolean;
    generateComments?: boolean;
}

/** Config resolved with default parameters **/
export interface IConfigResolved {
    maxDepth: number,
    optionSetting: string,
    classNameTextCase: string,
    classParamsTextCase: string,
    topLevelCaseClassName: string,
    defaultGenericType: string,
    parseRefs: boolean,
    generateComments: boolean
}

/** An intermediate data format. This is the striped down version of JSON Schema **/
export interface ICaseClassDef {
    entityName: string,
    entityDescription?: string,
    parameters: Array<ICaseClassDefParams>
}

export interface ICaseClassDefParams {
    paramName: string,
    isRequired: boolean,
    paramType: string,
    description?: string | null,
    nestedObject?: ICaseClassDef | null
}

/** Resolved local or remote refs returned by the function **/
export interface IResolveRefsResult {
    error: any | null,
    schema: any | null
}
