var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs  = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');

var homeRouter = require('./routes/home.routes')
var loginRouter = require('./routes/login.routes')
var signupRouter = require('./routes/signup.routes')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // view engine setup
app.set('views', path.join(__dirname, 'views'));


app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: __dirname + '/views/layouts/main.hbs',
  layoutsDir:__dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: {
    section: hbs_sections(),
    format: val => numeral(val).format('0,0'),
  }
}));

app.set('view engine', 'hbs');

app.use('/',homeRouter);
app.use('/',loginRouter);
app.use('/',signupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
