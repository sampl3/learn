


function basketController($firebaseArray, $scope, $stateParams,$timeout){

    this.addItem = addItem;
    this.toggleItem = toggleItem;
    this.removeItem = removeItem;
    this.setFilter = setDisplayedData;
    this.getUser = getUser;
    this.setUser = setUser;
    this.cancelUser = cancelUser;


// Create subject
    var subject = new Rx.BehaviorSubject(null);


// Hide its type
    var source = subject.asObservable();

    var subscription = source.subscribe(
        function (x) {
            console.log('Next: ' + x);
        },
        function (err) {
            console.log('Error: ' + err);
        },
        function () {
            console.log('Completed');
        });



    var data=this;

    data.user = $stateParams.user ? $stateParams.user : 'default';
    data.newUser = data.user;

    var db = new Firebase("https://flickering-fire-2385.firebaseio.com");
    // download the data into a local object

    //db.child('basket/mick').set([
    //    {name:'tomates',checked:false},
    //    {name:'pain',checked:true},
    //    {name:'poisson',checked:false}
    //]);



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
            //console.log('fct', Object.keys(values).length);
            subject.onNext(values);
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