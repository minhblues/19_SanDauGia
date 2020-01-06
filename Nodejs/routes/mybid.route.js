var express = require('express');
const productModel = require('../models/product.model')
const userModel = require('../models/users.model');
var router = express.Router();

router.get('/', async(req, res) => {
    products = await productModel.getProductByUserHistoryBidder(req.session.authUser.Username);
    products.forEach(element => {
        if (element.PriceHolder == req.session.authUser.Username) {
            if (element.Endtime < new Date()) {
                if (element.Status == 0)
                    element.State = 'Đang giữ giá';
                else element.State = 'Chiến thắng';
            } else
                element.State = 'Chiến thắng';
        } else {
            if (element.Status == 0)
                element.State = 'Đấu giá thua';
            else element.State = 'Chiến thắng';
        }
        element.Like = (element.State == 'Chiến thắng' && element.Failed == 0)
    })
    res.render('mybid', {
        title: 'Đấu giá của tôi',
        products
    });
});

router.get('/:id', async(req, res) => {
    if (req.query.Action == 'like') {
        product = await productModel.single(req.params.id);
        user = await userModel.singleByUserName(product.Seller);
        user.Score++;
        user.RateTime++;
        await userModel.patch(user);
        product.Failed = 2;

    }
    if (req.query.Action == 'dislike') {
        product = await productModel.single(req.params.id);
        user = await userModel.singleByUserName(product.Seller);
        user.Rate++;
        await userModel.patch(user);
        product.Failed = 2;

    }
    await productModel.patch(product);
    res.send('Success')
})

module.exports = router;