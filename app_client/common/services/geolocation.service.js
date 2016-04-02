var geolocation = function() {
  var getPosition = function(cbSuccess, cbError, cbNoGeo) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      cbNoGeo();
    }
  };
  return {
    getPosition: getPosition
  };
};

angular.module('loc8rApp')
  .service('geolocation', geolocation);
