const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new   mongoose.Schema({
    name: {type: String, min:3, required: true},
    login: {type: String, min:3, required: true},
    password: {type: String, min:3, required: true},
    createdAt: {type: Date, default: Date.now}
})

module.exports = restful.model('User', userSchema)