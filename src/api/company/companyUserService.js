const User = require('../user/user');
const Company = require('./companyUser')

const createCompany = (req, res, next) => {

    try {
        User.findOne({ 'login': 'xx' }).then((user) => {
            if (!user) return res.status(500).send({ errors: ['Usuário não encontrado'] })

            const newCompanyUser = new Company({
                'name': 'teste',
                'cnpj': '1231231231',
                'lat': 1,
                'lng': 2,
                'user': user
            })

            newCompanyUser.save((e) => {
                if (e) return res.status(500).send({ errors: [e.message] })
                return res.status(200).send({ message: 'Cadastro empresa realizado' })
            })
        })
    } catch (e) {
        return res.status(500).send({ errors: [e.message] })
    }
}

const getCompanyByUser = (req, res, next) => {

    try {
        User.findOne({ 'login': 'xx' }).then((user) => {
            if (!user) return res.status(500).send({ errors: ['Usuário não encontrado'] })
            Company.find({'user': user}).then((company)=>{
                return res.status(200).send({ data: company })
            }).catch((e) => {
                return res.status(500).send({ errors: [e.message] })
            })
        })
    } catch (e) {
        return res.status(500).send({ errors: [e.message] })
    }
}

module.exports = {createCompany, getCompanyByUser}