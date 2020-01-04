var express = require('express');
const productModel = require('../models/product.model')
const cartModel = require('../models/cart.model')
var router = express.Router();

router.get('/', async(req, res) => {
    winningProduct = await productModel.getWinningProductByUser(req.session.authUser);
    entity = [];
    winningProduct.forEach(async element => {
        entity.push({
            User: req.session.authUser,
            Product: element.ProductID
        })
        element.Status = 1;
        await productModel.patch(element);
    });

    entity.forEach(async element => {
        await cartModel.add(element)
    });
    cart = await productModel.getProductByUserCart(req.session.authUser);

    res.render('cart', {
        title: 'Giỏ hàng',
        cart
    });
});

module.exports = router;