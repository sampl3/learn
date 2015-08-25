angular.module('app').config(function ($stateProvider, $urlRouterProvider)    {

console.log('config');


    $stateProvider.state('home',{
        url: '/home',
        templateUrl: 'views/home.html'
    }).state('p1',{
        url: '/page1',
        templateUrl: 'views/p1.html'
    }).state('users/:user',{
        url: '/basket/:user',
        templateUrl: 'views/basket.html',
        controller: basketController,
        controllerAs: 'basket'
    });

    $urlRouterProvider.otherwise('/basket/default');
});
