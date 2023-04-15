#! /usr/bin/env node
import { createCommand, processSchema } from './program';

const program = createCommand();
program.action((src: string, options: any) => {
  processSchema(src, options).catch((err: Error) => {
    const displayError = options.debug ? err.stack : err.message
    console.error(`\x1b[31m${displayError}\x1b[0m`);
  });
});
program.parse();
