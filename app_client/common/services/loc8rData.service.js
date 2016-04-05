(function() {     // open IIFE

loc8rData.$inject =    ['$http','$log'];
function loc8rData      ($http, $log) {
   var locationByCoords = function(lat, lng) {
      $log.info('loc8rData.service.js==>lat='+lat+', lng='+lng);
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=15000');
      // return $http.get('/api/locations?lng=5.672924999999964&lat=45.1199439&maxDistance=2000');
   };

   var locationById = function(locationid) {
     return $http.get('/api/location/' + locationid);
   };

   return {
      locationByCoords  : locationByCoords,
      locationById : locationById
   };
};

angular.module('loc8rApp')
  .service('loc8rData', loc8rData);

})();  // close & invoke IIFE
