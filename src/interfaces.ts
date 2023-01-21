
/** Config with optional parameters **/
export interface IConfig {
    maxDepth?: number;
    optionSetting?: string | null;
    classNameTextCase?: string | null;
    classParamsTextCase?: string | null;
    topLevelCaseClassName?: string | null;
    defaultGenericType?: string | null;
    parseRefs?: boolean;
    generateComments?: boolean;
    generateValidations?: boolean;
    generateEnumerations?: boolean
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
    generateValidations: boolean,
    generateEnumerations: boolean
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
    genericType?: string,
    enumeration?: Array<string|number>,
    description?: string | null,
    validations?: any,
    compositValidations?: { allOf: Array<any> },
    nestedObject?: ICaseClassDef | null
}

/** Resolved local or remote refs returned by the function **/
export interface IResolveRefsResult {
    error: any | null,
    schema: any | null
}
