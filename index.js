var express = require('express');
var hbs = require('express-handlebars');

var bodyParser = require('body-parser');
var multer = require('multer');
var Mongoose = require('mongoose');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// .env file load. Not included in GIT.
  // DB_URL needed
  // cookieSecret needed
require('dotenv').config();



// setting port for testing. Use localhost:8888 in browser
var app = express();
var portNum = process.env.PORT || 8888;
app.set('port', portNum);

// creating session
app.use(session({
  secret: process.env.cookieSecret,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 24 * 7
  },
  // updates the session
  resave: false,
  // new session for every user
  saveUninitialized: true,
  // add session store
  store: new MongoStore({
    url: process.env.DB_URL
  })
}));

app.use(function (req, res, next) {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

app.engine('handlebars', hbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Connecting to Database
Mongoose.Promise = global.Promise;
Mongoose.connect(process.env.DB_URL);

var options ={};
var auth = require('./lib/auth')(app, options);
auth.init();
auth.registerRoutes();

// cover page. Click to go to home
var startPage = require('./routes/start');
app.use('/', startPage);
// home route
var homePage = require('./routes/home');
app.use('/home', homePage);
// about route
var aboutPage = require('./routes/about');
app.use('/about', aboutPage);
// artists route
var artist = require('./routes/artists');
app.use('/artists', artist);
// gallery route
app.use('/gallery', require('./routes/gallery'));
//// contact route
//app.use('/contact', require('./routes/contact'));
//// Admin route, requires
// VERIFICATION
var adminTool = require('./routes/admin');
app.use('/admin/verified', adminTool);

// Cookie stuff
// creation on admin/verified use
app.get('/admin/verified', function (req, res) {
  req.session.lastUse = 'Artist Created';
  req.session.flash = {
    type: 'positive',
    header: 'Done!'
  };
});

app.get('/admin/verified/edit', function (req, res) {
  req.session.lastUse = req.body.slug + 'edited';
});

app.get('/admin/verified/delete', function(req, res){
  req.session.lastUse = 'Artist deleted';
});

app.use(express.static('public'));

//404 Catch all
app.use(function (req, res, next) {
  console.log('err at catch all');
  res.status(404);
  res.send('404 - Not Found');
});

app.listen(portNum, function () {
  console.log('listening on port ', portNum)
})
