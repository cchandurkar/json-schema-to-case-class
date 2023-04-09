import { spawn, exec } from 'child_process'
const { promisify } = require('util');

const pexec = promisify(exec);

describe('CLI', () => {

  it('Should parse the input arguments as expected', async () => {

    spawn('npm run cli', ['--', './tests/test-data/simple-schema.json']).stdout.on()

  })

});