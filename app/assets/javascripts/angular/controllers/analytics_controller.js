Muber.controller('AnalyticsController',
  function($scope, $filter, DemoService) {
  $scope.config = {
    options: {},
  };

  cat = ["Cellphones", "Dining", "Entertainment", "Fitness", "Shopping", "Spa and Massage", "Travel", "Utilities"];

  $scope.flipit="";

  $scope.flip = function(id) {
    if ($(id).find('.flipit')[0]) {
      $(id).find('.front').removeClass('flipit');
      $(id).find('.back').removeClass('flipit');
    } else {
      $(id).find('.front').addClass('flipit');
      $(id).find('.back').addClass('flipit');
    }
  };

  $scope.dates1 = { startDate: moment().subtract(1, 'day'), endDate: moment().subtract(1, 'day') };
	$scope.ranges1 = {
		'Today': [moment(), moment()],
		'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
		'Last 7 days': [moment().subtract('days', 7), moment()],
		'Last 30 days': [moment().subtract('days', 30), moment()],
		'This month': [moment().startOf('month'), moment().endOf('month')]
	};

  $scope.dates2 = { startDate: moment().subtract(1, 'day'), endDate: moment().subtract(1, 'day') };
  $scope.ranges2 = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
    'Last 7 days': [moment().subtract('days', 7), moment()],
    'Last 30 days': [moment().subtract('days', 30), moment()],
    'This month': [moment().startOf('month'), moment().endOf('month')]
  };

  $scope.dates3 = { startDate: moment().subtract(1, 'day'), endDate: moment().subtract(1, 'day') };
  $scope.ranges3 = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
    'Last 7 days': [moment().subtract('days', 7), moment()],
    'Last 30 days': [moment().subtract('days', 30), moment()],
    'This month': [moment().startOf('month'), moment().endOf('month')]
  };

  // line1 = new Line(dates);
  //line2 = new Line();
  //line2.changeDate();
  //line1.
  // Line();

  $scope.labelDate3Range = moment($scope.dates3.startDate).format("MMM D,YYYY") +'-'+ moment($scope.dates3.endDate).format("MMM D,YYYY");
  $scope.labelDate1Range = moment($scope.dates1.startDate).format("MMM D,YYYY") +'-'+ moment($scope.dates1.endDate).format("MMM D,YYYY");
  console.log($scope.dates3.startDate);
  console.log($scope.labelDateRange);

  $scope.$watchCollection('dates1', function(newDates, oldDates){
    $scope.labelDate1Range = moment($scope.dates1.startDate).format("MMM D,YYYY") +' - '+ moment($scope.dates1.endDate).format("MMM D,YYYY");

        DemoService.perksByType(newDates).then(
          function(data) {
            $scope.perksByType = data.data.result;

        data = {};
        _.each($scope.perksByType, function(value, key, list) {
          date= Object.keys(value).toString();
          dates = date.split('-');
          utc = Date.UTC(+dates[0], +dates[1] - 1, +dates[2]);
          _.each(value, function(v, k, l){
            diff = _.difference(cat, Object.keys(v));

            _.each(diff, function(e, i, l){
              if (_.has(data, e)) {
                data[e].push([utc, 0]);
              } else {
                data[e] = [[utc, 0]];
              }
            });
            _.each(v, function(value, k, list){
              if (_.has(data, k)) {
                data[k].push([utc, value]);
              } else {
                data[k] = [[utc, value]];
              }
            });
          });

        });

        $scope.stackedBarConfig.series = [];
        _.each(data, function(value, key, list){
          $scope.stackedBarConfig.series.push({name: key, data: value});
        });
        $scope.stackedBarConfig.loading = false;

      });
  });

  $scope.$watchCollection('dates3', function(newDates, oldDates) {

    $scope.labelDate3Range = moment($scope.dates3.startDate).format("MMM D,YYYY") +' - '+ moment($scope.dates3.endDate).format("MMM D,YYYY");
    DemoService.perkValueByType(newDates).then(
      function(data) {
      $scope.perkValueByType = data.data.result;
      realValue = {};
      actualValue = {};
      _.each($scope.perkValueByType, function(value, key, list) {

        _.each(value, function(v,k,l){
          realValue[k]=v;
        });
      });

      diff = _.difference(cat, Object.keys(realValue));


      _.each(realValue, function(val,ke,list){
        a = _.omit(val, 'discounted_value');
        b = _.omit(val, 'actual_value');
        _.each(a, function(x,y,z){
          realValue[ke] = Math.floor(x * 100) / 100;
        });
        _.each(b, function(e,r,t){
          actualValue[ke] = Math.floor(e * 100) / 100;
        });
      });

      _.each(diff, function(e, i, l){
        if (_.has(realValue, e)) {
          realValue[e].push(0);
        } else {
          realValue[e] = 0;
        }
        if (_.has(actualValue, e)) {
          actualValue[e].push(0);
        } else {
          actualValue[e] = 0;
        }
      });
      realValueKeys = Object.keys(realValue).sort();
      actualValueKeys = Object.keys(actualValue).sort();
      realValueSorted = [];
      actualValueSorted = [];
      keys = [];
      len = realValueKeys.length;
      for (i = 0; i < len; i++)
        {
          k = realValueKeys[i];
          val = realValue[k];
          realValueSorted.push(val);

          p = actualValueKeys[i];
          o = actualValue[p];
          actualValueSorted.push(o);

        }

      graphSeries = [{
        name:'Real Value', data: realValueSorted
        },{
        name:'Paid Value', data: actualValueSorted
      }];

      $scope.stackedColumn.series = [];

      $scope.stackedColumn.series.push({
        name: 'Real Value', data: realValueSorted
        },{
        name: 'Paid Value', data: actualValueSorted
      });

      $scope.stackedBarConfig.loading = false;
    });

  });


  $scope.areaConfig = {
    options: {
      chart: {
        renderTo: 'container',
        type: 'area'
      },
      tooltip: {
        pointFormat: '{series.name} amount to <b>{point.y:,.0f}</b>'
      },
      plotOptions: {
        area: {
            pointStart: 6000,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
      },
    },
    title:{
      text: ""
    },
    xAxis: {
      type: 'datetime',
      dataTimeLabelFormats: {
        month: '%b \'%y'
      }
    },
    yAxis: {
      title: {
        text:'Value in Philippine Pesos'
      },
      labels:{
        fomatter: function() {
         return this.value;
        }
      }
    },
    series: [{
      name: 'Expenses',
      data: [5000, 5000, 5000, 5000, 5000, 5000, 5000 , 5000 , 5000 , 5000,
        5000, 7500, 7500, 7500, 7500, 7500, 7500, 7500, 8400, 8400, 8400, 8400, 8400,
        9000, 9000, 9000, 9000, 9000, 9000, 10500, 10500, 10500, 10500,
        10500, 10500, 10500, 12000, 12000, 12000, 12000, 12000, 12000,
        13000, 13000, 13000, 13000, 14000, 14000, 14000, 14000, 15000,
        15000, 17500, 17500, 17500, 17500, 17500, 18300, 18300, 18300,
        20000, 20000, 20000, 20000, 20000, 20000, 20000],
      color: '#E75B5D',
      pointStart: Date.UTC(2014, 0, 1),
      pointInterval: 5 * 24 * 3600 * 1000 // one day
      }, {
      name: 'Savings',
      data: [2000, 2345, 1800, 2400, 2700, 3533 , 3800, 4003, 4335, 4732, 4221,
        5040, 5900, 6000, 6432, 6912, 7000, 7800, 8000, 8800, 9932, 10500,
        11231, 13012, 12999, 14321, 16000, 17322, 17000, 21111, 20000,
        22380, 21004, 23287, 28747, 30076, 30555, 32144, 35009, 40950,
        44304, 44464, 35708, 40099, 42357, 44237, 50401, 53344, 54586,
        55956, 55912, 62999, 64965, 65826, 63579, 60722, 63826, 68605,
        70871, 71824, 72577, 73527, 73075, 77021, 77358, 78295, 78104 ],
      color: '#9BC84A',
      pointStart: Date.UTC(2014, 0, 1),
      pointInterval: 5 * 24 * 3600 * 1000 // one day
      }]
    };

  $scope.stackedBarConfig = {
    options: {
      chart: {
        renderTo: 'container',
        type: 'line',
        margin: [10],

      },
      tooltip: {
        headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0.4,
              pointWidth:3
          }
      },
    },
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%b %e'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Perks Used'
      }
    },
    series: [],
    loading: true
  };

  $scope.stackedColumn = {
    options: {
      chart: {
        renderTo: 'container',
        type: 'column'
      },
      plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                style: {
                    textShadow: '0 0 3px black, 0 0 3px black'
                }
            }
        }
      },
      tooltip: {
        formatter: function() {
          return '<b>'+ this.x +'</b><br/>'+
            this.series.name +': '+ this.y +'<br/>'+
            'Savings: '+ Math.floor(Math.abs(this.point.stackTotal-this.y-this.y)*100)/100;
        }
      },
      legend: {
        align: 'right',
        x: -70,
        verticalAlign: 'top',
        y: 20,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['Cellphone', 'Dining', 'Entertainment', 'Fitness', 'Shopping', 'Spa & Massage', 'Travel', 'Utilities'],
      labels: {
        //enabled: false,
        color: '#424242',
        x: -3,
        useHTML: true,
        formatter: function() {
          return {
            'Cellphone':'<h4 class="ss-icon ss-symbolicons-line ss-phone"></h4>',
            'Dining':'<h4 class="ss-icon ss-symbolicons-line ss-utensils"></h4>',
            'Entertainment':'<h4 class="ss-icon ss-symbolicons-line ss-tv"></h4>',
            'Fitness':'<h4 class="ss-icon ss-symbolicons-line ss-exercise"></h4>',
            'Shopping':'<h4 class="ss-icon ss-symbolicons-line ss-tshirt"></h4>',
            'Spa & Massage':'<h4 class="ss-icon ss-symbolicons-line ss-robot"></h4>',
            'Travel':'<h4 class="ss-icon ss-symbolicons-line ss-plane"></h4>',
            'Utilities':'<h4 class="ss-icon ss-symbolicons-line ss-hottub"></h4>'
          }[this.value];
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
          text: 'Perk Value (PhP)'
      },
      stackLabels: {
          // enabled: true,
          style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
      }
    },
     series: []
  };
});


//series:[{
// name: 'Real Value'
// data: [
//}]
