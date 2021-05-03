const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
//importing GraphQL modules
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const {
  mainSchema
} = require('./graphql/graphqlSchema');


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
//You also need to install the MongoDB : https://www.mongodb.com/try/download/community?tck=docs_server
const MongoClient = require('mongodb').MongoClient;
//for now, the database is local, i.e on the same device as the running server
const URL = 'mongodb://localhost:27017/';
let lugdb;

MongoClient.connect(URL, function (err, db) {
  if (err) {
    console.log(err)
    return
  }
  lugdb = db.db("LugdunumDatabase");
  console.log("Connected to local Mongo DataBase for setup")

  //User Collection creation
  lugdb.createCollection("User", function (errColl, res) {
    if (errColl) {
      console.log(errColl); //print for now, not useful in the future
    } else {
      console.log("Collection created!");
    }
  });
  db.close();
});

//mongoose is used to define mongodb Schemas, thus simplifying the graphql implementation
mongoose.connect(URL,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connected to local database'))
    .catch(() => console.log('Connection to local database failed'));


//graphQL implementation
app.use('/graphql', graphqlHTTP({
  schema: mainSchema,
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
