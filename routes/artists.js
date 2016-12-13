var express = require('express');
var router = express.Router();
var app = express();

var path = require('path');

var Artist = require('../models/artistSchema');

router.get('/', function (req, res) {

	var query = {};
	if (req.query.lastName) {
		query = {
			lastName: req.query.lastName
		};
	}

	Artist.find(query, function (err, data) {
		var pageData = {
			artists: data
		};
		res.render('artists', pageData);
	});
});

module.exports = router;
