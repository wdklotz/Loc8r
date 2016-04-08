(function () {

angular.module('loc8rApp')
  .controller('locationDetailCtrl', locationDetailCtrl);

locationDetailCtrl.$inject = ['$routeParams', '$uibModal', 'loc8rData', '$location', 'authentication'];
function locationDetailCtrl   ($routeParams,   $uibModal,   loc8rData,   $location,   authentication) {
  var vm = this;
  vm.locationid = $routeParams.locationid;
  vm.isLoggedIn = authentication.isLoggedIn();
  vm.currentPath = $location.path();
  // console.log(vm.locationid);

  loc8rData.locationById(vm.locationid)
    .success(function(data) {
      vm.data = { location: data };
      // console.log('vm.data==>',vm.data);
      vm.pageHeader = { title: vm.data.location.name };
    })
    .error(function(e) {
      console.log(e);
    });

  vm.popupReviewForm = function() {
    var modalInstance = $uibModal.open( {
      templateUrl: '/reviewModal/reviewModal.view.html',
      controller: 'reviewModalCtrl as vm',
      resolve: {
        locationData: function() {
          return {
            locationid: vm.locationid,
            locationName: vm.data.location.name
          };
        }
      }
    });

    modalInstance.result.then(function(data){ // a promise of ...open()
      vm.data.location.reviews.push(data);
    });
  };
}

})();
