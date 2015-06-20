angular.module('phonecatApp', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './Client/templates/index.html',
        controller: './Client/controller/phonecatApp.js'
      });
  }]);
