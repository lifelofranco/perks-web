angular.module('Muber.directives')
  .directive('interestCheckbox', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="choices"> \
                          <label class="green-outline" ng-class="{\'active-interest\' : isChecked}"> \
                             <input class="removeCheckbox" type="checkbox" ng-model="isChecked" />{{text}} \
                             <span class="ss-icon ss-heart" ng-class="{\'ss-symbolicons-block\':isChecked}"></span>\
                          </label> \
                       </div>',
      scope: {
        text: '@'
      }
    };
  });
