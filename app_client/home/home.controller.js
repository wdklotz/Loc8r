(function() {     // open IIFE

  homeCtrl.$inject =  ['$scope', 'loc8rData', 'geolocation'];
  function homeCtrl   ($scope,    loc8rData,   geolocation) {
  var vm = this;
  vm.pageHeader = {
    title: 'Loc8r-SPA',
    strapline: 'Find place to work with wifi near you'
  };
  vm.sidebar = {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. \
    Nullam sit amet interdum magna. Morbi quis faucibus nisi. Vestibulum mollis purus quis eros adipiscing \
    tristique. \n\n \
    <h6><small>This view is generated with "layout" => "app_client/index.html"  and "ngView" => "home.view.html.</small></h6>'
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

})();  // close & invoke IIFE
