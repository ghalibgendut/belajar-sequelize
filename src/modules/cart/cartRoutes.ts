import express from "express";
const app = express.Router()
import cartController from './cartController';
import auth from "../../middleware/index";

app.post('/add-cart', auth, cartController.addCart)
app.delete('/delete-item-cart', auth, cartController.deleteCart)


export default app