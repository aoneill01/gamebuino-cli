#!/usr/bin/env node

const { prompt } = require('inquirer');
const handlebars = require('handlebars');
const fs = require('fs-extra');
const path = require('path');

const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Enter project name (e.g. SampleGame) ...'
    }
];

prompt(questions)
    .then(answers => {
        generateProject(answers);
    });

function generateProject(answers) {
    writeTemplate('sketch.ino', answers.projectName, `${answers.projectName}.ino`, answers);
    writeTemplate('README.md', '.', 'README.md', answers);
    writeTemplate('gitignore', '.', '.gitignore', answers);
    fs.ensureDirSync(path.join('assets'));
    fs.ensureDirSync(path.join('binaries', answers.projectName));
}

function writeTemplate(templateName, destinationDir, destinationName, answers) {
    const fileContents = fs.readFileSync(path.join(__dirname, 'templates', templateName), 'utf-8').toString();
    const template = handlebars.compile(fileContents);
    fs.ensureDir(destinationDir);
    fs.writeFileSync(path.join(destinationDir, destinationName), template(answers));
}
