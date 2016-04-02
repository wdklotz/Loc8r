function homeCtrl ($scope, loc8rData, geolocation) {
  var vm = this;
  vm.pageHeader = {
    title: 'Loc8r',
    strapline: 'Find place to work with wifi near you (SPA version)'
  };
  vm.sidebar = {
    content: 'The new homeCtrl controller simply binds a few data elements that we used to send to Jade from the Express controllers, but technically this is nothing alien to us after chapter 8. One thing that starts to become apparent when building up an application using separate files is the great benefit of using ....'
  };
  vm.message = 'Checking your location';

  vm.getData = function (position) {
    var lat = position.coords.latitude,
    lng = position.coords.longitude;
    vm.message = "Searching for nearby places";
    loc8rData.locationByCoords(lat, lng)
      .success(function(data) {
        vm.message = data.length > 0 ? "" : "No locations found nearby";
        vm.data = { locations: data };
      })
      .error(function (e) {
        vm.message = "Sorry, something's gone wrong";
      });
  };

  vm.showError = function (error) {
    $scope.$apply(function() {
      vm.message = error.message;
    });
  };

  vm.noGeo = function () {
    $scope.$apply(function() {
      vm.message = "Geolocation is not supported by this browser.";
    });
  };
  geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);
}

angular.module('loc8rApp')
  .controller('homeCtrl', homeCtrl);
