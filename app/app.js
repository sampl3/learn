angular.module('app',['ui.router','firebase'], app);


function app(){
    console.log('app loaded');
}


angular.module('app').controller('homeController', function ($log, basketService) {

    var console = this;

    this.setValue= basketService.setValue;

    basketService.subscribe(
        function (x) {
            console.message = x;
            $log.log('home controller', console);
        },
        function (err) {
            console.message = 'error ' + err;
        },
        function () {
            console.message = 'completed';
        });



});
