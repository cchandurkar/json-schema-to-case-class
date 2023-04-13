const arrayLikeValidationOps: any = {
  minItems: {
    lhs: (paramName: string, value: any) => value === 1 ? `${paramName}.nonEmpty` : `${paramName}.length`,
    comparator: (paramName: string, value: any) => value === 1 ? null : '>=',
    rhs: (paramName: string, value: any) => value === 1 ? null : value,
    msg: (paramName: string, value: any) => `\`${paramName}\` must have minimum ${value} item(s)`
  },
  maxItems: {
    lhs: (paramName: string, value: any) => value === 0 ? `${paramName}.isEmpty` : `${paramName}.length`,
    comparator: (paramName: string, value: any) => value === 0 ? null : '<=',
    rhs: (paramName: string, value: any) => value === 0 ? null : value,
    msg: (paramName: string, value: any) => `\`${paramName}\` must have maximum ${value} item(s)`
  },
  uniqueItems: {
    lhs: (paramName: string, value: any) => `${paramName}.length`,
    comparator: (paramName: string, value: any) => '===',
    rhs: (paramName: string, value: any) => `${paramName}.distinct.length`,
    msg: (paramName: string, value: any) => `\`${paramName}\` must have unique items`
  }
}

const numberLikeValidationOps: any = {
  multipleOf: {
    lhs: (paramName: string, value: any) => paramName,
    comparator: (paramName: string, value: any) => '%',
    rhs: (paramName: string, value: any) => `${value} === 0`,
    msg: (paramName: string, value: any) => `\`${paramName}\` must be multiple of (divisible by) ${value}`
  },
  maximum: {
    lhs: (paramName: string, value: any) => paramName,
    comparator: (paramName: string, value: any) => '<=',
    rhs: (paramName: string, value: any) => value,
    msg: (paramName: string, value: any) => `\`${paramName}\` must be less than or equal to ${value}`
  },
  exclusiveMaximum: {
    lhs: (paramName: string, value: any) => paramName,
    comparator: (paramName: string, value: any) => '<',
    rhs: (paramName: string, value: any) => value,
    msg: (paramName: string, value: any) => `\`${paramName}\` must be less than ${value}`
  },
  minimum: {
    lhs: (paramName: string, value: any) => paramName,
    comparator: (paramName: string, value: any) => '>=',
    rhs: (paramName: string, value: any) => value,
    msg: (paramName: string, value: any) => `\`${paramName}\` must be greater than or equal to ${value}`
  },
  exclusiveMinimum: {
    lhs: (paramName: string, value: any) => paramName,
    comparator: (paramName: string, value: any) => '>',
    rhs: (paramName: string, value: any) => value,
    msg: (paramName: string, value: any) => `\`${paramName}\` must be greater than ${value}`
  }
}

const stringLikeValidationOps: any = {
  maxLength: {
    lhs: (paramName: string, value: any) => `${paramName}.length`,
    comparator: (paramName: string, value: any) => '<=',
    rhs: (paramName: string, value: any) => value,
    msg: (paramName: string, value: any) => `\`${paramName}\` does not meet maximum length of ${value}`
  },
  minLength: {
    lhs: (paramName: string, value: any) => value === 1 ? `${paramName}.nonEmpty` : `${paramName}.length`,
    comparator: (paramName: string, value: any) => value === 1 ? null : '>=',
    rhs: (paramName: string, value: any) => value === 1 ? null : value,
    msg: (paramName: string, value: any) => `\`${paramName}\` does not meet minimum length of ${value}`
  },
  pattern: {
    lhs: (paramName: string, value: any) => `${paramName}.matches("${value}")`,
    comparator: (paramName: string, value: any) => null,
    rhs: (paramName: string, value: any) => null,
    msg: (paramName: string, value: any) => `\`${paramName}\` does not match the pattern`
  }
};

const objectLikeValidations = {
  // minProperties - NOT SUPPORTED
  // maxProperties - NOT SUPPORTED
  // required - Case class parameters are wrapped in `Option[]` if they are NOT required.
};

export const validations: any = {
  ...arrayLikeValidationOps,
  ...numberLikeValidationOps,
  ...stringLikeValidationOps,
  ...objectLikeValidations
}

const formatEquation = (lhs: string, comparator: string, rhs: string): string => {
  let equation = lhs;
  if (comparator !== null) equation += ` ${comparator}`;
  if (rhs !== null) equation += ` ${rhs}`;
  return equation;
}

const generateAssertionFromOp = (lhs: string, comparator: string, rhs: string, msg: string) => {
  return `assert( ${formatEquation(lhs, comparator, rhs)}, "${msg}" )`
}

const generateOptionalAssertionFromOp = (paramName: string, lhs: string, comparator: string, rhs: string, msg: string) => {
  return `assert( ${paramName}.forall(${formatEquation(lhs, comparator, rhs)}), "${msg}" )`
}

export const generateAssertion = (opName: string, paramName: string, value: any, isOptional: boolean): string | null => {
  if (!(opName in validations)) return null;
  const op: any = validations[opName];
  if (isOptional) {
    return generateOptionalAssertionFromOp(paramName, op.lhs('_', value), op.comparator('_', value), op.rhs('_', value), op.msg(paramName, value))
  } else {
    return generateAssertionFromOp(op.lhs(paramName, value), op.comparator(paramName, value), op.rhs(paramName, value), op.msg(paramName, value))
  }
}
