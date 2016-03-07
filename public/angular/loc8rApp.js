angular.module('loc8rApp', []);

var ratingStars = function () {
	return {
		scope: {
			thisRating : '=rating'
		},
		templateUrl : "/angular/rating-stars.html"
	};
};
	
var _isNumeric = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
	return function (distance) {
		var numDistance, unit;
		if (distance && _isNumeric(distance)) {
			if (distance > 1) {
				numDistance = parseFloat(distance).toFixed(1);
				unit = 'km';
			} else {
				numDistance = parseInt(distance * 1000,10);
				unit = 'm';
			}
			return numDistance + unit;
		} else {
			return "?";
		}
	};
};

var loc8rData = function ($http) {
	return $http.get('/api/locations?lng=-0.9690880001&lat=51.4550405&maxDistance=2000');
};

var locationListCtrl = function ($scope, loc8rData) {
	$scope.message = "Searching for nearby places";
	loc8rData
	.success(function(data) { 
		$scope.message = data.length > 0 ? "" : "No locations found";
		$scope.data = { locations: data };})
	.error(function(e) { $scope.message = "Sorry, something's gone wrong "; });
};

angular.module('loc8rApp')
	.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('loc8rData', loc8rData);