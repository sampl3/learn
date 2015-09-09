angular.module('app').config(function ($stateProvider, $urlRouterProvider)    {

console.log('config');


    $stateProvider.state('home',{
        url: '/home',
        templateUrl: 'views/home.html'
    }).state('p1',{
        url: '/page1',
        templateUrl: 'views/p1.html'
    }).state('basket',{
        url: '/basket',
        templateUrl: 'views/basket.html'
    });

    $urlRouterProvider.otherwise('/basket');
});
