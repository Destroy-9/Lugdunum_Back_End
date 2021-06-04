const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require ('cors')
const mongoose = require('mongoose');
//importing GraphQL modules
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const {
  mainSchema
} = require('./graphql/graphqlSchema');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

//adding Cross-Origin Resource Sharing

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'data')));

//You also may want to install the MongoDB : https://www.mongodb.com/try/download/community?tck=docs_server
//for now, the database is local, i.e on the same device as the running server
//const URLDatabase = 'mongodb://localhost:27017/';
const uri = process.env.MONGODB_URI;

//mongoose is used to define mongodb Schemas, thus simplifying the graphql implementation
mongoose.connect(uri,
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
//app.use('/users', usersRouter);

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
