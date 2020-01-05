var express = require('express');
const farvoritesModel = require('../models/favorites.model');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('mybid', {
        title: 'Đấu giá của tôi'
    });
});


module.exports = router;
