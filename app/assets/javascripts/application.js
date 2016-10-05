//= require jquery_ujs
//= require lodash
//= require shared/util

//  ANGULAR: Core Angular Files
//= require angular
//= require angular-ui-router
//= require angular-cookies
//= require angular-animate
//= require angular/app
//= require angular/i18n
//= require angular/auth0
//= require angular/routes
//= require angular/ng_rails_csrf
//= require angular/ngDialog
//= require angular-ui-bootstrap-tpls
//= require_tree ./angular/controllers
//= require angular/directives/base_directive
//= require_tree ./angular/directives
//= require_tree ./angular/services

//  MUBER: Core Muber Files
//= require_tree ./components
//= require_tree ./flat-ui
//= require ./shared/jquery.scrollTo-1.4.3.1-min
//= require ./shared/modernizr.custom
//= require ./shared/page-transitions
//= require ./shared/easing.min
//= require ./shared/jquery.svg.js
//= require ./shared/jquery.svganim
//= require ./shared/jquery.parallax.min
//= require ./shared/startup-kit

// Vendor JS
//= require auth0-widget-5.0.6
//= require auth0-angular-1.1.0
//= require angular-translate
//= require angular-translate-loader-static-files
//= require chosen.jquery
//= require chosen
//= require highcharts
//= require highcharts-ng
//= require moment
//= require daterangepicker
//= require ng-bs-daterangepicker
//= require angular-timer.min
//= require angular-carousel.min
//= require angular-touch

if (typeof console == "object") {
  if (Util.is_chrome) {
    console.log("%cHey! Like what you see and enjoy looking under the hood? That's cool. We love curious people. You should join us and help us build great stuff.", "color: #0677c8; font-size: 18px; font-family: 'Helvetica-Neue', Helvetica, Arial, sans-serif;");
  } else {
    console.log("Hey! Like what you see and enjoy looking under the hood? That's cool. We love curious people. You should join us and help us build great stuff.");
  }
}
