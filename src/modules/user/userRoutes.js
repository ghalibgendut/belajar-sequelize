const express = require('express')
const app = new express.Router()
const userController = require('./userController')
const auth = require('../../middleware/index')

app.post('/new-user', userController.newUser)
app.post('/login', userController.login)
app.get('/user-profile/:userId', auth, userController.userProfile)
app.patch('/edit-profile/:userId', auth, userController.editProfile)
app.delete('/logout/:userId', userController.logout)


module.exports = app