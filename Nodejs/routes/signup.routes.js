var express = require('express');
var bcrypt = require('bcryptjs');
const userModel = require('../models/username.models');
var router = express.Router();

/* GET home page. */
router.get('/signup', async(req, res, next)=> {
  res.render('signup',{
    title:'Sign Up'
  });
});


router.post('/signup', async (req, res) => {
  const N = 10;
  const hash = bcrypt.hashSync(req.body.f_Newpassword, N);
  
  const email = await userModel.singleByUserName(req.body.username);
  if(req.body.f_Newpassword !== req.body.cfmpassword)
  {
    
  }
  if (email !== null)
  {

  }

  const entity = req.body;
  entity.Password = hash;
  entity.IsBidder = null;
  entity.Score  = 0;
  entity.Name = 'admin';
  delete entity.Firstname;
  delete entity.Lastname;
  delete entity.cfmpassword;
  delete entity.f_Newpassword;
  console.log(req);
  const result = await userModel.add(entity);
  res.render('/signup');
});



module.exports = router;
