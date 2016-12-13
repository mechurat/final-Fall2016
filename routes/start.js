var express = require('express');
var router = express.Router();

var app = express();

app.use(express.static('public'));

router.get('/', function(req,res){
  res.render('start');
});

module.exports = router;