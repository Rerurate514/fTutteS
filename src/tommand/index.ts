#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './modules/commands/init';

const program = new Command();

program
    .name("tommand")
    .description("setup ftuttes project")
    .version("0.1.0");

program.addCommand(initCommand);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.help();
}
