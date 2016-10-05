Muber.controller('DemoController', function($scope, EmailService){
  $scope.demo_request = {};
  $scope.response = false;
  $scope.request_demo = function(demo_request) {
    EmailService.send_email(demo_request)
      .then(function(data){
        $scope.response = true;
      });
  };
});
