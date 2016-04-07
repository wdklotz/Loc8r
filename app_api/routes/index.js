//=============================
//   /app_api/routes
//=============================

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');

// configure auth middleware:
// define userProperty on req to be payload;
// use secret from env
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// locations
router["get"]('/locations', ctrlLocations.locationsListByDistance)
router["post"]('/locations', ctrlLocations.locationsCreate);
router["get"]('/location/:locationid', ctrlLocations.locationsReadOne);
router["put"]('/location/:locationid', ctrlLocations.locationsUpdateOne);
router["delete"]('/location/:locationid', ctrlLocations.locationsDeleteOne);

// reviews (with added auth middleware)
router["post"]('/location/:locationid/reviews', auth, ctrlReviews.reviewsCreate);
router["get"]('/location/:locationid/review/:reviewid', ctrlReviews.reviewsReadOne);
router["put"]('/location/:locationid/review/:reviewid', auth, ctrlReviews.reviewsUpdateOne);
router["delete"]('/location/:locationid/review/:reviewid', auth, ctrlReviews.reviewsDeleteOne);

// authentication
router['post']('/register', ctrlAuth.register);
router['post']('/login', ctrlAuth.login);

module.exports = router;
