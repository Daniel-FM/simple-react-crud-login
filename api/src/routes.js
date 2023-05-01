const express = require('express');
const router = express.Router();
const UserController = require('./controllers/userController');
const ClientController = require('./controllers/clientController');

function routes(repositories){

    const userController = new UserController(repositories.user);
    router.get('/users/', userController.getAllUsers);
    router.get('/users/:userid', userController.getUserById);
    router.post('/users', userController.createUser);
    router.delete('/users/:userid', userController.deleteUser);
    router.put('/users/:userid', userController.updateUser);

    const clientController = new ClientController(repositories.client);
    router.post('/clients', clientController.createClient);
    router.post('/auth/login', clientController.login);
    router.get('/auth/logout', clientController.logout);
    router.get('/auth/currentClient', clientController.getLoggedInClient);

    return router;
}

module.exports = routes;