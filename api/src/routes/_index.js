
const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

//Leio todos os arquivos na minha pasta Routes, corto somente o nome da entidade e aplico a rota para cada entidade
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        entityName = file.slice(0, -3);
        let route = require('./' + file);
        app.use('/api/' + entityName, route);
    });

module.exports = app;
