
const arrayLikeValidations = {
  // maxContains - NOT SUPPORTED
  // minContains - NOT SUPPORTED
  minItems: (paramName: string, value: string) => `${paramName}.length >= ${value}`,
  maxItems: (paramName: string, value: string) => `${paramName}.length <= ${value}`,
  uniqueItems: (paramName: string, value: boolean) => value ? `${paramName}.length == ${paramName}.distinct.length` : ''
};

const objectLikeValidations = {
  // minProperties - NOT SUPPORTED
  // maxProperties - NOT SUPPORTED
  // required - Case class parameters are wrapped in `Option[]` if they are NOT required.
};

const numberLikeValidations = {
  multipleOf: (paramName: string, value: number) => `${paramName} % ${value} == 0`,
  maximum: (paramName: string, value: number) => `${paramName} <= ${value}`,
  exclusiveMaximum: (paramName: string, value: number) => `${paramName} < ${value}`,
  minimum: (paramName: string, value: number) => `${paramName} >= ${value}`,
  exclusiveMinimum: (paramName: string, value: number) => `${paramName} > ${value}`
};

const stringLikeValidations = {
  maxLength: (paramName: string, value: number) => `${paramName}.length <= ${value}`,
  minLength: (paramName: string, value: number) => `${paramName}.length >= ${value}`,
  pattern: (paramName: string, value: string) => `${paramName}.matches("${value}")`
};

export const validations: any = {
  ...arrayLikeValidations,
  ...objectLikeValidations,
  ...numberLikeValidations,
  ...stringLikeValidations
};

export const buildValidations = (key: string, paramName: string, compareTo: string, hasOption: boolean): string => {
  const assertMessage = `\`${paramName}\` violates '${key}' constraint`;
  const comparison = hasOption
    ? paramName + `.exists(${validations[key]('_', compareTo)})`
    : validations[key](paramName, compareTo);

  return `assert( ${comparison}, "${assertMessage}" )`
}
