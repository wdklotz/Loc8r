//        ./app_api/models
var mongoose = require('mongoose');

var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required: true},
	opening: String,
	closing: String,
	closed: {type: Boolean, required: true}
	});

var reviewSchema = new mongoose.Schema({
	author: String,
	rating: {type: Number, required: true, min: 0, max: 5},
	reviewText: String,
	createdOn: {type: Date, "default": Date.now}
	});

var locationSchema = new mongoose.Schema({ 
	name: { type : String, required : true},
	address: String,
	rating: { type : Number, 'default' : 0, min : 0, max : 5},
	facilities: [String],
	coords: {type: [Number], index: '2dsphere'},
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]
});

// compile the schema
var Loc = mongoose.model('Location', locationSchema);

// two document samples
//var loc1 = new Loc({
//name: 'Starcups',
//address: '125 High Street, Reading, RG6 1PS',
//rating: 3,
//facilities: ['Hot drinks', 'Food', 'Premium wifi'],
//coords: [-0.9690884, 51.455041],
//openingTimes: [{
//	  days: 'Monday - Friday',
//	  opening: '7:00am',
//	  closing: '7:00pm',
//	  closed: false
//	  },{
//	  days: 'Saturday',
//	  opening: '8:00am',
//	  closing: '5:00pm',
//	  closed: false
//	  },{
//	  days: 'Sunday',
//	  closed: true
//	  }],
//reviews: [{
//	  author: 'Simon Holmes',
//	  rating: 5,
//	  timestamp: '16 July 2013',
//	  reviewText: 'What a great place. I can\'t say enough good things about it.'
//	  },{
//	  author: 'Charlie Chaplin',
//	  rating: 3,
//	  timestamp: '16 June 2013',
//	  reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
//		  }]
//}
//);
//
//loc1.save(function(err){
//if(err) return console.error(err);
//});

//var loc2 = new Loc({
//name: 'French Coffee Home',
//address: '27 Route du Château, Claix, F-38640',
//rating: 3,
//facilities: ['Hot drinks', 'Premium wifi'],
//coords: [5.6647765999, 45.1082854],
//openingTimes: [{
//	  days: 'Monday - Friday',
//	  opening: '7:00am',
//	  closing: '7:00pm',
//	  closed: false
//	  },{
//	  days: 'Saturday',
//	  opening: '8:00am',
//	  closing: '5:00pm',
//	  closed: false
//	  },{
//	  days: 'Sunday',
//	  closed: true
//	  }],
//reviews: [{
//	  author: 'Simon Holmes',
//	  rating: 5,
//	  timestamp: '16 July 2013',
//	  reviewText: 'What a great place. I can\'t say enough good things about it.'
//	  },{
//	  author: 'Charlie Chaplin',
//	  rating: 3,
//	  timestamp: '16 June 2013',
//	  reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
//		  }]
//}
//);
//
//loc2.save(function(err){
//	if(err) return console.error(err);
//});
