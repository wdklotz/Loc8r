/* GET home page */
module.exports.homeList = function(req, res) {
  res.render('locations_list', { title: 'Home' }); // render view index.jade
};

/* GET Location Info page */
module.exports.locationInfo = function(req, res) {
  res.render('location_info', { title: 'Location Info' }); // render view index.jade
};

/* GET Add Review page */
module.exports.addReview = function(req, res) {
  res.render('index', { title: 'Add Review' }); // render view index.jade
};