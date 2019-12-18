var express = require('express');
const categoryModel = require('../models/category.model');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res)=> {
  const rows = await categoryModel.all();
  res.render('home',{
    categories: rows,
    title:'Sàn đấu giá',
    empty: rows.length === 0
  });
});

module.exports = router;
