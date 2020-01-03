var express = require('express');
const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
const auctionModel = require('../models/auctions.model');
const imageModel = require('../models/images.model')
const userModel = require('../models/users.model')
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res) => {
    if (!req.session.categories)
        req.session.categories = await categoryModel.all();
    categories = req.session.categories;
    const [popular, nearFinish, mostExpensive] = await Promise.all(
        [
            productModel.popular(),
            productModel.nearFinish(),
            productModel.mostExpensive()
        ]
    )
    res.render('home', {
        categories,
        popular,
        nearFinish,
        mostExpensive,
        title: 'Sàn đấu giá'
    });
});


router.get('/err', (req, res) => {
    throw 500;
})

router.get('/detail/:id/', async(req, res) => {
    if (!req.session.categories)
        req.session.categories = await categoryModel.all();
    categories = req.session.categories;

    const ID = req.params.id;
    const invalidPrice = req.query.invalidPrice;
    const [product, auction, subIMG, properties] = await Promise.all(
        [productModel.single(ID),
            auctionModel.getAuctionByProductId(ID),
            imageModel.getIMGByProductId(ID),
            productModel.properties(ID)
        ]);

    const data = [catName, sellScore, alikeProduct] = await Promise.all(
        [categoryModel.single(product.Category),
            userModel.getScore(product.Seller),
            productModel.popularByCat(product.Category)
        ]);
    bidScore = []
    if (auction.length != 0)
        bidScore = await userModel.getScore(auction[0].Bidder)
    i = 1;
    auction.forEach(element => {
        element.STT = i;
        i++;
    });
    res.render('detail', {
        ID,
        invalidPrice,
        categories,
        product,
        auction,
        subIMG,
        properties,
        catName,
        bidScore,
        sellScore,
        alikeProduct
    });
})

router.post('/detail/auction/:id', (req, res) => {
    console.log(req.body.Price);
    res.redirect(`../${req.params.id}/?invalidPrice=true`);
})
module.exports = router;