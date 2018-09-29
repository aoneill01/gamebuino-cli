const express = require('express');
const path = require('path');
const chalk = require('chalk');
const opn = require('opn');

function emulator(binFile) {
    const gameFile = path.resolve(process.cwd(), binFile);    
    const app = express();

    app.get('/', (req, res) => {
        res.redirect('/console.html?bin=game.bin');
    });

    app.get('/game.bin', (req, res) => {
        res.sendFile(gameFile);
    });

    app.use(express.static(path.join(__dirname, 'node_modules', '@aoneill01', 'gamebuino-emulator', 'dist')));
    
    let server = app.listen(0, () => {
        const url = `http://localhost:${server.address().port}`;
        console.log(chalk.green(`Emulator running at ${url}`));
        console.log('Ctrl+C to quit');
        opn(url);
    });
}

module.exports = emulator;