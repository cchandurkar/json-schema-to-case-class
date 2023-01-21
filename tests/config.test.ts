import { expect } from 'chai';

import { Config } from '../src/config';

describe('Config', () => {

  it('extends default config as expected', async () => {

    const maxDepthConfig = Config.resolve({ maxDepth: 2 })
    expect(maxDepthConfig.maxDepth).to.eql(2)
    expect(maxDepthConfig.topLevelCaseClassName).to.eql(Config.default.topLevelCaseClassName)

    const nameConfig = Config.resolve({ topLevelCaseClassName: 'Person' })
    expect(nameConfig.maxDepth).to.eql(Config.default.maxDepth)

  });

  it('Config.resolve ignores nulls and undefined', async () => {

    const maxDepthConfig = Config.resolve({ maxDepth: 2, optionSetting: null })
    expect(maxDepthConfig.maxDepth).to.eql(2)
    expect(maxDepthConfig.optionSetting).to.eql(Config.default.optionSetting)

    const nameConfig = Config.resolve({ defaultGenericType: undefined })
    expect(nameConfig.defaultGenericType).to.eql(Config.default.defaultGenericType)

  });

});
