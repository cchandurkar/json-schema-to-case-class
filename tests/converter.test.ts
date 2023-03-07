import SchamaConverter from '../src/'
import { expect } from 'chai';

import { Config } from '../src/config';

import * as simpleSchema from './test-data/simple-schema.json'
import * as localRefSchemaSample from './test-data/local-ref-schema.json'
import * as nestedSchema from './test-data/nested-schema.json'
import * as latLongSchema from './test-data/lat-long-schema.json'
import * as stringEnumSchema from './test-data/enum-string-schema.json'
import * as arrayEnumSchema from './test-data/enum-array-schema.json'
import * as allOfSchema from './test-data/compositions-allOf-simple.json'
import * as allOfWithReferencesSchema from './test-data/compositions-allOf-references.json'
import * as arrayOfObjectsSchema from './test-data/array-of-objects.json'
import * as arrayOfArrayStringSchema from './test-data/array-of-array-string.json'
import * as arrayOfArrayObjectSchema from './test-data/array-of-array-object.json'
import * as topLevelRefSchema from './test-data/top-level-ref.json'

describe('Function convert()', () => {

  const convert = SchamaConverter.convert

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
    expect(result).to.contain('assert( latitude >= -90, "`latitude` must be greater than or equal to -90" )')
    expect(result).to.contain('assert( longitude <= 180, "`longitude` must be less than or equal to 180" )')

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
    expect(result).to.contain('assert( age.forall(_ >= 3), "`age` must be greater than or equal to 3" )');
    expect(result).to.contain('assert( age.forall(_ % 3 === 0), "`age` must be multiple of (divisible by) 3" )');
    expect(result).to.contain('assert( age.forall(_ % 5 === 0), "`age` must be multiple of (divisible by) 5" )');

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
    expect(result2).to.contain('assert( state.length <= 2, "`state` does not meet maximum length of 2" )')

  });

  it('it should process nested json object arrays', async () => {

    const result1 = await convert(arrayOfObjectsSchema, Config.default);
    const result2 = await convert(arrayOfObjectsSchema, Config.resolve({ maxDepth: 1 }));
    expect(result1).to.contain('addresses: Option[List[Addresses]]');
    expect(result2).to.contain('addresses: Option[List[Any]]');

    const result3 = await convert(arrayOfArrayStringSchema, Config.default);
    const result4 = await convert(arrayOfArrayStringSchema, Config.resolve({ maxDepth: 1 }));
    expect(result3).to.contain('experience: Option[List[List[String]]]');
    expect(result4).to.contain('experience: Option[List[Any]]');

    const result5 = await convert(arrayOfArrayObjectSchema, Config.default);
    const result6 = await convert(arrayOfArrayObjectSchema, Config.resolve({ maxDepth: 1 }));
    expect(result5).to.contain('experience: Option[List[List[Experience]]]');
    expect(result6).to.contain('meta: Option[Any]');

  });

  it('should convert top-level references', async () => {
    const result = await convert(topLevelRefSchema, Config.default);
    expect(result).to.contain('case class MyCaseClass');
    expect(result).to.contain('prop1: String');
    expect(result).to.contain('prop2: Prop2');
    expect(result).to.contain('case class Prop2');
    expect(result).to.contain('inner1: String');
    expect(result).to.contain('inner2: String');
  })

});
