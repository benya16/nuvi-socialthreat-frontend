angular.module('myApp').config(function($routeProvider) {
   $routeProvider
       .when('/', {
           redirectTo: '/home'
       })
       .when('/home', {
           templateUrl: 'views/home.html',
           controller: 'HomeController',
           controllerAs: 'homeCtrl'
       })
       .otherwise({redirectTo: '/home'});
});