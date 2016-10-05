var Muber = angular.module("Muber", [ "ngRailsCsrf",
                                      "ngCookies",
                                      "ngAnimate",
                                      "ngDialog",
                                      "auth0",
                                      "ui.bootstrap",
                                      "ngBootstrap",
                                      "timer",
                                      "ui.router",
                                      "angular-carousel",
                                      "localytics.directives",
                                      "highcharts-ng",
                                      "pascalprecht.translate",
                                      "Muber.directives",
                                      "Muber.services",  ]);



// We are not using Cloudfront for now...
// Muber.config( function($sceDelegateProvider) {
//  $sceDelegateProvider.resourceUrlWhitelist([
//    'self',
//    'http*://d3dpl9z30910db.cloudfront.net/**', ]);
// });
