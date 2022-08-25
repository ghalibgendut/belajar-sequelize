import express from 'express'
const app = express.Router()
import userController from './userController'
import auth from '../../middleware/index'

app.post('/new-user', userController.newUser)
app.post('/login', userController.login)
app.get('/user-profile/:userId', auth, userController.userProfile)
app.patch('/edit-profile/:userId', auth, userController.editProfile)
app.delete('/logout/:userId', userController.logout)


export default app