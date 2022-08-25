import express, {Express, Request, Response} from 'express'
import dotenv from "dotenv"
dotenv.config()
const app: Express = express();
const port = process.env.PORT

import bookRoutes from './src/modules/book/bookRoutes'
import userRoutes from './src/modules/user/userRoutes'
import cartRoutes from './src/modules/cart/cartRoutes'

app.use(express.json())
app.use(bookRoutes)
app.use(userRoutes)
app.use(cartRoutes)



app.get('/', (req: Request, res: Response) => {
    res.status(200).json(`<h1> API Running at port: ${port}</h1>`)
})

app.listen(port, () => {console.log(`API Running at ${port}`);})
