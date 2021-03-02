import get from 'lodash/get';
import find from 'lodash/find';
import { expect } from 'chai';

import { stripSchema } from '../src'
import { Config } from '../src/config';

import * as simpleSchema from './test-data/simple-schema.json'
import * as simpleSchemaNoTitle from './test-data/simple-schema-no-title.json'
import * as nestedSchema from './test-data/nested-schema.json';
import * as stringEnumSchema from './test-data/enum-string-schema.json';

describe('Function stripSchema()', () => {

  it('should strip simple JSON Schema', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      topLevelCaseClassName: null,
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: false
    };

    const result = await stripSchema(simpleSchema, Config.resolve(config));

    expect(result).to.be.an('object');
    expect(result.entityName).to.eql(simpleSchema.title);
    expect(result.parameters[0].paramType).to.eql('String');

  });

  it('should use default top level class name for schema with no title', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      topLevelCaseClassName: 'PersonInfo',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: false
    };

    const result = await stripSchema(simpleSchemaNoTitle, Config.resolve(config));
    const ageValidations = get(find(result.parameters, { paramName: 'age' }), 'validations', {});

    expect(result).to.be.an('object');
    expect(result.entityName).to.eql(config.topLevelCaseClassName);
    expect(result.parameters[0].paramType).to.eql('String');

    expect(ageValidations).to.eql({ minimum: 0 });

  });

  it('should strip nested JSON Schema with local references', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      topLevelCaseClassName: 'PersonInfo',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: false
    };

    const result = await stripSchema(nestedSchema, Config.resolve(config));
    const tagsValidations = get(find(result.parameters, { paramName: 'tags' }), 'validations', {});
    const priceValidations = get(find(result.parameters, { paramName: 'price' }), 'validations', {});

    expect(result).to.be.an('object');
    expect(result.entityName).to.eql(nestedSchema.title);
    expect(get(result, 'parameters[4].nestedObject.parameters[0].paramType')).to.eql('Double');

    expect(tagsValidations).to.eql({ minItems: 1, uniqueItems: true });
    expect(priceValidations).to.eql({ exclusiveMinimum: 0 });

  });

  it('should populate generic type of nested schema as expected', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      topLevelCaseClassName: 'PersonInfo',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: false
    };

    const result = await stripSchema(nestedSchema, Config.resolve(config));
    const tagsProperty = result.parameters[3];

    expect(result).to.be.an('object');
    expect(tagsProperty.genericType).to.eql('String');

  });

  it('should populate generic type of parameter as expected for maxDepth less than the total depth', async () => {

    const config = {
      maxDepth: 1,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      topLevelCaseClassName: 'PersonInfo',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: false
    };

    const result = await stripSchema(nestedSchema, Config.resolve(config));
    const tagsProperty = result.parameters[3];
    const dimsProperty = result.parameters[4];

    expect(result).to.be.an('object');
    expect(result.entityName).to.eql(nestedSchema.title);
    expect(tagsProperty.genericType).to.eql('Any');
    expect(tagsProperty.paramType).to.eql('List');
    expect(dimsProperty.paramType).to.eql('Any');

  });

  it('should parse parameter types as expected for maxDepth less than the total depth', async () => {

    const config = {
      maxDepth: 1,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      topLevelCaseClassName: 'PersonInfo',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: false
    };

    const result = await stripSchema(nestedSchema, Config.resolve(config));
    const tagsProperty = result.parameters[3];
    const dimsProperty = result.parameters[4];

    expect(result).to.be.an('object');
    expect(result.entityName).to.eql(nestedSchema.title);
    expect(tagsProperty.genericType).to.eql('Any');
    expect(tagsProperty.paramType).to.eql('List');
    expect(dimsProperty.paramType).to.eql('Any');

  });

  it('should populate enumerations as expected', async () => {

    const config = {
      maxDepth: 0,
      optionSetting: 'useOptions',
      classNameTextCase: 'pascalCase',
      classParamsTextCase: 'snakeCase',
      defaultGenericType: 'Any',
      parseRefs: true,
      generateComments: false
    };

    const result = await stripSchema(stringEnumSchema, Config.resolve(config));
    const txProperty = get(result, 'parameters[1].nestedObject.parameters[2]');

    expect(result).to.be.an('object');
    expect(txProperty.paramType).to.eql('String');
    expect(txProperty.enumeration).to.eql([
      'DEBIT',
      'CREDIT',
      'VOID'
    ]);

  });

});
