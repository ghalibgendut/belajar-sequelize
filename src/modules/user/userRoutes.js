const express = require('express')
const app = new express.Router()
const userController = require('./userController')

app.post('/new-user', userController.newUser)
app.post('/login', userController)


module.exports = app