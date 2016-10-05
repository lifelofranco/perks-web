Muber.controller('HomeController', function($scope){
    $scope.chartConfig = {
        options: {
            chart: {
                type: 'line',
                height:'300'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0,
                itemMarginTop: 10,
                itemMarginBottom: 10
            },
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        },
        yAxis: {
          title: {
            text: 'Perks Used'
          },
        },
        title: {
          text: ""
        },
        series: [{
          name: 'Sales and Marketing',
          data: [10, 15, 12, 8, 7]
        },{
          name: 'Legal',
          data: [15, 20, 5, 30, 5]
        },{
          name: 'Research and Development',
          data: [29, 15, 8, 15, 20]
        },{
          name: 'Operations',
          data: [40, 20, 15, 10, 15]
        }],
    };
    var colors = Highcharts.getOptions().colors,
        categories = ['Fitness & Wellness', 'Travel', 'Entertainment', 'Dining', 'Cellphones'],
        name = 'Perk Types',
        data = [{
                y: 40,
                color: colors[0],
                drilldown: {
                    name: 'Fitness Wellness',
                    categories: ['Golds Gym', 'Fitness First', 'The Spa', 'Karate Kid'],
                    data: [5, 15, 15, 5],
                    color: colors[0]
                }
            }, {
                y: 20,
                color: colors[1],
                drilldown: {
                    name: 'Travel',
                    categories: ['Cebu Pacific', 'Philippine Airlines', 'Zest Air', 'Tiger Airways'],
                    data: [7, 4, 3, 6],
                    color: colors[1]
                }
            }, {
                y: 15,
                color: colors[2],
                drilldown: {
                  name: 'Entertainment',
                  categories: ['Ayala Cinemas', 'SM Cinemas', 'Time Zone', 'LazeXtreme'],
                  data: [10, 2, 2, 1],
                  color: colors[2]
                }
            }, {
                y: 10,
                color: colors[3],
                drilldown: {
                  name: 'Dining',
                  categories: ['Sambokojin', 'Dads buffet', 'Itallianis', 'Bonchon', 'Sbarro', 'Pizza Hut', 'Tacco bel', 'Dairy Queen', 'Burget King'],
                  data: [1, 0.7, 0.3, 2, 1, 1, 2, 1, 1],
                  color: colors[3]
                }
            }, {
                y: 15,
                color: colors[4],
                drilldown: {
                    name: 'Cellphones',
                    categories: ['Smart', 'Globe'],
                    data: [ 5, 10],
                    color: colors[4]
                }
            }];


    // Build the data arrays
    var perkData = [];
    var merchantData = [];
    for (var i = 0; i < data.length; i++) {

        // add browser data
        perkData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add version data
        for (var j = 0; j < data[i].drilldown.data.length; j++) {
            var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
            merchantData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }
    $scope.pieConfig = {

      options: {
          chart: {
              type: 'pie'
          },
          tooltip: {
            valueSuffix: '%'
          }
      },
      title:{
        text:""
      },
      plotOptions: {
          pie: {
              shadow: false,
              center: ['50%', '50%']
          }
      },
      series: [{
          name: 'Perk',
          data: perkData,
          size: '60%',
          dataLabels: {
              formatter: function() {
                  return this.y > 5 ? this.point.name : null;
              },
              color: 'white',
              distance: -30
          }
      }, {
          name: 'Merchant',
          data: merchantData,
          size: '80%',
          innerSize: '60%',
          dataLabels: {
              formatter: function() {
                  // display only if larger than 1
                  return this.y > 1 ? '<b>'+ this.point.name +':</b> '+ this.y +'%'  : null;
              }
          }
      }]
        };
});
