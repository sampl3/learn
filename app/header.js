angular.module('app').directive('myHeader',myHeader);

function myHeader(){
    console.log('ctrl');

    return {
        restrict: 'EA',
        templateUrl: 'views/header.html',
        controller: headerController,
        controllerAs: 'header'
    };

}

function headerController(){
    var data=this;

    data.name='phil';
}