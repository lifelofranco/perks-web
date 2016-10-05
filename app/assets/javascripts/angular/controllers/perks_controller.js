Muber.controller('PerksController',
  function($scope, $state, DemoService, ngDialog) {
    $scope.unAddedMerchants = DemoService.merchants();
    $scope.addedMerchants = [];
    $scope.selectedCategory = 'all';
    $scope.currentIndex = 0;
    $scope.secondIndex = 0;

    $scope.$watchCollection('selectedCategory', function(){
      var diff = _.difference( _.pluck(DemoService.merchants(), 'id'),
                               _.pluck($scope.addedMerchants, 'id') );

      var merchantPool = _.filter(  DemoService.merchants(),
                                    function(m) { return _.contains(diff, m.id); } );

      if ($scope.selectedCategory === 'all'){
        $scope.merchantArrays = merchantPool.chunk(6);
        $scope.sliders = _.range($scope.merchantArrays.length);
        $scope.merchants = $scope.merchantArrays[0];
      } else {
        $scope.merchantArrays = _.filter(  merchantPool,
                                      function(m){ return m.type === $scope.selectedCategory; } ).chunk(6);
        $scope.sliders = _.range($scope.merchantArrays.length);
        $scope.currentIndex = 0;
        $scope.merchants = $scope.merchantArrays[$scope.currentIndex];

      }
    });




    Array.prototype.chunk = function(chunkSize) {
    var R = [];
    for (var i=0; i<this.length; i+=chunkSize)
        R.push(this.slice(i,i+chunkSize));
    return R;
    }

    $scope.prev = function (response) {

      if (response === 'unaddedControllers') {
        $scope.currentIndex =$scope.currentIndex - 1;
        if ($scope.currentIndex >= 0) {
          $scope.merchants = $scope.merchantArrays[$scope.currentIndex];
          }
        else {
          $scope.currentIndex = 0;
        }
      }
      else {
        $scope.secondIndex = $scope.secondIndex - 1;
        if ($scope.secondIndex >= 0) {
          $scope.addedMerchantsPool = $scope.addedMerchantsArray[$scope.secondIndex];
          }
        else {
          $scope.secondIndex = 0;
        }
      }
    }

    $scope.next = function(response) {
      if (response === 'unaddedControllers') {
        $scope.currentIndex = $scope.currentIndex + 1;
        if ($scope.currentIndex < $scope.merchantArrays.length) {
          $scope.merchants = $scope.merchantArrays[$scope.currentIndex];
        }
        else {
          $scope.currentIndex = $scope.merchantArrays.length - 1;

        }
      }
      else {
        $scope.secondIndex = $scope.secondIndex + 1;
        if ($scope.secondIndex < $scope.addedMerchantsArray.length) {
          $scope.addedMerchantsPool = $scope.addedMerchantsArray[$scope.secondIndex];
        }
        else {
          $scope.secondIndex = $scope.addedMerchantsArray.length - 1;

        }

      }
    }

    $scope.moveTo = function(sliderIndex) {
      $scope.merchants = $scope.merchantArrays[sliderIndex];
      $scope.currentIndex = sliderIndex;
    }

    $scope.secondMoveTo = function(sliderIndex) {
      $scope.addedMerchantsPool = $scope.addedMerchantsArray[sliderIndex];
      $scope.secondIndex = sliderIndex;
    }

    $scope.$watchCollection('unAddedMerchants', function(){
      if ($scope.selectedCategory === 'all'){
        $scope.merchantArrays = $scope.unAddedMerchants.chunk(6);
        $scope.sliders = _.range($scope.merchantArrays.length);
        $scope.merchants = $scope.merchantArrays[0];
      } else {
        $scope.merchantArrays = _.filter(  $scope.unAddedMerchants,
                                      function(m){ return m.type === $scope.selectedCategory; }).chunk(6);
        $scope.sliders = _.range($scope.merchantArrays.length);
        $scope.merchants = $scope.merchantArrays[$scope.currentIndex];
      }
      $scope.merchantCategories = _.countBy( _.pluck($scope.unAddedMerchants, 'type'),
                                             function(c){ return c; } );
    });

    var transferMerchantById = function(id, from, to){
      to.push(_.findWhere(from, {id: id}));
      return _.filter(from, function(m){ return m.id != id; });
    };

    $scope.openPopover = function(merchant) {
      $scope.merchant = merchant;
      $scope.rating = _.range(merchant.ratings);
      ngDialog.open({
        template: 'perk-info',
        className: 'ngdialog-theme-default',
        scope: $scope,
        controller:'perkInfoPopup'
      });
    };

    $scope.addMerchant = function(merchant) {
      $scope.unAddedMerchants = transferMerchantById( merchant.id,
                                                      $scope.unAddedMerchants,
                                                      $scope.addedMerchants );
      $scope.addedMerchantsArray = $scope.addedMerchants.chunk(8);
      $scope.secondSliders = _.range($scope.addedMerchantsArray.length);
      $scope.addedMerchantsPool = $scope.addedMerchantsArray[$scope.secondIndex];
      ngDialog.close();
    };

    $scope.removeMerchant = function(merchant){
      $scope.addedMerchants = transferMerchantById( merchant.id,
                                                    $scope.addedMerchants,
                                                    $scope.unAddedMerchants );
      $scope.addedMerchantsArray = $scope.addedMerchants.chunk(8);
      $scope.secondSliders = _.range($scope.addedMerchantsArray.length);
      $scope.addedMerchantsPool = $scope.addedMerchantsArray[$scope.secondIndex];

      ngDialog.close();
    };

    $scope.selectCategory = function(type) {
      $scope.selectedCategory = type;
    };

});

Muber.controller('perkInfoPopup',
  function($scope){
    clickedMerchant = $scope.merchant;
    addedMerchants = $scope.addedMerchants;

    $scope.ifPresent = _.contains(addedMerchants, clickedMerchant);

    $scope.selection = "Description";

    $scope.changeSelection = function(sel){
      $scope.selection = sel;
    };
});
