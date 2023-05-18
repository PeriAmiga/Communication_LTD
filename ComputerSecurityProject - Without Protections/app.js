var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const https = require('https');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var emailValidationRouter = require('./routes/emailvalidation');
var codeValidationRouter = require('./routes/codevalidation');
var changePasswordRouter = require('./routes/changepassword');
var newPasswordRouter = require('./routes/newpassword');
var homeRouter = require('./routes/home');
var clientsRouter = require('./routes/clients');

var app = express();

const session = require('express-session');
app.use(session({
  secret: 'a338d5fa6067760540f0c5a740237259c84097ed1add7944763952b0667cddfa',
  resave: false,
  saveUninitialized: true,
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/emailvalidation', emailValidationRouter);
app.use('/codevalidation', codeValidationRouter);
app.use('/changepassword', changePasswordRouter);
app.use('/newpassword', newPasswordRouter);
app.use('/home', homeRouter);
app.use('/clients', clientsRouter);

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
