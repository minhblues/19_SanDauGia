var express = require('express');
var router = express.Router();
const productModel = require('../models/product.model')
const userModel = require('../models/users.model')
const commentModel = require('../models/comments.model')
const helper = require('../config/handlebars-helper')


router.get('/', async(req, res) => {
    
    if(req.session.authUser)
    if (req.session.authUser.Status != 1)
        return res.redirect('/');
    //  console.log(req.files);
    products = await productModel.getProductBySeller(req.session.authUser.Username)
    products.forEach(product => {
        if ((product.EndTime >= new Date() && product.Status == 0) || product.PriceHolder == null || product.Rated == 1)
            product.ratable = false;
        else product.ratable = true;
        if (product.EndTime < new Date())
            if (product.PriceHolder)
                product.Message = 'Đã bán';
            else
                product.Message = 'Hết hạn';
        else if (product.Status == 1)
            product.Message = 'Đã bán';
        else
            product.Message = helper.EndTimeFormat(product.EndTime);
    });
    res.render('myproduct', {
        title: 'Sản phẩm của tôi',
        products
    });
})

router.get('/:id', async(req, res) => {
    product = await productModel.single(req.params.id);
    user = await userModel.singleByUserName(product.PriceHolder);
    comment = {
        Comment: req.query.comment,
        User: user.UserName,
        Status: 1,
        Product: product.ProductID
    };
    if (req.query.Action == 'like') {
        user.Score++;
        comment.Status = 1;
    }
    user.RateTime = user.RateTime + 1;

    await commentModel.add(comment);
    console.log(user)
    await userModel.patch(user);
    product.Rated = 1;
    console.log(product)
    await productModel.patch(product);
    res.send('Success');
})
module.exports = router;