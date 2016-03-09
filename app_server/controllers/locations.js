//=============================
//   /app_server/controllers
//=============================

var request = require('request');

var apiOptions = {
		server : "http://localhost:3000"
		};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "https://getting-mean-loc8r.herokuapp.com";
}

var _showError = function (req, res, status) {
	var title, content;
	if (status === 404) {
		title = "404, page not found";
		content = "Oh dear. Looks like we can't find this page. Sorry.";
	} else {
		title = status + ", something's gone wrong";
		content = "Something, somewhere, has gone just a little bit wrong.";
	}
	res.status(status);
	res.render('generic_text', {
		title : title,
		content : content
		});
};

//=====================================================	
//------------------render home page-------------------
var renderHomepage = function(req, res) {
	res.render('locations_list', { 
	  title: 'Loc8r - find a place to work with wifi',
	  pageHeader:{
		  title: 'Loc8r',
		  strapline:'Find places to work with wifi near you!',
	  },
	  sidebar: "Looking for wifi and a seat? Loc8r helps you find places to \
		  work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r \
		  help you find the place you're looking for."
	}); 
};
//--------ROUTE: router.get('/', ...homeList)------------
module.exports.homeList = function(req, res){
		renderHomepage(req, res);
};

//-------------------render Location Details page-----------------
var renderDetailPage = function(reg,res, locDetail){
	res.render('location_info', { 
	  title: locDetail.name,
	  pageHeader: {title: locDetail.name},
	  sidebar: {
		  context: 'is on Loc8r because it has accessible wifi and space to sit down with your \
			  laptop and get some work done.',
		  callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review \
			  to help other people just like you.',
	  },
	  location : locDetail
	});
};
var getLocationInfo = function (req, res, callback) {
	var requestOptions, path;
	path = "/api/location/" + req.params.locationid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
		};
	request(requestOptions, function(err, response, body) {
		var data = body;
		if (response.statusCode === 200) {
			data.coords = {
					lng : body.coordinates[0],
					lat : body.coordinates[1]
			};
			callback(req, res, data);
		} else {
			_showError(req, res, response.statusCode);
		}
	});
};
//--------ROUTE: router.get('/location/:locationd', ...locationInfo)------------
module.exports.locationInfo = function(req, res) {
	getLocationInfo(req, res, function(req, res, responseData) {
		renderDetailPage(req, res, responseData);
	});
};
	
//----------------render Review page ---------------
var renderReviewForm = function(req, res, locDetail) {
  res.render('location_review_form', { 
	  title: 'Review '+locDetail.name+' on Loc8r',
	  pageHeader: { title: 'Review '+locDetail.name},
	  error: req.query.err
  });
};
//---ROUTE: router.get ('/location/:locationid/review/new', ....addReview)----
module.exports.addReview = function(req, res) {
	getLocationInfo(req, res, function(req, res, responseData) {
	renderReviewForm(req, res, responseData);
	});
};
//----------------- POST a new review ----------------
module.exports.doAddReview = function(req, res){
	var requestOptions, path, locationid, postdata;
	locationid = req.params.locationid;
	path = "/api/location/" + locationid + '/reviews';
	postdata = {
			author: req.body.name,
			rating: parseInt(req.body.rating, 10),
			reviewText: req.body.review
		};
	requestOptions = {
			url : apiOptions.server + path,
			method : "POST",
			json : postdata
		};
	if (!postdata.author || !postdata.rating || !postdata.reviewText) {
		res.redirect('/location/' + locationid + '/review/new?err=val');
	} else {
		request(requestOptions, function(err, response, body) {
			if (response.statusCode === 201) {
				res.redirect('/location/' + locationid);
			} else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
				res.redirect('/location/' + locationid + '/review/new?err=val');
			} else {
				_showError(req, res, response.statusCode);
			}
		});
	}
};