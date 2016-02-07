angular.module('app').config(function ($stateProvider, $urlRouterProvider)    {


    $stateProvider.state('home',{
        url: '/home',
        templateUrl: 'views/home.html'
    }).state('p1',{
        url: '/page1',
        templateUrl: 'views/p1.html'
    }).state('basket',{
        url: '/basket/{user}',
        templateUrl: 'views/basket.html'
    });

    $urlRouterProvider.otherwise('/basket/defaultUser');
});
