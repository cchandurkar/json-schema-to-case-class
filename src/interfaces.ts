
/** Config with optional parameters **/
export interface IConfig {
    maxDepth?: number;
    optionSetting?: string | null;
    entityTextCase?: string,
    attributeTextCase?: string,
    topLevelEntityName?: string | null;
    defaultGenericType?: string | null;
    parseRefs?: boolean;
    generateComments?: boolean;
    generateValidations?: boolean;
    generateEnumerations?: boolean
}

/** Config resolved with default parameters **/
export interface IConfigResolved {
    maxDepth: number,
    entityTextCase: string,
    attributeTextCase: string,
    topLevelEntityName: string,
    defaultGenericType: string,
    parseRefs: boolean,
    generateComments: boolean
    generateValidations: boolean,
    generateEnumerations: boolean
}

/** An intermediate data format. This is the striped down version of JSON Schema **/
export interface IEntity {
    name: string,
    attributes: Array<IAttribute>,
    description?: string
}

export interface IAttribute {
    name: string,
    type: string | IEntity,
    genericType?: string | IEntity | null,
    isRequired: boolean,
    enumeration?: Array<any> | null,
    description?: string,
    validations?: { [s: string]: any; } | null,
    compositValidations?: { allOf: Array<any>, oneOf: Array<any>, anyOf: Array<any> } | null
}

/** Resolved local or remote refs returned by the function **/
export interface IResolveRefsResult {
    error: any | null,
    schema: any | null
}

export type TextCaseFn = (x: string|null) => string;
