var express = require('express');
var router = express.Router();

var app = express();

app.use(express.static('public'));

router.get('/', function (req, res) {
  res.render('home', {
    company: 'Old Glory Tattoo Co.',
    address: '516 Summerfield Ave, Asbury Park, NJ 07712',
    hours: '12-8pm',
    phone: '(732) 455-3536',
    artists: [
      {
        name: '',
        style: '',
        days: '',
        tag: ''
            },
            ],
    facebookURL: 'https://www.facebook.com/OldGloryTattooCo/?fref=ts',
    instagramURL: 'https://www.instagram.com/oldglorytattooco/',
  });
});

module.exports = router;
