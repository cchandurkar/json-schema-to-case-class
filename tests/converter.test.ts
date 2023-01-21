import { convert } from '../src/'
import { expect } from 'chai';

import * as simpleSchema from './test-data/simple-schema.json'
import * as localRefSchemaSample from './test-data/local-ref-schema.json'
import * as nestedSchema from './test-data/nested-schema.json'
import * as latLongSchema from './test-data/lat-long-schema.json'
import * as stringEnumSchema from './test-data/enum-string-schema.json'
import * as arrayEnumSchema from './test-data/enum-array-schema.json'
import * as allOfSchema from './test-data/compositions-allOf-simple.json'
import * as allOfWithReferencesSchema from './test-data/compositions-allOf-references.json'

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

    const result = await convert(latLongSchema, config);
    expect(result).to.be.an('string');
    expect(result).to.contain('assert');

    const occurrences = (result.match(/assert\(/g) || []).length;
    expect(occurrences).to.eql(4);

  });

  it('should should generate case class with parameters having generic type as expected', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'noOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: true,
      generateValidations: false
    };

    const result = await convert(nestedSchema, config);
    expect(result).to.be.an('string');
    expect(result).to.contain('tags: List[String]');

  });

  it('should generate case class with parameters having generic type with max depth less than total depth', async () => {

    const config = {
      maxDepth: 1,
      optionSetting: 'noOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: true,
      generateValidations: false
    };

    const result = await convert(nestedSchema, config);
    expect(result).to.be.an('string');
    expect(result).to.contain('tags: List[Any]');

  });

  it('should build string enumerations as expected', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: true,
      generateValidations: false,
      generateEnumerations: true
    };

    const result = await convert(stringEnumSchema, config);
    expect(result).to.be.an('string');
    expect(result).to.contain('object TxTypeEnum');
    expect(result).to.contain('tx_type: Option[TxTypeEnum.Value]');

  });

  it('should build array enumerations as expected', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: true,
      generateValidations: false,
      generateEnumerations: true
    };

    const result = await convert(arrayEnumSchema, config);
    expect(result).to.be.an('string');
    expect(result).to.contain('object NumbersEnum');
    expect(result).to.contain('numbers: Option[List[NumbersEnum.Value]]');

  });

  it('should NOT build enumerations when config is turned off', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: true,
      generateValidations: false,
      generateEnumerations: false
    };

    const result = await convert(arrayEnumSchema, config);
    expect(result).to.be.an('string');
    expect(result).to.not.contain('object NumbersEnum');
    expect(result).to.contain('numbers: Option[List[String]]');

  });

  it('it should produce validations from `allOf`', async () => {

    const config = {
      generateValidations: true
    };

    const result = await convert(allOfSchema, config);
    expect(result).to.be.an('string');
    expect(result).to.contain('must be greater than or equal to 3');
    expect(result).to.contain('must be multiple of (divisible by) 3');
    expect(result).to.contain('must be multiple of (divisible by) 5');

  });

  it('it should produce validations from `allOf` with nested references', async () => {

    const config1 = {
      generateValidations: true,
      generateEnumerations: true
    };

    const result1 = await convert(allOfWithReferencesSchema, config1);
    expect(result1).to.contain('object TypeEnum extends Enumeration');
    expect(result1).to.contain('`type`: TypeEnum.Value');

    const config2 = { generateValidations: true };
    const result2 = await convert(allOfWithReferencesSchema, config2);
    expect(result2).to.contain('`type`: String');

  });

});
