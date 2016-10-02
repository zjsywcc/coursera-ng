(function() {
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', foundItems);

  function foundItems() {
    var ddo = {
      templateUrl: 'NarrowItDownList.html',
      scope: {
        foundItem: '<',
        onRemove: '&',
        isEmpty: '<'
      },
      controller: NarrowItDownController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;
    var menuList = MenuSearchService;
    var searchTerm = "";
    list.empty = false;

    list.searchItems = function (searchTerm) {
      var promise = menuList.getMatchedMenuItems(searchTerm);

      promise.then(function (response) {
        list.found = [];
        if(searchTerm != "") {
          list.found = response.data.menu_items.filter(function (value) {
            return value.description.indexOf(searchTerm) !== -1;
          });
        } else {
          list.empty = "yes";
        }
        if(list.found.length == 0) {
          list.empty = "yes";
        } else {
          list.empty = "no";
        }
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    };

    list.removeItem = function (itemIndex) {
      menuList.removeItem(list.found, itemIndex);
      if(list.found.length == 0) {
        list.empty = "yes";
      }
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var found = [];

    service.getMatchedMenuItems = function (searchTerm) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });
      return response;
    };

    service.removeItem = function (items, itemIndex) {
      items.splice(itemIndex, 1);
    };
  }
}());
