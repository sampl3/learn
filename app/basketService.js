
angular.module('app').service('basketService',basketService);

function basketService(){
    this.subscribe = subscribe;
    this.setValue = setValue;

    // Create subject
    var subject = new Rx.BehaviorSubject(null);

// Hide its type
    var source = subject.asObservable();

    ////////


    function setValue(value){
        console.log('svc set',value);
        subject.onNext(value);
    }

    function subscribe(onNext, onError, onCompleted){
        source.subscribe(onNext,onError,onCompleted);
    }
}