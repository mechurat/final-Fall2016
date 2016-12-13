var express = require('express');
var router = express.Router();
var path = require('path');

var multer = require('multer');
var uploadPath = path.join(__dirname, '../public/uploads');
var upload = multer({ dest: uploadPath});

var app = express();
app.use(express.static('public'));
// Go and grab the artistSchema
var Artist = require('../models/artistSchema');

// Post the forms
router.get('/', function (req, res) {
  var query = {};
  Artist.find(query, function (err, data) {
    var pageData = {
      artists: data
    };
    res.render('admin', pageData);
  });
});

// artist creation
router.get('/', function (req, res) {
  res.json({
    status: 'ok'
  });
});


//Post function for form submission
router.post('/', upload.single('image'), function (req, res) {
  console.log(req.file);
  var artist = new Artist({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tag: req.body.tag,
    artStyle: req.body.artStyle,
    startDate: req.body.startDate,
    rateHourly: req.body.rateHourly,
    rateDay: req.body.rateDay,
    bio: req.body.bio,
    // see https://bugs.jquery.com/ticket/2656
    // imageFileName: req.file.image
  });

  artist.save(function (err, data) {
    if (err) {
      console.log('err at artist save');
    } else{
      res.redirect(303, '/admin/verified');
      return;
    } 
  });
});

// put function for document editting
router.post('/edit', function (req, res) {
  console.log('request update received')
  Artist.update({
    _id: req.body.selectArtist
  }, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tag: req.body.tag,
    artStyle: req.body.artStyle,
    startDate: req.body.startDate,
    rateHourly: req.body.rateHourly,
    rateDay: req.body.rateDay,
    bio: req.body.bio,
  }, function (err, docs) {
    if (err) {
      res.json(err);
      console.log('error at edit artist');
    } else {
      res.redirect(303, 'admin/verified');
    }
  });
});

// Post function for document deletion
router.post('/remove', function (req, res) {
  console.log('remove request received')
  Artist.findByIdAndRemove(req.body.dSelectArtist, function (err, docs) {
    var id = req.body.dSelectArtist;
    console.log('id to delete: ' + id);
    if (err) {
      console.log('error at remove artist');
      res.json(err);
    } else{
      res.redirect(303, 'admin/verified')
      return;
    }
  });
});

module.exports = router;
