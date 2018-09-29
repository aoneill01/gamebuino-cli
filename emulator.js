const express = require('express');
const path = require('path');
const chalk = require('chalk');

const port = 3000;

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
    
    app.listen(port, () => {
        console.log(chalk.green(`Emulator running at http://localhost:${port}`));
        console.log('Ctrl+C to quit');
    });
}

module.exports = emulator;