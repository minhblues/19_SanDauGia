var express = require('express');
const productModel = require('../models/product.model')
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
    })
    res.render('mybid', {
        title: 'Đấu giá của tôi',
        products
    });
});


module.exports = router;