const { Op, where } = require("sequelize");
const book = require('./bookModel')

class BookController {

    static addBook = async (req, res) => {
        try {
            const data = {
                isbn: req.body.isbn,
                name: req.body.name,
                year: req.body.year,
                author: req.body.author,
                description: req.body.description,
                image: req.body.image
            }

            const insertData = await book.create(data)

            res.status(200).json({message: 'Data Inserted!', insertData})

        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    } 

    static searchBook = async (req, res) => {
        try {
            let isbn = req.query.isbn
            let name = req.query.name
            let bookData
            
            if (!isbn && !name) {
                bookData = await book.findAll()

                res.status(200).json({message: 'Data Retrived', bookData})
            }
            else{
                bookData = await book.findAll({
                    where: {
                        [Op.or]: [{isbn: isbn}, {name: {[Op.like]: `%${name}%`}}]
                    }
                })
    
                if (!bookData) {
                    res.status(404).json({message:`Data not found!`})
                }
                else{
                    res.status(200).json({bookData})
                }
            }
            
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

    static updateBookData = async (req, res) => {
        try {
            const id = req.params.id ? req.params.id : res.status(400).json({message: `ID cannot be null!`})
            let data = {
                isbn: req.body.isbn ? req.body.isbn : "",
                name: req.body.name ? req.body.name : "",
                year: req.body.year ? req.body.year : "",
                author: req.body.author ? req.body.author : "",
                description: req.body.description ? req.body.description : ""
            }

            // check if data not null
            if (data.isbn == '' && data.name == '' && data.year == '' && data.author == '' && data.description == '') {
                res.status(400).json({message: `Data cannot be null!`})
            }
            else{
                // call the data from db
                const bookDb = await book.findAll({where: {id}})
                if (!bookDb) {
                    res.status(404).json({message: `No data found!`})
                }
                else {
                    let bookObj = bookDb[0].dataValues

                    const updateData = await book.update({
                        isbn: data.isbn ? data.isbn : bookObj.isbn,
                        name: data.name ? data.name : bookObj.name,
                        year: data.year ? data.year : bookObj.year,
                        author: data.author ? data.author : bookObj.author,
                        description: data.description ? data.description : bookObj.description,
                        updatedAt: Date.now()
                    },{where: {id}})
    
                    await updateData.save()

                    res.status(200).json({message:`Update data success!`})
                }
            }
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }
}

module.exports = BookController