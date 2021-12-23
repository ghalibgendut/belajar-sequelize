const express = require('express')
const app = new express.Router()
const bookController = require('./bookController')

app.get('/all-book-data', bookController.getAllData)



module.exports = app