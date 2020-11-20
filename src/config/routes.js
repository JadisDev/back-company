const express = require('express')

module.exports = function(server) {

    //configurado grupo de rotas api
    const router = express.Router();
    server.use('/api', router)

    //configurado verbos para usuario
    const userService = require('../api/user/userService')
    userService.register(router, '/users')
}