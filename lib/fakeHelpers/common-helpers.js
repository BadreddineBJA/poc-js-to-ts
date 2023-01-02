"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNestedObj = exports.addConfigLC = exports.addConfigUC = exports.addConfig = void 0;
function addConfig(str) {
    if (str && typeof str === "string") {
        return "_" + str;
    }
    return "";
}
exports.addConfig = addConfig;
function addConfigUC(str) {
    if (str && typeof str === "string") {
        return "_" + str.toUpperCase();
    }
    return "";
}
exports.addConfigUC = addConfigUC;
function addConfigLC(str) {
    if (str && typeof str === "string") {
        return "_" + str.toLowerCase();
    }
    return "";
}
exports.addConfigLC = addConfigLC;
function getNestedObj(config, key) {
    let research = config[key] != undefined ? config[key] : "undefined";
    return {
        code: "0000",
        result: {
            research,
        },
    };
}
exports.getNestedObj = getNestedObj;
//# sourceMappingURL=common-helpers.js.map