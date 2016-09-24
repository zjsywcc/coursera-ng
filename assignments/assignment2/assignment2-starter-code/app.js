(function() {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
      var BuyList = this;
      ShoppingListCheckOffService.initialize();
      BuyList.items = ShoppingListCheckOffService.getBuyList();

      var Bought = ShoppingListCheckOffService.getBoughtList();
      BuyList.buy = function (itemIndex) {
        try {
          ShoppingListCheckOffService.buy(itemIndex);
        } catch (e) {
          BuyList.errorMessage = e.message;
        }
        if(Bought.length != 0) {
          BuyList.hide = "yes";
        }
      }
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var BoughtList = this;
      var Bought = ShoppingListCheckOffService.getBoughtList();
      BoughtList.items = Bought;
    }

    function ShoppingListCheckOffService() {
      var service = this;

      var toBuy = [];
      var Bought = [];

      var addItem = function (name, quantity, list) {
        var item = {
          name: name,
          quantity: quantity
        };
        list.push(item);
      }

      service.initialize = function () {
        addItem("cookies", 10, toBuy);
        addItem("milks", 5, toBuy);
        addItem("cakes", 6, toBuy);
        addItem("sandwiches", 7, toBuy);
        addItem("tomatoes", 8, toBuy);
        addItem("chips", 9, toBuy);
      }

      service.getBuyList = function () {
        return toBuy;
      }

      service.getBoughtList = function () {
        return Bought;
      }

      service.buy = function (itemIndex) {
        if (itemIndex <= toBuy.length) {
          var bought = toBuy.splice(itemIndex, 1);
          addItem(bought[0].name, bought[0].quantity, Bought);
        }
        allBought();
      }

      var allBought = function () {
        if(toBuy.length === 0) {
          throw new Error("Everything is bought!");
        }
      }
    }

}());
