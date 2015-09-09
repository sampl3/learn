

angular.module('app').directive('myBasket', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/myBasket.html',
        controller: myBasketController,
        controllerAs: 'basket'
    };

    function myBasketController($firebaseArray, $scope, $stateParams, basketService){

        this.addItem = addItem;
        this.toggleItem = toggleItem;
        this.removeItem = removeItem;
        this.setFilter = setDisplayedData;
        this.getUser = getUser;
        this.setUser = setUser;
        this.cancelUser = cancelUser;


        var subscription = basketService.subscribe(
            function (x) {
                console.log('svc next: ' + x);
            },
            function (err) {
                console.log('svc error: ' + err);
            },
            function () {
                console.log('svc completed');
            });

        $scsope.$on('$destroy', function () {
            subscription.dispose();
        });


        var data=this;

        data.user = $stateParams.user ? $stateParams.user : 'default';
        data.newUser = data.user;

        var db = new Firebase("https://flickering-fire-2385.firebaseio.com");
        var  activeItems, inactiveItems;

        data.filter="all";
        listerUserData(data.user);


        //////

        function listerUserData(user){
            data.items = $firebaseArray(db.child('basket/' + user ));

            db.child('basket/' + user).on('value', function (ref) {
                console.log('data changed');
                var values = ref.val();
                activeItems = _.filter(values, function (item) { return !item.checked; });
                inactiveItems = _.filter(values, function (item) { return item.checked; });
                setDisplayedData(data.filter);
            });
        }

        function setDisplayedData(filter){
            data.filter = filter;
            switch (data.filter){
                case 'all':
                    data.displayedItems = data.items;
                    break;
                case 'toBuy':
                    data.displayedItems = activeItems;
                    break;
                case 'bought':{
                    data.displayedItems = inactiveItems;
                    break;
                }
            }

            $scope.$applyAsync();
        }

        function addItem(e){
            if (e == null || e.which == 13){
                data.items.$add({name:data.newItem, checked:false});
                data.newItem='';
            }
        }

        function removeItem($event,item){
            $event.stopPropagation();
            var index= _.findIndex(data.items, function(i) {
                return i.name == item.name;
            });
            data.items.$remove(index);
        }

        function toggleItem(item){
            var index= _.findIndex(data.items, function(i) {
                return i.name == item.name;
            });

            data.items[index].checked = !data.items[index].checked;
            console.log(data.items[index]);
            data.items.$save(data.items[index]);
        }

        function getUser(){
            data.showUser = true;
            $timeout(function () {
                $('#userBox input').focus();
            });
        }

        function setUser(){
            data.showUser= false;
            data.user = data.newUser;
            listerUserData(data.user);
        }

        function cancelUser(){
            data.showUser= false;
            data.newUser = data.user;
        }

    }

});


angular.module('app').directive('myConsole', function () {
    return {
        restrict: 'A',
        template: '<span style="padding-right:12px">{{console.value}}</span>',
        controller: myConsoleController,
        controllerAs: 'console'
    };

    function myConsoleController(basketService) {
        var console = this;


        var subscription = basketService.subscribe(
            function (x) {
                console.value = x;
            },
            function (err) {
                console.value = 'error ' + err;
            },
            function () {
                console.value = 'completed';
            });

        $scsope.$on('$destroy', function () {
            subscription.dispose();
        });
    }
});