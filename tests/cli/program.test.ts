import { createCommand, processSchema } from '../../src/cli/program'
import { sanitizedAPIConfigs } from '../../src/cli/utils'
import { Config } from '../../src/config';
import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as sinon from 'sinon';

import { Command, InvalidArgumentError } from 'commander';

describe('CLI', () => {

  let program: Command;

  beforeEach(() => {
    program = createCommand();
    program?.allowUnknownOption(true);
  })

  it('Parse and map all input options to API options', async () => {
    const opts = sanitizedAPIConfigs(program?.opts())
    const hasAll: boolean = Object.keys(opts).every((key: string) => key in Config.default);
    expect(hasAll).to.equal(true)
  })

  it('Processes valid schema with default arguments', async () => {
    expect(async () => await processSchema('./tests/test-data/simple-schema.json', program?.opts()))
      .to.not.throw();
  })

  it('Throws error for invalid input schema file', async () => {
    return processSchema('./tests/test-data/ENOENT.json', program?.opts()).catch(err => {
      expect(err.message).to.contain('Error reading input file')
    })
  })

  it('Throws error for invalid schema', async () => {
    return processSchema('./tests/test-data/invalid-schema.json', program?.opts()).catch(err => {
      expect(err.message).to.contain('Failed to convert schema')
    })
  })

  it('Throws error for invalid schema', async () => {
    const processSpy = sinon.stub(process, 'exit');
    expect(() => program.parse(['abc.json', '--option-setting', 'invalid'], { from: 'user' })).to.throw(InvalidArgumentError)
    expect(processSpy.calledWith(1)).to.equal(true);
  })

})
