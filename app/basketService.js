
angular.module('app').service('basketService',basketService);

function basketService($timeout){
    this.subscribe = subscribe;
    this.setValue = setValue;

    // Create subject
    var subject = new Rx.BehaviorSubject(null);

// Hide its type
    var source = subject.asObservable();

    window.svc=this;
    $timeout(function () {
        setValue('timed out');
    },4500);
    $timeout(function () {
        setValue('first');
    },2000);

    ////////


    function setValue(value){
        console.log('svc set',value);
        subject.onNext(value);
    }

    function subscribe(onNext, onError, onCompleted){
        source.subscribe(onNext,onError,onCompleted);
    }
}