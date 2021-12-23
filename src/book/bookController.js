const book = require('./bookModel')

class BookController {

    static getAllData = async (req, res) => {
        try {
            const bookData = await book.findAll()

            res.status(200).json({message: 'Data Retrived', bookData})
            
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }
}

module.exports = BookController