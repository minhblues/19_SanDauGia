var express = require('express');
const userModel = require('../models/users.model');
var router = express.Router();
router.get('/', async (req, res) => {
    const list = await userModel.all();
    console.log(list);
    res.render('admin', {
        title: 'Admin',
        users: list 
    });
});
module.exports = router;