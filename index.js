#!/usr/bin/env node
const initProject = require('./initProject');
const emulator = require('./emulator');
const program = require('commander');


program
    .command('init')
    .action(initProject);

program
    .command('emulator <binFile>')
    .action(emulator);

program.parse(process.argv)
