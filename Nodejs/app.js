var createError = require('http-errors');
const hbs_sections = require('express-handlebars-sections');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
const auth = require('./middlewares/auth.mdw')
const lsCategories = require('./middlewares/locals.mdw')
const categoryModel = require('./models/category.model')

<<<<<<< Updated upstream
var homeRouter = require('./routes/home.routes')
var loginRouter = require('./routes/login.routes')
var signupRouter = require('./routes/signup.routes')
var profileRouter = require('./routes/profile.routes')
var cartRouter = require('./routes/cart.routes')
var wishlistRouter = require('./routes/wishlist.routes')
var commentRouter = require('./routes/comment.routes')
var Category = require('./routes/category.route')
=======
var homeRouter = require('./routes/home.route')
var loginRouter = require('./routes/login.route')
var signupRouter = require('./routes/signup.route')
var profileRouter = require('./routes/profile.route')
var wonlistRouter = require('./routes/wonlist.route')
var watchlistRouter = require('./routes/watchlist.route')
var commentRouter = require('./routes/comment.route')
var postProductRouter = require('./routes/postProduct.route')
var Category = require('./routes/category.route')
var detailRouter = require('./routes/detail.route')
var mybidRouter = require('./routes/mybid.route')
var commentRouter = require('./routes/comment.route')
var Category = require('./routes/category.route')
var Admin = require('./routes/admin.route')
var Category = require('./routes/category.route')
var Admin = require('./routes/admin.route')
var postProductRouter = require('./routes/postProduct.route')
var detailRouter = require('./routes/detail.route')
var mybidRouter = require('./routes/mybid.route')
var myproductRouter = require('./routes/myproduct.route')
>>>>>>> Stashed changes

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(session({ secret: "0" }))

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: __dirname + '/views/layouts/main.hbs',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: require('./config/handlebars-helper'),
}));

app.set('view engine', 'hbs');

app.use('/', lsCategories, homeRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/Category', lsCategories, Category);
<<<<<<< Updated upstream
app.use('/profile', auth, lsCategories, profileRouter);
app.use('/cart', auth, lsCategories, cartRouter);
app.use('/wishlist', auth, lsCategories, wishlistRouter);
app.use('/comment', auth, lsCategories, commentRouter);
=======
app.use('/profile', auth, authAdmin, lsCategories, profileRouter);
app.use('/wonlist', auth, authAdmin, lsCategories, wonlistRouter);
app.use('/watchlist', auth, authAdmin, lsCategories, watchlistRouter);
app.use('/postProduct', auth, authAdmin, lsCategories, postProductRouter);
app.use('/mybid', auth, authAdmin, lsCategories, mybidRouter);
app.use('/comment', auth, authAdmin, lsCategories, commentRouter);
app.use('/admin', auth, authNormal, Admin);
app.use('/myproduct', auth, authAdmin, myproductRouter)
>>>>>>> Stashed changes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(async(err, req, res, next) => {
    if (!res.locals.lsCategories)
        res.locals.lsCategories = await categoryModel.all();
    categories = res.locals.lsCategories;
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    errstatus = err.status || 500;
    res.status(errstatus);
    res.render('error', { categories, errstatus });
});



module.exports = app;