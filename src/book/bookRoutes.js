const express = require('express')
const app = new express.Router()
const bookController = require('./bookController')

app.get('/all-book-data', bookController.getAllData)
app.get('/search-book',bookController.searchBook)
app.post('/add-book', bookController.addBook)



module.exports = app