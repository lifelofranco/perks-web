angular.module("ngRailsCsrf", []).config(['$httpProvider', function($httpProvider) {
  var headers = $httpProvider.defaults.headers.common;
  headers['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');
  headers['X-Requested-With'] = 'XMLHttpRequest';
}]);
