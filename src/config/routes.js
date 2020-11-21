const express = require('express')
const auth = require('./auth')

module.exports = function(server) {
    
    // rotas protegidas
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    protectedApi.use(auth)

    //rotas públicas
    const openApi = express.Router()
    server.use('/oapi', openApi)
    
    const AuthService = require('../api/user/userService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validate-token', AuthService.validateToken)

    const CompanyUserService = require('../api/company/companyUserService')
    openApi.post('/company', CompanyUserService.createCompany)
    openApi.get('/company', CompanyUserService.getCompanyByUser)
}