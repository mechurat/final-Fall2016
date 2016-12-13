var express = require('express');
var hbs = require('express-handlebars');

var bodyParser = require('body-parser');
var multer = require('multer');
var Mongoose = require('mongoose');

var app = express();

require('dotenv').config();

Mongoose.Promise = global.Promise;
Mongoose.connect(process.env.DB_URL);

var portNum = process.env.PORT || 8888;
app.set('port', portNum);

app.engine('handlebars', hbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Today: about.js & home.js
//cover page. Click to go to home
var startPage = require('./routes/start');
app.use('/', startPage);  
//home route
var homePage = require('./routes/home');
app.use('/home', homePage);
//about route
var aboutPage = require('./routes/about');
app.use('/about', aboutPage);
//artists route
var artist = require('./routes/artists');
app.use('/artists', artist);
//gallery route
app.use('/gallery', require('./routes/gallery'));
////contact route
//app.use('/contact', require('./routes/contact'));
////Admin route, requires
// VERIFICATION
var adminTool = require('./routes/admin');
app.use('/admin/verified', adminTool);

app.use(express.static('public'));

//404 Catch all
app.use(function (req,res,next){
  console.log('err at catch all');
  res.status(404);
  res.send('404 - Not Found');
});

app.listen(portNum, function(){
  console.log('listening on port ', portNum)
})