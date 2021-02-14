import { convert } from '../src'
import { expect } from 'chai';

const sampleLocalRefSchema = require('./test-data/sample-local-ref-schema');

describe( 'Converter', () => {

    it('should resolve JSON Schema', async () => {

        let result = await convert( sampleLocalRefSchema, {
            maxDepth: 0,
            optionSetting: "useOptions",
            classNameTextCase: 'pascalCase',
            classParamsTextCase: 'snakeCase',
            topLevelCaseClassName: null,
            defaultGenericType: "Any",
            parseRefs: true,
            generateComments: false
        });

        // console.log(JSON.stringify(result, null, 2));
        expect(result).to.be.an('object');

    });

});
