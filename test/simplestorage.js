var simplestorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", function(accounts) {

    let app;

    it("initializes with num as 1", function() {
        return simplestorage.deployed().then(function(instance) {
            app = instance;
            return app.get();
        }).then(function(result){
            var num = result[0].toNumber();
            assert.equal(num, 1, "num is initialized as 1");
        });
    });
    it("initializes with text as Hello, World!", function() {
        return simplestorage.deployed().then(function(instance) {
            app = instance;
            return app.get();
        }).then(function(result){
            var text = result[1];
            assert.equal(text, "Hello, World!", "text is initialized as Hello, World!");
        });
    });
    it("set data as 2 and Hi!", function() {
        return simplestorage.deployed().then(function(instance) {
            app = instance;
            return app.set(2, "Hi!");
        }).then(function(){
            return app.get();
        }).then(function(result) {
            var num = result[0].toNumber();
            var text = result[1];
            assert.equal(num, 2, "num is set as 2");
            assert.equal(text, "Hi!", "text is set as Hi!");
        });
    });

});