var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
const categoryModel = require('./models/category.model')

var homeRouter = require('./routes/home.routes')
var loginRouter = require('./routes/login.routes')
var signupRouter = require('./routes/signup.routes')
var Category = require('./routes/category.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
    helpers: require('./config/handlebars-helper')
}));

app.set('view engine', 'hbs');

app.use('/', homeRouter);
app.use('/Login', loginRouter);
app.use('/Signup', signupRouter);
app.use('/Category', Category);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(async(err, req, res, next) => {
    if (!req.session.categories)
        req.session.categories = await categoryModel.all();
    categories = req.session.categories;
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    errstatus = err.status || 500;
    res.status(errstatus);
    res.render('error', { categories, errstatus });
});

module.exports = app;