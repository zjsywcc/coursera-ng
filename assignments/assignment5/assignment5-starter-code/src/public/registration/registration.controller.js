(function() {
  'use strict';

  angular.module('public')
  .controller('RegistrationController', RegistrationController);

  RegistrationController.$inject = ['SignupService', 'ApiPath'];

  function RegistrationController(SignupService, ApiPath) {
    var $ctrl = this;

    var $service = SignupService;

    var registration = $service.getRegistration();

    $ctrl.saved = $service.saved();
    $ctrl.basePath = ApiPath;

    if($service.saved()) {
      $ctrl.firstName = registration.firstName;
      $ctrl.lastName = registration.lastName;
      $ctrl.email = registration.email;
      $ctrl.phone = registration.phone;
      if(!$ctrl.phone) {
        $ctrl.phone = "you have to add phone number!";
      }
      $ctrl.menu_item = registration.menu_item;
      $ctrl.favourite_image = $ctrl.basePath + "/images/" + registration.menu_item.short_name + ".jpg";
    }
  }
}());
