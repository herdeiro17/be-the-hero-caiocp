const express = require('express'); //inicia o pacote express
const crypto = require('crypto');//pacote de criptografia de dados utilizado para gerar o ID da ONG

const OngController = require('./controllers/OngController');//inicializa o arquivo fonte da função Create
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //aqui ele está dizendo que a função de rotas ROUTER será chamada'routes'

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes //forma de exportar esta variável para ser utilizada em outros programas