const port = 3007

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
// const cors = require('cors')

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
// server.use(cors({ origin: true }))
server.use(allowCors)

server.listen(port, function () {
    console.log('Run port ' + port)
})

module.exports = server