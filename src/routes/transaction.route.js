const express = require('express')
const route = express()

const transController = require('../controller/transaction_controller')

route.post('/', transController.add)
route.get('/:user_id', transController.getById)

module.exports = route