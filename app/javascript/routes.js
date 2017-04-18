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
       .when('/live', {
           templateUrl: 'views/live.html',
           controller: 'LiveController',
           controllerAs: 'liveCtrl'
       })
       .otherwise({redirectTo: '/home'});
});