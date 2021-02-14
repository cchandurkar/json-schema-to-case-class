import { convert, stripSchema, resolveRefs } from '../src'
import { expect } from 'chai';
import { Config } from '../src/config';

const sampleLocalRefSchema = require('./test-data/sample-local-ref-schema');

describe( 'Strip Schema', () => {

    it('should strip JSON Schema', async () => {

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

        let result = await resolveRefs(sampleLocalRefSchema)
            .then( res => stripSchema( res.schema, config) );

        expect(result).to.be.an('object');
        expect(result.caseClassName).to.eql( Config.default.topLevelCaseClassName );
        expect(result.parameters[0].nestedObject.parameters[0].paramType).to.eql('String');

    });

});
