Muber.controller('employeeHomeController',
  function($scope, ngDialog, DemoService, $state) {

    $scope.openPopover = function(merchant) {
      $scope.merchant = merchant;
      $scope.rating = _.range(merchant.ratings);
      ngDialog.open({
        template: 'employee-perk-info',
        className: 'ngdialog-theme-default',
        scope: $scope,
        controller:'employeePerkInfoPopup'
      });
    };
    $scope.employeeHomeTab = $state.current.tab;

    $scope.$watchCollection('employeeHomeTab', function(){

      if($scope.employeeHomeTab==="Featured") {
        $scope.deals = DemoService.deals();
      }
      else {
        $scope.deals = _.filter(DemoService.deals(),
                          function(m){ return m.type ===$scope.employeeHomeTab;})
      }
    });

});

Muber.controller('employeePerkInfoPopup',
  function($scope){
    clickedMerchant = $scope.merchant;

    $scope.selection = "How to Use";

    $scope.changeSelection = function(sel){
      $scope.selection = sel;
    };
});
