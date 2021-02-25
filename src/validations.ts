
const arrayLikeValidations = {
  // maxContains - NOT SUPPORTED
  // minContains - NOT SUPPORTED
  minItems: (paramName: string, value: string) => `assert( ${paramName}.length >= ${value},  "Violates 'minItems' constraint" )`,
  maxItems: (paramName: string, value: string) => `assert( ${paramName}.length <= ${value},  "Violates 'minItems' constraint" )`,
  uniqueItems: (paramName: string, value: boolean) => value ? `assert( ${paramName}.length == ${paramName}.distinct.length,  "Violates 'uniqueItems' constraint" )` : ''
};

const objectLikeValidations = {
  // minProperties - NOT SUPPORTED
  // maxProperties - NOT SUPPORTED
  // required - Case class parameters are wrapped in `Option[]` if they are NOT required.
};

const numberLikeValidations = {
  multipleOf: (paramName: string, value: number) => `assert( ${paramName} % ${value} == 0, "Violates 'multipleOf' constraint" )`,
  maximum: (paramName: string, value: number) => `assert( ${paramName} <= ${value}, "Violates 'maximum' constraint" )`,
  exclusiveMaximum: (paramName: string, value: number) => `assert( ${paramName} < ${value}, "Violates 'exclusiveMaximum' constraint" )`,
  minimum: (paramName: string, value: number) => `assert( ${paramName} >= ${value}, "Violates 'minimum' constraint" )`,
  exclusiveMinimum: (paramName: string, value: number) => `assert( ${paramName} > ${value}, "Violates 'exclusiveMinimum' constraint" )`
};

const stringLikeValidations = {
  maxLength: (paramName: string, value: number) => `assert( ${paramName}.length <= ${value}, "Violates 'maxLength' constraint" )`,
  minLength: (paramName: string, value: number) => `assert( ${paramName}.length >= ${value}, "Violates 'minLength' constraint" )`,
  pattern: (paramName: string, value: string) => `assert( ${paramName}.matches("${value}"), "Violates 'pattern' constraint" )`
};

export const validations: any = {
  ...arrayLikeValidations,
  ...objectLikeValidations,
  ...numberLikeValidations,
  ...stringLikeValidations
};
