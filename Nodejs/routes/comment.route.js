var express = require('express');
var router = express.Router();
const commentModel = require('../models/comments.model')
const productModel = require('../models/product.model')

router.get('/', async(req, res) => {
    comments = await commentModel.allByUser(req.session.authUser.Username);
    comments.forEach(element => {
        element.Status = (element.Status == 1);
    });
    comments.forEach(async element => {
        product = await productModel.single(element.Product);
        element.Name = product.Name;
        element.Description = product.Description;
    });
    res.render('comment', {
        title: 'Đánh giá',
        comments
    });
});

module.exports = router;