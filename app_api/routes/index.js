//=============================
//   /app_api/routes
//=============================

var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

// locations
router["get"]('/locations', ctrlLocations.locationsListByDistance)
router["post"]('/locations', ctrlLocations.locationsCreate);
router["get"]('/location/:locationid', ctrlLocations.locationsReadOne);
router["put"]('/location/:locationid', ctrlLocations.locationsUpdateOne);
router["delete"]('/location/:locationid', ctrlLocations.locationsDeleteOne);

// reviews
router["post"]('/location/:locationid/reviews', ctrlReviews.reviewsCreate);
router["get"]('/location/:locationid/review/:reviewid', ctrlReviews.reviewsReadOne);
router["put"]('/location/:locationid/review/:reviewid', ctrlReviews.reviewsUpdateOne);
router["delete"]('/location/:locationid/review/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;
