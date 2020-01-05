var express = require('express');
<<<<<<< HEAD
const productModel = require('../models/product.model')
const cartModel = require('../models/cart.model')
var router = express.Router();

router.get('/', async(req, res) => {
    winningProduct = await productModel.getWinningProductByUser(req.session.authUser);
    entity = [];
=======
const productModel=require('../models/product.model')
const cartModel=require('../models/cart.model')
var router = express.Router();

router.get('/', async (req, res)=> {
    winningProduct=await productModel.getWinningProductByUser(req.session.authUser);
    entity=[];
>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng
    winningProduct.forEach(async element => {
        entity.push({
            User: req.session.authUser,
            Product: element.ProductID
        })
<<<<<<< HEAD
        element.Status = 1;
=======
        element.Status=1;
>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng
        await productModel.patch(element);
    });

    entity.forEach(async element => {
        await cartModel.add(element)
    });
<<<<<<< HEAD
    cart = await productModel.getProductByUserCart(req.session.authUser);

    res.render('cart', {
        title: 'Giỏ hàng',
=======
    cart=await productModel.getProductByUserCart(req.session.authUser);

    res.render('cart', {
        title: 'Giỏ hàng',
        categories: res.locals.lsCategories,
>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng
        cart
    });
});

module.exports = router;