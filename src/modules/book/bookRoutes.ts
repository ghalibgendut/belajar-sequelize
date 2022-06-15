import express from 'express'
const app = express.Router()
import bookController from './bookController'

app.get('/search-book',bookController.searchBook)
app.post('/add-book', bookController.addBook)
app.patch('/book-update/:id', bookController.updateBookData)
app.delete('/delete-book/:id',bookController.deleteBook)



export default app