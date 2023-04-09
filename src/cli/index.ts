#! /usr/bin/env node
import { createCommand, processSchema } from './program';

const program = createCommand();
program.action((src, options) => {
  processSchema(src, options).catch(err => {
    console.error(`\x1b[31m${err.message}\x1b[0m`);
    process.exit(1);
  });
});
program.parse();
