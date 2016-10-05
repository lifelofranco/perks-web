angular.module('Muber.services')
  .service('UserService',function($q, $cookieStore){
    var service = this;
    this._user = null;
    this.demoUser = {
      "id": 1,
      "first_name": "Bryan",
      "last_name": "Conde",
      "email": "bryan.conde@globetel.com.ph",
      "password": "thisIsADemoPassword",
    }

    this.setCurrentUser = function(u) {
      service._user = u;
      if (u) {
        $.cookie('user', JSON.stringify(u), {
          expires: 1,
          path: '/',
        });
      }
    };

    this.currentUser = function() {
      var d = $q.defer();
       if (service._user) {
         d.resolve(service._user);
       } else if ($cookieStore.get('user')) {
         service.setCurrentUser($cookieStore.get('user'));
         d.resolve(service._user);
       } else {
         d.resolve(null);
       }
      return d.promise;
    };

    this.login = function(login) {
      var d = $q.defer();
      if ((login.email == this.demoUser.email || login.email === 'dom@danao.co') && login.password == this.demoUser.password) {
        user = {
          "id": 1,
          "first_name": this.demoUser.first_name,
          "last_name": this.demoUser.last_name,
          "email": login.email,
        };
        service.setCurrentUser(user);
        d.resolve(user);
      } else {
        d.resolve(null);
      }
      return d.promise;
    };

    this.logout = function() {
      var d = $q.defer();
      service.setCurrentUser(null);
      d.resolve(null);
      $cookieStore.remove('user');
      return d.promise;
    }
  });
