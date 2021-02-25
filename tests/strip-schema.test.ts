import get from 'lodash/get';
import find from 'lodash/find';
import { expect } from 'chai';

import { stripSchema } from '../src'
import { Config } from '../src/config';

import * as simpleSchema from './test-data/simple-schema.json'
import * as simpleSchemaNoTitle from './test-data/simple-schema-no-title.json'
import * as nestedSchema from './test-data/nested-schema.json';

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

    expect(result).to.be.an('object');
    expect(result.entityName).to.eql(nestedSchema.title);
    expect(get(find(result.parameters, { paramName: 'product_id' }), 'paramType')).to.eql('Int');
    expect(get(find(result.parameters, { paramName: 'tags' }), 'paramType')).to.eql('List[Any]');
    expect(get(find(result.parameters, { paramName: 'dimensions' }), 'paramType')).to.eql('Any');

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

    expect(result).to.be.an('object');
    expect(result.entityName).to.eql(nestedSchema.title);
    expect(get(find(result.parameters, { paramName: 'product_id' }), 'paramType')).to.eql('Int');
    expect(get(find(result.parameters, { paramName: 'tags' }), 'paramType')).to.eql('List[Any]');
    expect(get(find(result.parameters, { paramName: 'dimensions' }), 'paramType')).to.eql('Any');

  });

});
