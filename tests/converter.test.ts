import { convert } from '../src/'
import { expect } from 'chai';

import * as simpleSchema from './test-data/simple-schema.json'
import * as localRefSchemaSample from './test-data/local-ref-schema.json'
import * as nestedSchema from './test-data/nested-schema.json'

describe('Function convert()', () => {

  it('should convert the schema as expected', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      topLevelCaseClassName: 'PersonInfo',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: true
    };

    const result = await convert(localRefSchemaSample, config);

    expect(result).to.be.an('string');
    expect(result).to.contain('case class PersonInfo');
    expect(result).to.contain('case class BillingAddress');
    expect(result).to.contain('case class ShippingAddress');
    expect(result).to.contain('zip: Option[Int]');

  });

  it('should should not wrap any parameter in Option with `optionSetting = null`', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'noOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      topLevelCaseClassName: 'PersonInfo',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: true
    };

    const result = await convert(localRefSchemaSample, config);

    expect(result).to.be.an('string');
    expect(result).to.contain('case class PersonInfo');
    expect(result).to.contain('case class BillingAddress');
    expect(result).to.contain('case class ShippingAddress');
    expect(result).to.not.contain('Option[');

  });

  it('should should wrap all parameters in Option with `optionSetting = "useOptionsForAll"`', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'useOptionsForAll',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      topLevelCaseClassName: 'PersonInfo',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: true
    };

    const result = await convert(simpleSchema, config);

    expect(result).to.be.an('string');
    expect(result).to.contain('Option[');

    // Count occurrences
    const occurrences = (result.match(/Option\[/g) || []).length;
    expect(occurrences).to.eql(3);

  });

  it('should should generate case class with validations as expected', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      topLevelCaseClassName: 'PersonInfo',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: true,
      generateValidations: true
    };

    const result = await convert(nestedSchema, config);

    expect(result).to.be.an('string');
    expect(result).to.contain('Option[');
    expect(result).to.contain('assert');

    const occurrences = (result.match(/assert\(/g) || []).length;
    expect(occurrences).to.eql(3);

  });

});
