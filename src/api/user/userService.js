const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const env = require('../../../.env')

const User = require('./user');

const login = (req, res, next) => {
    try {
        const login = req.body.login || ''
        const password = req.body.password || ''

        User.findOne({ 'login': login }).then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ user }, env.authSecret, {
                    expiresIn: "1 day"
                })
                const { name, login } = user
                return res.json({ name, login, token })
            } else {
                return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
            }
        }).catch((e) => {
            return res.status(400).send({ erros: e.message })
        })
    } catch (e) {
        return res.status(500).send({ errors: ['Erro interno'] })
    }
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

const signup = (req, res, next) => {

    try {

        const name = req.body.name || ''
        const login = req.body.login || ''
        const password = req.body.password || ''
        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync(password, salt)

        User.findOne({'login': login}).then((user) => {
            if (user) {
                return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
            } else {
                const newUser = new User({ name, login, password: passwordHash })
                newUser.save((e) => {
                    if (e) return res.status(500).send({ errors: [e.message] })
                    return res.status(200).send({ message: 'Cadastro realizado' })
                })
            }
        }).catch((e) => {
            return res.status(500).send({ errors: ['Erro interno'] })
        })

    } catch (e) {
        return res.status(500).send({ errors: ['Erro interno'] })
    }
}

module.exports = { login, signup, validateToken }