import { createCommand } from '../../src/cli/program'
import { Config } from '../../src/config';
import { expect } from 'chai';
import { beforeEach } from 'mocha';
import { Command } from 'commander';

describe('CLI', () => {

  let program: Command;

  beforeEach(() => {
    program = createCommand();
    program?.allowUnknownOption(true);
  })

  it('Should parse and map all input options to API options', async () => {
    const ignoreKeys = ['output'];
    const opts = program?.opts().filter()
    const hasAll: boolean = Object.keys(opts)
      .filter((key: string) => !(key in ignoreKeys))
      .every((key: string) => key in Config.default);
    expect(hasAll).to.equal(true)
  })

})
