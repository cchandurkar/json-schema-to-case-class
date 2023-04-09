import { createCommand, processSchema } from '../../src/cli/program'
import { sanitizedAPIConfigs } from '../../src/cli/utils'
import { Config } from '../../src/config';
import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as sinon from 'sinon';

import { Command } from 'commander';

describe('CLI', () => {

  let program: Command;
  const processSpy = sinon.spy(process, 'exit');

  beforeEach(() => {
    program = createCommand();
    program?.allowUnknownOption(true);
    processSpy.restore();
  })

  it('Parse and map all input options to API options', async () => {
    const opts = sanitizedAPIConfigs(program?.opts())
    const hasAll: boolean = Object.keys(opts).every((key: string) => key in Config.default);
    expect(hasAll).to.equal(true)
  })

  it('Processes valid schema with default arguments', async () => {
    processSchema('./tests/test-data/simple-schema.json', program?.opts())
    expect(processSpy.calledWith(0)).to.equal(false)
  })

  it('Throws error for invalid input schema file', async () => {
    processSchema('./tests/test-data/ENOENT.json', program?.opts())
    expect(processSpy.calledWith(1)).to.equal(true)
  })

  it('Throws error for invalid schema', async () => {
    processSchema('./tests/test-data/invalid-schema.json', program?.opts())
    expect(processSpy.calledWith(1)).to.equal(true)
  })

})
