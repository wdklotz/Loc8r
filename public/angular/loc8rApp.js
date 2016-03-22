angular.module('loc8rApp', []);

var ratingStars = function() {
   return {
      scope : {
         thisRating : '=rating'
      },
      templateUrl : "/angular/rating-stars.html"
   };
};

var _isNumeric = function(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function() {
   return function(distance) {
      // console.log(distance);
      var numDistance, unit;
      if (distance && _isNumeric(distance)) {
         if (distance > 1000) {
            numDistance = parseFloat(distance / 1000.).toFixed(1);
            unit = 'km';
         } else {
            numDistance = parseInt(distance, 10);
            unit = 'm';
         }
         return numDistance + unit;
      } else {
         return "0m";
      }
   };
};

var loc8rData = function($http, $log) {
   var locationByCoords = function(lat, lng) {
      // $log.info('lat='+lat+', lng='+lng);
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=15000');
      // return $http.get('/api/locations?lng=5.672924999999964&lat=45.1199439&maxDistance=2000');
   };
   return {
      locationByCoords  : locationByCoords
   };
};

var geolocation = function() {
   var getPosition = function(cbSuccess, cbError, cbNoGeo) {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
      } else {
         cbNoGeo();
      }
   };
   return {
      getPosition : getPosition
   };
};

var locationListCtrl = function($scope, loc8rData, geolocation) {
   $scope.message = "Checking your location";

   $scope.getData = function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      $scope.message = 'Searching for nearby places';
      loc8rData.locationByCoords(lat, lng).then(function(res) {
         $scope.message = res.data.length > 0 ? "" : "No locations found";
         $scope.data = {
            locations : res.data
         };
      }, function(res) {
         $scope.message = "Sorry, something's gone wrong [Status: " + res.statusText + "]";
      });
   };
   $scope.showError = function(error) {
      $scope.$apply(function() {
         $scope.message = error.message;
      });
   };
   $scope.noGeo = function() {
      $scope.$apply(function() {
         $scope.message = "Geolocation not supported by browser";
      });
   };
   geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

angular.module('loc8rApp').controller('locationListCtrl', locationListCtrl).filter('formatDistance', formatDistance).directive('ratingStars', ratingStars).service('loc8rData', loc8rData).service('geolocation', geolocation);
