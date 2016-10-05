Muber.controller('UsersController',
  function($scope, $location, UserService, auth) {
    UserService.currentUser()
      .then(function(user){
        $scope.currentUser = user;
      });
    $scope.login = {};

    $scope.submitLogin = function() {
      $scope.login.errors = [];
      UserService.login($scope.login)
        .then(function(user) {
          $scope.user = user;
          if ($scope.user) {
            $location.path("/companies/home");
          } else {
            $scope.login.errors.push("Invalid credentials.");
          }
        });
    };

    $scope.submitLogout = function() {
      auth.signout();
    }

  });
