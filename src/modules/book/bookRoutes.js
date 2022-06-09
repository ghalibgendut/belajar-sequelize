const express = require('express')
const app = new express.Router()
const bookController = require('./bookController')

app.get('/search-book',bookController.searchBook)
app.post('/add-book', bookController.addBook)
app.patch('/book-update/:id', bookController.updateBookData)
app.delete('/delete-book/:id',bookController.deleteBook)



module.exports = app