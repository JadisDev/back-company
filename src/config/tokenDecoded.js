const jwt = require('jsonwebtoken')
const env = require('../../.env');

module.exports = function (req) {
    try {
        var token = null;
        if (req.headers['authorization']) {
            let authorization = req.headers['authorization']
            token = authorization.split('Bearer')[1]
        } else {
            token = req.body.token || req.query.token
        }
        return (jwt.verify(token.trim(), env.authSecret)).user;
    } catch (err) {
        throw err
    }
}