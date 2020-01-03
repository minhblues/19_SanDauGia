var express = require('express');
const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
const auctionModel = require('../models/auctions.model');
const imageModel = require('../models/images.model')
const userModel = require('../models/users.model')
const JSalert = require('js-alert')
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

router.post('/detail/auction/:id', async(req, res) => {
    [entity, product] = await Promise.all(
        [
            auctionModel.getHighestPrice(req.params.id),
            productModel.single(req.params.id)
        ]);
    console.log(entity)
    if (entity)
        if (req.body.Price > entity.Price) {
            product.Price = +entity.Price + +req.body.StepPrice;
            await Promise.all(
                [
                    auctionModel.patchHighestPrice({
                        Product: req.params.id,
                        User: req.session.UserName,
                        Price: req.body.Price
                    }),
                    auctionModel.add({
                        Product: req.params.id,
                        Bidder: req.session.UserName,
                        Price: product.Price,
                        Time: new Date()
                    }),
                    productModel.patch(product)
                ]);
        } else {
            product.Price = +req.body.Price + +product.StepPrice;
            await auctionModel.add({
                Product: req.params.id,
                Bidder: req.session.UserName,
                Price: req.body.Price,
                Time: new Date()
            });
            await Promise.all(
                [
                    auctionModel.add({
                        Product: req.params.id,
                        Bidder: entity.User,
                        Price: product.Price,
                        Time: new Date()
                    }),
                    productModel.patch(product),
                ]);
        }
    else {
        product.Price = +product.Price + +product.StepPrice;
        await Promise.all(
            [
                auctionModel.addHighestPrice({
                    Product: req.params.id,
                    User: req.session.UserName,
                    Price: req.body.Price
                }),
                auctionModel.add({
                    Product: req.params.id,
                    Bidder: req.session.UserName,
                    Price: product.Price,
                    Time: new Date()
                }),
                productModel.patch(product),
            ])
    }
    JSalert.alert("abc");
    res.redirect('/');
});
module.exports = router;