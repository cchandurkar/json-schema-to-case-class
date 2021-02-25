
const arrayLikeValidations = {
  // maxContains - NOT SUPPORTED
  // minContains - NOT SUPPORTED
  minItems: (paramName: string, value: string) => `assert( ${paramName}.length >= ${value},  "\`${paramName}\` violates 'minItems' constraint" )`,
  maxItems: (paramName: string, value: string) => `assert( ${paramName}.length <= ${value},  "\`${paramName}\` violates 'minItems' constraint" )`,
  uniqueItems: (paramName: string, value: boolean) => value ? `assert( ${paramName}.length == ${paramName}.distinct.length,  "\`${paramName}\` violates 'uniqueItems' constraint" )` : ''
};

const objectLikeValidations = {
  // minProperties - NOT SUPPORTED
  // maxProperties - NOT SUPPORTED
  // required - Case class parameters are wrapped in `Option[]` if they are NOT required.
};

const numberLikeValidations = {
  multipleOf: (paramName: string, value: number) => `assert( ${paramName} % ${value} == 0, "\`${paramName}\` violates 'multipleOf' constraint" )`,
  maximum: (paramName: string, value: number) => `assert( ${paramName} <= ${value}, "\`${paramName}\` violates 'maximum' constraint" )`,
  exclusiveMaximum: (paramName: string, value: number) => `assert( ${paramName} < ${value}, "\`${paramName}\` violates 'exclusiveMaximum' constraint" )`,
  minimum: (paramName: string, value: number) => `assert( ${paramName} >= ${value}, "\`${paramName}\` violates 'minimum' constraint" )`,
  exclusiveMinimum: (paramName: string, value: number) => `assert( ${paramName} > ${value}, "\`${paramName}\` violates 'exclusiveMinimum' constraint" )`
};

const stringLikeValidations = {
  maxLength: (paramName: string, value: number) => `assert( ${paramName}.length <= ${value}, "\`${paramName}\` violates 'maxLength' constraint" )`,
  minLength: (paramName: string, value: number) => `assert( ${paramName}.length >= ${value}, "\`${paramName}\` violates 'minLength' constraint" )`,
  pattern: (paramName: string, value: string) => `assert( ${paramName}.matches("${value}"), "\`${paramName}\` violates 'pattern' constraint" )`
};

export const validations: any = {
  ...arrayLikeValidations,
  ...objectLikeValidations,
  ...numberLikeValidations,
  ...stringLikeValidations
};
