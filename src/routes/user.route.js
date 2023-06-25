const express = require('express')
const formUpload = require('../helper/formData')
const route = express()
const userController = require('../controller/user.controller')

route.get('/', userController.get)
route.get('/:user_id', userController.getById)
route.patch('/:user_id', formUpload.single('userImage'), userController.update)
route.patch('/:user_id', userController.update)

module.exports = route
