Muber.controller('employeeDashboardController',
  function($scope, DemoService) {


    subscribed_unused_array=[];
    used_array=[];
    subscribed_array=[];
    un_used_array = [];


    _.each(DemoService.allEmployeePerk().perk, function(el, i, l) {
      if(el.status!=='Redeemed' && el.status!=='Subscription Ended') {
        subscribed_unused_array.push(el);
      }
      else {
        used_array.push(el)
      }
    });

    _.each(used_array, function(el, i, l) {
      used = _.filter(DemoService.allMerchants(),
                                function(m) {return m.id === el.id; })
      used = used[0];
      el["deal"]=used;
      el.subscribe_start = moment(el.subscribe_start).format('LL');
      el.subscribe_end = moment(el.subscribe_end).format('LL');
      el.purchased_at = moment(el.purchased_at).format('LL');
      el.used_at = moment(el.used_at).format('LL');
      el["name"]=used.name;
    });

    _.each(subscribed_unused_array, function(el, i, l) {
      subscribed = _.filter(DemoService.allMerchants(),
                                function(m) { return m.id === el.id; })
      subscribed = subscribed[0];
      el["expires_on"] = moment(subscribed.expires_on).format('LL');
      el["deal"]=subscribed;
      el["name"]=subscribed.name;
      el.subscribe_start = moment(el.subscribe_start).format('LL');
      el.purchased_at = moment(el.purchased_at).format('LL');
    });

    $scope.all_subscribed_unused = subscribed_unused_array;

    all_subscribed_unused = $scope.all_subscribed_unused;
    $scope.used_array = used_array;


    $scope.myPerkFilterOptions = [{"label":"All Perks", "id":0},
              {"label":"Subscribed Perks", "id":1},
              {"label":"Available Perks","id":2}];

    $scope.pastPerkFilterOptions = [{"label":"All Perks", "id":0},
              {"label":"Subscribed Perks", "id":1},
              {"label":"Redeemed Perks","id":2}];

    subscribed_array = _.filter(all_subscribed_unused,
                              function(m) { return m.status === 'Subscribed'; });
    un_used_array = _.filter(all_subscribed_unused,
                              function(m) { return m.status === 'Not Used'; });

    subscription_ended_array = _.filter(used_array,
                              function(m) { return m.status === 'Subscription Ended'; });
    redeemed_array = _.filter(used_array,
                              function(m) { return m.status === 'Redeemed'; });

    $scope.selectFilter = function(response) {
      if(response ==='myPerks') {
        if($scope.filter===0) {
          $scope.all_subscribed_unused = all_subscribed_unused;
        }
        else if($scope.filter===1) {
          $scope.all_subscribed_unused = subscribed_array;
        }
        else {
          $scope.all_subscribed_unused = un_used_array;
        }
      }
      else {
        if($scope.filter===0) {
          $scope.used_array = used_array;
        }
        else if($scope.filter===1) {
          $scope.used_array = subscription_ended_array;
        }
        else {
          $scope.used_array = redeemed_array;
        }
      }
    };

    $scope.prefers = ['Guys', 'Gals', 'Everyone'];
    $scope.selected = $scope.prefers[2];

    $scope.select = function(prefer) {
      $scope.selected = prefer;
    };

    $scope.interests = ['Food & Drinks',
                    'Events & Activities',
                    'Health & Beauty',
                    'Travel',
                    'Sports & Fitness',
                    'Electronics',
                    'Clothes & Apparel',
                    'Home'];

    $scope.myCities = ['quezon'];
      $scope.cities = {
        quezon: 'Quezon City',
        laguna: 'Laguna City',
        global: 'Bonifacio Global City'
      };


});
