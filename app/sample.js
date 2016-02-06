/**
 * Created by phil on 17/09/15.
 */
var user = (function () {
    function user(name) {
        this.name = name;
        this.hi = function (name) {
            console.log('hello ' + name);
        };
        console.log(hi('phil'));
    }
    return user;
})();
//# sourceMappingURL=sample.js.map