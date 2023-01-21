
const arrayLikeValidations = {
  // maxContains - NOT SUPPORTED
  // minContains - NOT SUPPORTED
  minItems: (paramName: string, value: string) => `assert( ${paramName}.length >= ${value},  "\`${paramName}\` must have minimum ${value} items" )`,
  maxItems: (paramName: string, value: string) => `assert( ${paramName}.length <= ${value},  "\`${paramName}\` must have maximum ${value} items" )`,
  uniqueItems: (paramName: string, value: boolean) => value ? `assert( ${paramName}.length == ${paramName}.distinct.length,  "\`${paramName}\` contains duplicate items" )` : ''
};

const objectLikeValidations = {
  // minProperties - NOT SUPPORTED
  // maxProperties - NOT SUPPORTED
  // required - Case class parameters are wrapped in `Option[]` if they are NOT required.
};

const numberLikeValidations = {
  multipleOf: (paramName: string, value: number) => `assert( ${paramName} % ${value} == 0, "\`${paramName}\` must be multiple of (divisible by) ${value}" )`,
  maximum: (paramName: string, value: number) => `assert( ${paramName} <= ${value}, "\`${paramName}\` must be less than or equal to ${value}" )`,
  exclusiveMaximum: (paramName: string, value: number) => `assert( ${paramName} < ${value}, "\`${paramName}\` must be less than ${value}" )`,
  minimum: (paramName: string, value: number) => `assert( ${paramName} >= ${value}, "\`${paramName}\` must be greater than or equal to ${value}" )`,
  exclusiveMinimum: (paramName: string, value: number) => `assert( ${paramName} > ${value}, "\`${paramName}\` must be greater than ${value}" )`
};

const stringLikeValidations = {
  maxLength: (paramName: string, value: number) => `assert( ${paramName}.length <= ${value}, "\`${paramName}\` does not meet maximum length of ${value}" )`,
  minLength: (paramName: string, value: number) => `assert( ${paramName}.length >= ${value}, "\`${paramName}\` does not meet minimum length of ${value}" )`,
  pattern: (paramName: string, value: string) => `assert( ${paramName}.matches("${value}"), "\`${paramName}\` does not match the pattern" )`
};

export const validations: any = {
  ...arrayLikeValidations,
  ...objectLikeValidations,
  ...numberLikeValidations,
  ...stringLikeValidations
};
