(function () {

angular.module('loc8rApp')
  .controller('reviewModalCtrl', reviewModalCtrl);

reviewModalCtrl.$inject = ['$uibModalInstance', 'loc8rData', 'locationData'];
function reviewModalCtrl   ($uibModalInstance,   loc8rData,   locationData) {
  var vm = this;
  vm.locationData = locationData;

  vm.modal = {
    cancel : function () {
      $uibModalInstance.dismiss('cancel');
    },
    close: function(result) {
      $uibModalInstance.close(result);
    }
  };

  vm.onSubmit = function() {
    vm.formError = "";
    // console.log('18', vm.formData);
    if(vm.formData == undefined || !vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
      vm.formError = "All fields required, please try again";
      return false;
    } else {
      // console.log('23',vm.formData);
      vm.doAddReview(vm.locationData.locationid, vm.formData);
    }
  };

  vm.doAddReview = function(locationid, formData) {
    loc8rData.addReviewById(locationid, {
      author: formData.name,
      rating: formData.rating,
      reviewText: formData.reviewText
    })
    .success(function(data){
      vm.modal.close(data);
      // console.log("Your review has been added!");
    })
    .error(function(data) {
      vm.formError = "Your review has not been saved, try again";
    });
    return false;
  };
}

})();
