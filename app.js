var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const jwt = require('./_helpers/jwt');
//const db = require('./_helpers/db');
const errorHandler = require('./_helpers/error-handler');
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

var passport = require('passport');
var flash    = require('connect-flash');

var session = require('express-session');
var bodyParser   = require('body-parser');
//var auth = require('./routes/auth');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(session({
  secret: 'asdasdasdasdzxcxzc',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(cors());
app.use('/users', require('./users/user.controller'));
app.use('/projects', require('./projects/project.controller'));
app.use('/projectmanager', require('./projectmanager/projectManager.controller'));
//app.use('/auth', auth);

app.use(express.static(path.join(__dirname, 'public')));
// use JWT auth to secure the api nned to go up to the Controller calling
app.use(jwt());
//app.use(db());
// global error handler
app.use(errorHandler);

app.use(function(req, res, nehext) {
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
