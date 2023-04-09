#! /usr/bin/env node
import { createCommand, processSchema } from './program';

const program = createCommand();
program.action(processSchema);
program.parse();
