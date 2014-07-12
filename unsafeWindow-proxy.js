"use strict";
function unsafeWindowProxy(unsafeWin) {
    var handler = {
        get: function (target, name) {
            return target[name];
        },
        set: function (target, name, value) {
            if (typeof value === "object") {
                if (!target.hasOwnProperty(name)) {
                    createObjectIn(unsafeWin, {defineAs: name});
                }
                target[name] = cloneInto(value, unsafeWin);
                return;
            } else if (typeof value === "function") {
                if (!target.hasOwnProperty(name)) {
                    createObjectIn(unsafeWin, {defineAs: name});
                }
                target[name] = exportFunction(value, target);
                return;
            }

            target[name] = value;
        }
    };

    return new Proxy(unsafeWin, handler);
}
