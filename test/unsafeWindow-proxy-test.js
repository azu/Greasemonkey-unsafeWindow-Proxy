var assert = chai.assert;
function createObjectIn() {
    createObjectIn.called = true;
}

function exportFunction() {
    exportFunction.called = true
}

function cloneInto() {
    cloneInto.called = true
}
describe("unsafeWindow-proxy", function () {
    it("should return proxy object", function () {
        var dummyWindow = {};
        var proxyObject = unsafeWindowProxy(dummyWindow);
        assert(proxyObject);
    });
    context("#get", function () {
        var dummyWindow = {};
        beforeEach(function () {
            dummyWindow.name = "dummy";
        });
        it("should access direct property", function () {
            var proxyObject = unsafeWindowProxy(dummyWindow);
            assert.equal(proxyObject.name, "dummy");
        });
    });
    context("#set", function () {
        var dummyWindow = {};
        beforeEach(function () {
            cloneInto.called = false;
            createObjectIn.called = false;
            exportFunction.called = false;
        });
        context("when type is object", function () {
            it("should call createObjectIn", function () {
                var proxyObject = unsafeWindowProxy(dummyWindow);
                proxyObject.phantom = {
                    "key": "value"
                };
                assert(cloneInto.called);
                assert(createObjectIn.called);
                assert(!exportFunction.called);
            });
        });
        context("when type is function", function () {
            it("should call exportFunction", function () {
                var proxyObject = unsafeWindowProxy(dummyWindow);
                proxyObject.phantomFn = function () {
                    return "test";
                };
                assert(exportFunction.called);
                assert(createObjectIn.called);
                assert(!cloneInto.called);
            });
        });
        context("when type is primitive", function () {
            it("should call either", function () {
                dummyWindow.actual = "test";
                var proxyObject = unsafeWindowProxy(dummyWindow);
                proxyObject.actual = "hey";
                assert(proxyObject.actual === "hey");

                assert(!exportFunction.called);
                assert(!createObjectIn.called);
                assert(!cloneInto.called);
            });
        });
    });
});