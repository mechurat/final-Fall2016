var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var artistSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
	lastName:{
		type: String,
		required: true
	},
    tag: {
        type: String,
        required: true,
		unique: true
    },
    artStyle: String,
    dateCreated:{
        type: Date,
        default: Date.now
    },
});

artistSchema.plugin(URLSlugs('lastName', {field:'slug'}));

var Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;