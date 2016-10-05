Muber.controller('MerchantsNewController', function($scope, $http, $routeParams, $location){

  $scope.submit_data = function() {
    $http({
      method: 'POST',
      url: '/api/v1/merchants',
      data: $scope.merchant,
    }).success(function(data){
      $location.path("/merchants/" + data.id);
    });
  };

});

Muber.controller('MerchantsShowController', function($scope, $http, $routeParams){
  $http({
    method: 'GET',
    url: '/api/v1/merchants/' + $routeParams.id
  }).success(function(data){
    $scope.merchant = data;
  });
});

Muber.controller('MerchantsIndexController', function($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/v1/merchants'
  }).success(function(data){
    $scope.merchants = data;
  });
});
