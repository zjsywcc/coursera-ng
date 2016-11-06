(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://zjsywcc.github.io/coursera-ng/assignments/assignment5/assignment5-starter-code')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
