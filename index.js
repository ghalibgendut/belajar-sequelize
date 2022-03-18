const express = require('express')
const app = express()
const port = 3000

const bookRoutes = require('./src/modules/book/bookRoutes')

app.use(express.json())
app.use(bookRoutes)


app.get('/', (req, res) => {
    res.status(200).json(`<h1> API Running at port: ${port}</h1>`)
})

app.listen(port, () => {console.log(`API Running at ${port}`);})
