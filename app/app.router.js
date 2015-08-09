angular.module('app').config(function ($stateProvider, $urlRouterProvider)    {

console.log('config');

    $stateProvider.state('home',{
        url: '/',
        templateUrl: 'views/home.html'
    }).state('p1',{
        url: '/page1',
        templateUrl: 'views/p1.html'
    });

    $urlRouterProvider.otherwise('/');
});
