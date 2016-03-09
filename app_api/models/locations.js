//=============================
//   /app_api/models
//=============================

var mongoose = require('mongoose');

var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required: true},
	opening: String,
	closing: String,
	closed: {type: Boolean, required: true}
	});

var reviewSchema = new mongoose.Schema({
	author: {type: String, required: true},
	rating: {type: Number, required: true, min: 0, max: 5},
	reviewText: {type: String, required: true},
	createdOn: {type: Date, "default": Date.now}
	});

var locationSchema = new mongoose.Schema({ 
	name: { type: String, required: true},
	address: String,
	rating: { type: Number, 'default' : 0, min : 0, max : 5},
	facilities: [String],
	coordinates: {type: [Number], index: '2dsphere', required: true},
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]
});

// compile the schema
var Loc = mongoose.model('Location', locationSchema);

// 6 document samples: loc0 - loc5
var loc0 = new Loc({
name: 'Marie',
address: 'Place Hector Berlioz, 38640 Claix, France',
rating: 3,
facilities: ['Permits','Certificates'],
coordinates: [5.672924999999964, 45.1199439],
openingTimes: [{
	  days: 'Monday - Friday',
	  opening: '7:00am',
	  closing: '7:00pm',
	  closed: false
	  },{
	  days: 'Saturday',
	  opening: '8:00am',
	  closing: '5:00pm',
	  closed: false
	  },{
	  days: 'Sunday',
	  closed: true
	  }],
reviews: [{
	  author: 'Christoph Rau',
	  rating: 5,
	  timestamp: '16 July 2013',
	  reviewText: 'What a great place. I can\'t say enough good things about it.'
	  },{
	  author: 'Robert Klotz',
	  rating: 3,
	  timestamp: '16 June 2013',
	  reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
		  }]
});

var loc1 = new Loc({
name: 'PHARMACIE DU BOURG',
address: '28, rue Beyle Stendhal, 38640 CLAIX, France',
rating: 3,
facilities: ['Pharmacie', 'Vente et location de matériel médical et orthopédique'],
coordinates: [5.671848, 45.120609],
openingTimes: [{
	  days: 'Monday - Friday',
	  opening: '7:00am',
	  closing: '7:00pm',
	  closed: false
	  },{
	  days: 'Saturday',
	  opening: '8:00am',
	  closing: '5:00pm',
	  closed: false
	  },{
	  days: 'Sunday',
	  closed: true
	  }],
reviews: [{
	  author: 'Simon Holmes',
	  rating: 5,
	  timestamp: '16 July 2013',
	  reviewText: 'What a great place. I can\'t say enough good things about it.'
	  },{
	  author: 'Charlie Chaplin',
	  rating: 3,
	  timestamp: '16 June 2013',
	  reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
		  }]
});

var loc2 = new Loc({
name: 'Loïc Fleurs',
address: '2, rue Beyle Stendhal, 38640 CLAIX, France',
rating: 3,
facilities: ['Fleurs', 'Plantes', 'Interflora'],
coordinates: [5.671848, 45.120609],
openingTimes: [{
	  days: 'Monday - Friday',
	  opening: '7:00am',
	  closing: '7:00pm',
	  closed: false
	  },{
	  days: 'Saturday',
	  opening: '8:00am',
	  closing: '5:00pm',
	  closed: false
	  },{
	  days: 'Sunday',
	  closed: true
	  }],
reviews: [{
	  author: 'Simon Holmes',
	  rating: 5,
	  timestamp: '16 July 2013',
	  reviewText: 'What a great place. I can\'t say enough good things about it.'
	  },{
	  author: 'Charlie Chaplin',
	  rating: 3,
	  timestamp: '16 June 2013',
	  reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
		  }]
});

var loc3 = new Loc({
name: 'BOUCHERIE DU BOURG',
address: '6, rue Beyle Stendhal, France',
rating: 3,
facilities: ['Boucherie', 'Charcuterie', 'Traiteur'],
coordinates: [5.671848, 45.120609],
openingTimes: [{
	  days: 'Monday - Friday',
	  opening: '7:00am',
	  closing: '7:00pm',
	  closed: false
	  },{
	  days: 'Saturday',
	  opening: '8:00am',
	  closing: '5:00pm',
	  closed: false
	  },{
	  days: 'Sunday',
	  closed: true
	  }],
  reviews: [{
	  author: 'Simon Holmes',
	  rating: 5,
	  timestamp: '16 July 2013',
	  reviewText: 'What a great place. I can\'t say enough good things about it.'
	  },{
	  author: 'Charlie Chaplin',
	  rating: 3,
	  timestamp: '16 June 2013',
	  reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
	  }]
});

var loc4 = new Loc({
name: 'LE SAINT-ANGE',
address: '2, rue Louis Pasteur, 38640 CLAIX, France',
rating: 3,
facilities: ['Restaurant d\'ouvrier', 'Bar', 'TV online', 'Alcoholic drinks', 'Music', 'Wifi'],
coordinates: [5.672288, 45.119859],
	openingTimes: [{
		  days: 'Monday - Friday',
		  opening: '7:00am',
		  closing: '7:00pm',
		  closed: false
		  },{
		  days: 'Saturday',
		  opening: '8:00am',
		  closing: '5:00pm',
		  closed: false
		  },{
		  days: 'Sunday',
		  closed: true
		  }],
	  reviews: [{
		  author: 'Simon Holmes',
		  rating: 5,
		  timestamp: '16 July 2013',
		  reviewText: 'What a great place. I can\'t say enough good things about it.'
		  },{
		  author: 'Charlie Chaplin',
		  rating: 3,
		  timestamp: '16 June 2013',
		  reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
		  }]
});

var loc5 = new Loc({
name: 'WD\'s home',
address: '27, route du château, 38640 CLAIX, France',
rating: 5,
facilities: ['food', 'Bar', 'TV online', 'Alcoholic drinks', 'Music', 'Wifi'],
coordinates: [5.664734, 45.108254],
	openingTimes: [{
		  days: 'Monday - Friday',
		  opening: '7:00am',
		  closing: '7:00pm',
		  closed: false
		  },{
		  days: 'Saturday',
		  opening: '8:00am',
		  closing: '5:00pm',
		  closed: false
		  },{
		  days: 'Sunday',
		  closed: true
		  }],
	  reviews: [{
		  author: 'Simon Holmes',
		  rating: 5,
		  timestamp: '16 July 2013',
		  reviewText: 'What a great place. I can\'t say enough good things about it.'
		  },{
		  author: 'Charlie Chaplin',
		  rating: 3,
		  timestamp: '16 June 2013',
		  reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
		  }]
});

function filldb() {
	loc0.save(function(err){
		if(err) return console.error(err);
	});
	loc1.save(function(err){
		if(err) return console.error(err);
	});
	loc2.save(function(err){
	if(err) return console.error(err);
	});
	loc3.save(function(err){
	if(err) return console.error(err);
	});
	loc4.save(function(err){
	if(err) return console.error(err);
	});
	loc5.save(function(err){
	if(err) return console.error(err);
	});
};

//var fill = filldb();
