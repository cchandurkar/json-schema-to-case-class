import { convert } from '../src'
import { expect } from 'chai';

const localRefSchemaSample = require('./test-data/local-ref-schema');


describe( 'Function convert()', () => {

    it('should convert the schema as expected', async () => {

        let config = {
            maxDepth: 0,
            optionSetting: "useOptions",
            classNameTextCase: 'pascalCase',
            classParamsTextCase: 'snakeCase',
            topLevelCaseClassName: null,
            defaultGenericType: "Any",
            parseRefs: true,
            generateComments: true
        };

        let result = await convert(localRefSchemaSample, config);
        expect(result).to.be.an('string');

    });

});
