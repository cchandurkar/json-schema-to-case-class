import { stripSchema } from '../src'
import { expect } from 'chai';

const simpleSchemaSample = require('./test-data/simple-schema');
const simpleSchemaNoTitleSample = require('./test-data/simple-schema-no-title');
const nestedSchemaSample = require('./test-data/nested-schema');


describe( 'Function stripSchema()', () => {

    it( 'should strip simple JSON Schema', async () => {

        let config = {
            maxDepth: 0,
            optionSetting: "useOptions",
            classNameTextCase: 'pascalCase',
            classParamsTextCase: 'snakeCase',
            topLevelCaseClassName: null,
            defaultGenericType: "Any",
            parseRefs: true,
            generateComments: false
        };

        let result = await stripSchema( simpleSchemaSample, config);

        expect(result).to.be.an('object');
        expect(result.entityName).to.eql( simpleSchemaSample.title );
        expect(result.parameters[0].paramType).to.eql('String');

    });

    it('should use default top level class name for schema with no title', async () => {

        let config = {
            maxDepth: 0,
            optionSetting: "useOptions",
            classNameTextCase: 'pascalCase',
            classParamsTextCase: 'snakeCase',
            topLevelCaseClassName: 'PersonInfo',
            defaultGenericType: "Any",
            parseRefs: true,
            generateComments: false
        };

        let result = await stripSchema( simpleSchemaNoTitleSample, config);

        expect(result).to.be.an('object');
        expect(result.entityName).to.eql( config.topLevelCaseClassName );
        expect(result.parameters[0].paramType).to.eql('String')

    });

    it('should strip nested JSON Schema with local references', async () => {

        let config = {
            maxDepth: 0,
            optionSetting: "useOptions",
            classNameTextCase: 'pascalCase',
            classParamsTextCase: 'snakeCase',
            topLevelCaseClassName: 'PersonInfo',
            defaultGenericType: "Any",
            parseRefs: true,
            generateComments: false
        };

        let result = await stripSchema(nestedSchemaSample, config);

        expect(result).to.be.an('object');
        expect(result.entityName).to.eql( nestedSchemaSample.title );
        expect(result.parameters[4].nestedObject.parameters[0].paramType).to.eql('Double');

    });


});
