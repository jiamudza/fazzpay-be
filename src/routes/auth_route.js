const express = require('express')
const route = express()

const authController = require('../controller/auth_controller')

route.post('/register', authController.register)
route.post('/login', authController.login)
route.post('/pin', authController.pinVerify)
route.patch('/update-pin', authController.updatePin)

module.exports = route