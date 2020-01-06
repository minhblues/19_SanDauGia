var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model')


router.get('/', async(req, res) => {
    //  console.log(req.files);
    products = await productModel.getProductBySeller(req.session.authUser.Username)
    res.render('myproduct', {
        title: 'Sản phẩm của tôi',
        products
    });
})

router.get('/extratime', async(req, res) => {
    product = await productModel.single(req.query.Product);
    if (req.query.Product.EndTime < new Date())
        product.EndTime = new Date(now() + 7 * 24 * 3600 * 1000);
    else product.EndTime = new Date(product.EndTime.getTime() + 7 * 24 * 3600 * 1000);
    await productModel.patch(product);
    res.send('Success');
})
module.exports = router;