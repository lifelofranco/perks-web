Muber.config(function($translateProvider) {
  $translateProvider.useStaticFilesLoader({
      prefix: '/api/v1/app/i18n/',
      suffix: '.json'
  });
  $translateProvider.preferredLanguage('en_US');
});
