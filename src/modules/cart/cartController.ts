import cart from "./cartModel";
import { Request, Response } from "express";

class CartController {

    static addCart = async (req: Request, res: Response) => {
        try {
            const data = {
                userId: req.params.userId,
                bookId: req.params.bookId,
                bookQty: req.body.bookQty
            }
            
            const insertData = await cart.create(data)

            res.status(200).json({message: 'item added', insertData})
            
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

    static deleteCart = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const cartDb = await cart.findAll({where: {id}})
            if (cartDb.length == 0) {
                res.status(404).json({message: 'No data found!'})
            }
            else {
                const cartData = await cart.destroy({where: {id}})
                res.status(200).json({message: 'Item removed!', cartData})
            }
            
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

}

export default CartController