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
    wonlist = await productModel.getProductByUserCart(req.session.authUser);

    res.render('wonlist', {
        title: 'Giỏ hàng',

        wonlist
    });
});

router.get('/:product', async(req, res) => {
    action = req.query.Action;
    entity = {
        User: req.session.authUser,
        Product: req.params.product
    }
    console.log(entity);
    if (action == "delete")
        entity.Status = 2;
    else entity.Status = 1;
    await cartModel.patch(entity);
    res.send('success');
})

module.exports = router;