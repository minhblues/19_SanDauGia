var express = require('express');
const farvoritesModel = require('../models/favorites.model');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('wishlist', {
        title: 'Danh sách yêu thích'
    });
});

router.get('/:id', async(req, res) => {
    check = await farvoritesModel.isFavorite(req.session.authUser, req.params.id);
    if (check)
        await farvoritesModel.del({ User: req.session.authUser, Product: req.params.id });
    else await farvoritesModel.add({ User: req.session.authUser, Product: req.params.id });
    if (req.query.retUrl)
        retUrl = req.query.retUrl;
    else retUrl = '/';
    res.redirect(retUrl);
});
module.exports = router;