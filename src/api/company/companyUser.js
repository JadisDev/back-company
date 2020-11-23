const restful = require('node-restful')
const mongoose = restful.mongoose

const companySchema = new mongoose.Schema({
    name: {type: String, min:3, required: true},
    cnpj: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
    user: mongoose.Schema.Types.ObjectId
})
module.exports = restful.model('CompanyUser', companySchema)