Muber.controller('ManageController',
  function($scope, $state, DemoService, $location) {
    $scope.employees = DemoService.employees();
    $scope.showEditDelete = false;
    $scope.selection = "edit";

    _.each($scope.employees, function(e){
      e.checked = false;
    });

    $scope.triggerShowEditDelete = function() {
      if (_.size(_.filter($scope.employees, function(e) { return e.checked === true; })) > 0) {
        $scope.showEditDelete = true;
      } else {
        $scope.showEditDelete = false;
      }
    };
    $scope.removeEmployee= function(){
      checkedEmployees=_.filter($scope.employees, function(e){ return e.checked ===true;});
      $scope.employees = _.difference($scope.employees, checkedEmployees);
    };
    $scope.clickedEmployee=function(employee){
      $scope.checkedEmployee=employee;
      $state.transitionTo('companies.manage.employee.detail')
    };
    $scope.changedSelection = function(sel){
      $scope.selection = sel;
    };
});
