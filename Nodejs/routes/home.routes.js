var express = require('express');
const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
const auctionModel = require('../models/auctions.model');
const imageModel = require('../models/images.model')
const userModel = require('../models/users.model')
const auth = require('../middlewares/auth.mdw')
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res) => {
    const [popular, nearFinish, mostExpensive] = await Promise.all(
        [
            productModel.popular(),
            productModel.nearFinish(),
            productModel.mostExpensive()
        ]
    )
    res.render('home', {
        title: 'Sàn đấu giá',
        categories: res.locals.lsCategories,
        popular,
        nearFinish,
        mostExpensive,
    });
});

router.get('/detail/:id/', async(req, res) => {
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
        title: product.Name,
        categories: res.locals.lsCategories,
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

router.post('/detail/auction/:id', auth, async(req, res) => {
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
                        User: req.session.authUser,
                        Price: req.body.Price
                    }),
                    auctionModel.add({
                        Product: req.params.id,
                        Bidder: req.session.authUser,
                        Price: product.Price,
                        Time: new Date()
                    }),
                    productModel.patch(product)
                ]);
        } else {
            product.Price = +req.body.Price + +product.StepPrice;
            await auctionModel.add({
                Product: req.params.id,
                Bidder: req.session.authUser,
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
                    User: req.session.authUser,
                    Price: req.body.Price
                }),
                auctionModel.add({
                    Product: req.params.id,
                    Bidder: req.session.authUser,
                    Price: product.Price,
                    Time: new Date()
                }),
                productModel.patch(product),
            ])
    }
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    if (req.session.authUser)
        delete req.session.authUser;
    res.redirect('/login');
})
module.exports = router;