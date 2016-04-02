var loc8rData = function($http, $log) {
   var locationByCoords = function(lat, lng) {
      $log.info('lat='+lat+', lng='+lng);
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=15000');
      // return $http.get('/api/locations?lng=5.672924999999964&lat=45.1199439&maxDistance=2000');
   };
   return {
      locationByCoords  : locationByCoords
   };
};

angular.module('loc8rApp')
  .service('loc8rData',loc8rData);
