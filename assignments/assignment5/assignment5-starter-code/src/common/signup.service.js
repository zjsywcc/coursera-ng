(function() {
  angular.module('common')
  .service('SignupService', SignupService);

  function SignupService() {
    var $service = this;
    var EMPTY = {firstName: "", lastName: "", email: "", phone: ""};

    $service.registration = EMPTY;

    $service.signup = function (details) {
      $service.registration = details;
    }

    $service.clear = function () {
      $service.registration = EMPTY;
    }

    $service.saved = function () {
      return $service.registration != EMPTY;
    }

    $service.getRegistration = function() {
      return $service.registration;
    }

  }
})();
