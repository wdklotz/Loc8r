(function () {

  angular.module('loc8rApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;
    vm.pageHeader = {
      title: 'About Loc8r',
    };
    vm.main = {
      content: 'Loc8r was created to help people find places to sit down and get a bit of work done.\n\n \
  		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. \
  		  Nullam sit amet interdum magna. Morbi quis faucibus nisi. Vestibulum mollis purus quis eros adipiscing \
  		  tristique. Proin posuere semper tellus, id placerat augue dapibus ornare. Aenean leo metus, tempus \
  		  in nisl eget accumsan interdum dui. Pellentesque sollicitudin volutpat ullamcorper.\n\n \
  		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. \
  		  Nullam sit amet interdum magna. Morbi quis faucibus nisi. Vestibulum mollis purus quis eros adipiscing \
  		  tristique. Proin posuere semper tellus, id placerat augue dapibus ornare. Aenean leo metus, tempus \
  		  in nisl eget accumsan interdum dui. Pellentesque sollicitudin volutpat ullamcorper.'
    };
  }

})();
