import * as express from 'express'
const route = express.Router()
const userController = require('./userController')

route.post('/register', userController.addUser)
route.get('/all-user', userController.findAllUser)
route.post('/login', userController.login)

module.exports = route
