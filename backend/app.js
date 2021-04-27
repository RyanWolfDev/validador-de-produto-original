//Manipular as requisições, rotas e middlewares
const express = require('express');
const app = express();

//Rotas
const routes = require('./src/routes/_index');

//Permitir acesso de aplicações externas
const cors = require('cors');

//Interpretar body da requisição 
const bodyParser = require('body-parser');

//Manupilação dos paths
const path = require('path');

//Banco de Dados MySQL
const Sequelize = require('sequelize');
const config = require('./config/database.js');

//Configurações do banco
const sequelize = new Sequelize(config);

// Conectando com o Banco de Dados MYSQL
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexão com o Banco estabelecida com sucesso!');
    })
    .catch(err => {
        console.error('Conexão recusada: ' + err);
    });


//Interpretar body da requisição 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Permissão para pasta images serem acessadas pela url
app.use("/public", express.static(path.join("public")));

//Permitir acesso de aplicações externas
app.use(cors());

app.use(routes);

module.exports = app;