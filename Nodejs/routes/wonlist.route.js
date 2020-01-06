var express = require('express');
const productModel = require('../models/product.model')
const cartModel = require('../models/cart.model')
const userModel = require('../models/users.model')
const commentModel = require('../models/comments.model')
var router = express.Router();

router.get('/', async(req, res) => {
    console.log('wonlist', req.session.authUser)
    winningProduct = await productModel.getWinningProductByUser(req.session.authUser.Username);
    entity = [];

    winningProduct.forEach(async element => {
        entity.push({
            User: req.session.authUser.Username,
            Product: element.ProductID
        })
        element.Status = 1;

        await productModel.patch(element);
    });

    entity.forEach(async element => {
        await cartModel.add(element)
    });
    wonlist = await productModel.getProductByUserCart(req.session.authUser.Username);

    res.render('wonlist', {
        title: 'Giỏ hàng',
        wonlist
    });
});

router.get('/:product', async(req, res) => {
    action = req.query.Action;
    entity = {
        User: req.session.authUser.Username,
        Product: req.params.product
    }
    product = await productModel.single(req.params.product);

    if (action == "delete") {
        entity.Status = 2;
        product.Failed = 1;
        req.session.authUser.RateTime++;
        req.session.authUser.Date = new Date(req.session.authUser.Date)
        user = {
            Username: req.session.authUser.Username,
            Password: req.session.authUser.Password,
            Phone: req.session.authUser.Phone,
            Email: req.session.authUser.Email,
            Address: req.session.authUser.Address,
            Status: req.session.authUser.Status,
            Score: req.session.authUser.Score,
            RateTime: req.session.authUser.RateTime,
            Date: req.session.authUser.Date,
        }
        await commentModel.add({
                Comment: 'Người thắng không thanh toán',
                User: req.session.authUser.Username,
                Product: product.ProductID,
                Status: 0
            }),
            Promise.all([productModel.patch(user),
                userModel.patch(user)
            ]);
    } else entity.Status = 1;
    await cartModel.patch(entity);
    res.send('success');
})

module.exports = router;