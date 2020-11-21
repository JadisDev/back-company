const jwt = require('jsonwebtoken')
const env = require('../../.env')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    } else {

        var token = null;
        if (req.headers['authorization']) {
            let authorization = req.headers['authorization']
            token = authorization.split('Bearer')[1]
        } else {
            token = req.body.token || req.query.token
        }

        if (!token) {
            return res.status(403).send({ errors: ['No token provided.'] })
        }

        jwt.verify(token.trim(), env.authSecret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: [err.message]
                })
            } else {
                // req.decoded = decoded
                next()
            }
        })

    }
}
