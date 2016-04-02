(function() {     // open IIFE

var ratingStars = function() {
   return {
    restrict: 'EA',
      scope : {
         thisRating : '=rating'
      },
      templateUrl : "/common/directives/ratingStars/ratingStars.template.html"
   };
};

angular.module('loc8rApp')
  .directive('ratingStars',ratingStars);

})();  // close & invoke IIFE
