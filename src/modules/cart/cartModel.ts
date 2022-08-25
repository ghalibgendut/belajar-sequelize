import db from "../../../config/db";
import Sequelize from "sequelize";

const cartModel = db.define('cart', {
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'userId': Sequelize.INTEGER,
    'bookId': Sequelize.INTEGER,
    'bookQty': Sequelize.INTEGER
},{
    freezeTableName: true
})

export default cartModel