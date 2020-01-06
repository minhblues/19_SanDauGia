var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model')


router.get('/', async(req, res) => {
    //  console.log(req.files);
    products = await productModel.getProductBySeller(req.session.authUser.Username)
    products.forEach(product => {
        if ((product.EndTime >= new Date() && product.Status == 0) || product.PriceHolder == null)
            product.ratable = false;
        else product.ratable = true;
    });
    res.render('myproduct', {
        title: 'Sản phẩm của tôi',
        products
    });
})

router.get('/:id', async(req, res) => {
    product = await productModel.single(req.params.id);

    await productModel.patch(product);
    res.send('Success');
})
module.exports = router;