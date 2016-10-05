angular.module('Muber.services')
  .service('EmailService', function($http){
    this.api_key = "JaY-iWIIpOEo2cmdZBHmjA";
    this.send_email = function(data) {
      return $http({
        method: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
          key: this.api_key,
          message: {
            text: "Hello Perks,\n You've got one demo request. Respond to this request at " + data.email + " or by phone at " + data.phone + ".",
            subject: "New Request for Demo from " + data.first_name + " " + data.last_name + " of " + data.company,
            from_email: data.email,
            from_name: data.first_name + " " + data.last_name,
            to: [
              {
                email: "perks@muber.com",
                name: "Muber Perks",
                type: "to"
              }
            ],
          }
        },
        headers: {
          'X-CSRF-TOKEN': undefined,
          'X-Requested-With': undefined
        },
      });
    }
  });
