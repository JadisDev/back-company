const User = require('../user/user');
const companyUser = require('./companyUser')
const tokenDecoded = require('../../config/tokenDecoded');

const updateCompany = (req, res, next) => {
    try {

        const user = tokenDecoded(req)
        const cnpj = req.body.cnpj || null
        const name = req.body.name || null
        const lat = req.body.lat || null
        const lng = req.body.lng || null

        companyUser.findOne({ cnpj, user }).then((company) => {
            if (!company) return res.status(500).send({ errors: ['Empresa não encontrada para esse usuário'] })

            companyUser.findOneAndUpdate({ 'cnpj': cnpj }, { 'name': name, 'lat': lat, 'lng': lng}, {
                returnOriginal: false
            }, (e) => {
                if (e) return res.status(500).send({ errors: ['Erro ao atualizar os dados'] })
                return res.status(200).send({ message: 'Dados da empresa atualizado com sucesso' })
            });

        }).catch((e) => {

        })

    } catch (e) {
        return res.status(500).send({ errors: [e.message] })
    }
}

const createCompany = (req, res, next) => {

    try {
        const loggedUser = tokenDecoded(req)

        const cnpj = req.body.cnpj || null
        const name = req.body.name || null
        const lat = req.body.lat || null
        const lng = req.body.lng || null

        User.findOne({ 'login': loggedUser.login }).then((user) => {
            if (!user) return res.status(500).send({ errors: ['Usuário não encontrado'] })
            companyUser.findOne({ cnpj }).then((company) => {
                if (company) {
                    return res.status(500).send({ errors: ['Essa empresa já esta cadastrada'] })
                }

                const newCompanyUser = new companyUser({
                    cnpj,
                    name,
                    lat,
                    lng,
                    'user': user
                })

                newCompanyUser.save((e) => {
                    if (e) return res.status(500).send({ errors: [e.message] })
                    return res.status(200).send({ message: 'Cadastro empresa realizado' })
                })

            }).catch((e) => {
                return res.status(500).send({ errors: ['Erro ao procurar empresa'] })
            })

        })
    } catch (e) {
        return res.status(500).send({ errors: [e.message] })
    }
}

const getCompanyByUser = (req, res, next) => {

    try {
        const loggedUser = tokenDecoded(req)
        User.findOne({ 'login': loggedUser.login }).then((user) => {
            if (!user) return res.status(500).send({ errors: ['Usuário não encontrado'] })
            companyUser.find({ 'user': user }).then((company) => {
                return res.status(200).send({ data: company })
            }).catch((e) => {
                return res.status(500).send({ errors: [e.message] })
            })
        })
    } catch (e) {
        return res.status(500).send({ errors: [e.message] })
    }
}

const getCompanyByUserAndCNPJ = (req, res, next) => {

    try {
        const { cnpj } = req.params;
        const loggedUser = tokenDecoded(req)
        User.findOne({ 'login': loggedUser.login }).then((user) => {
            if (!user) return res.status(500).send({ errors: ['Usuário não encontrado'] })
            companyUser.findOne({ 'cnpj': cnpj, 'user': user }).then((company) => {
                return res.status(200).send({ data: company })
            }).catch((e) => {
                return res.status(500).send({ errors: [e.message] })
            })
        })
    } catch (e) {
        return res.status(500).send({ errors: [e.message] })
    }
}


const removeCompany = (req, res, next) => {
    try {

        const loggedUser = tokenDecoded(req)
        const { cnpj } = req.params;

        companyUser.remove({ cnpj, 'user': loggedUser }, function (e) {
            if (e) return res.status(500).send({ errors: [cnpj] })
            return res.status(200).send({ data: cnpj })
        })

    } catch (e) {
        return res.status(500).send({ errors: [e.message] })
    }
}

module.exports = { createCompany, getCompanyByUser, removeCompany, getCompanyByUserAndCNPJ, updateCompany }