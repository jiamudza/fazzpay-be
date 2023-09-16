const express = require('express')
const route = express()

const transController = require('../controller/transaction.controller')

route.post('/', transController.add)
route.get('/:user_id', transController.getById)
route.get('/history/:user_id', transController.getByIdFilter)

module.exports = route
