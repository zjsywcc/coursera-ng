(function () {
  'use strict';

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
      $scope.menu = "";
      $scope.message = "";

      $scope.check = function() {
        var array = $scope.menu.split(',');
        var count = 0;
        for(var i = 0; i < array.length; i++) {
          if(array[i].replace(/\s+/g, '')!="") {
            count++;
          }
        }
        if(count > 3) {
          $scope.message = "Too much!";
          $scope.state = "Ignored";
          $scope.formState = "formSuccess";
        } else if(count > 0) {
          $scope.message = "Enjoy!";
          $scope.state = "Ignored";
          $scope.formState = "formSuccess";
        } else {
          $scope.message = "Please enter data first";
          $scope.state = "Error";
          $scope.formState = "formError";
        }
      }
  }
})();
