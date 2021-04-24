const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//importing GraphQL modules
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const graphqlStuff = require('./graphql/graphqlStuff');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'data')));

//mongodb connection (you may need to perform the command "npm install mongodb"
const MongoClient = require('mongodb').MongoClient
//The password is incorrect, thus the connection will not be established
const URL = 'mongodb+srv://RemiChbrt:password_for_mgdb@db4learning.yfced.mongodb.net/DB4Learning?retryWrites=true&w=majority'

MongoClient.connect(URL, function(err, db) {
  if (err){
    console.log(err)
    return
  }
  console.log(db.toString());
});

//graphQL implementation
app.use('/graphql', graphqlHTTP({
  schema: graphqlStuff.schema,
  graphiql: true //allows interface for graphql queries and results at 'localhost:3000/graphql?'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
