"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTEXT_SECURITY = exports.RESOURCE_TYPE = void 0;
var RESOURCE_TYPE;
(function (RESOURCE_TYPE) {
    RESOURCE_TYPE["COMPONENT_ENTRY"] = "COMPONENT_ENTRY"; /* indicate we handle a "standard" component with no hardware instance */
    RESOURCE_TYPE["HW_INSTANCE"] = "HW_INSTANCE"; /* indicate we group by hardware instance */
    RESOURCE_TYPE["SW_INSTANCE"] = "SW_INSTANCE"; /* indicate we group by software instance (TBD) */
})(RESOURCE_TYPE = exports.RESOURCE_TYPE || (exports.RESOURCE_TYPE = {}));
// indicates if the context is 'None' (no security), 'Secure' (secure context), 'Non-secure' (non-secure context)
var CONTEXT_SECURITY;
(function (CONTEXT_SECURITY) {
    CONTEXT_SECURITY["NONE"] = "NONE";
    CONTEXT_SECURITY["SECURE"] = "SECURE";
    CONTEXT_SECURITY["NON_SECURE"] = "NON_SECURE";
})(CONTEXT_SECURITY = exports.CONTEXT_SECURITY || (exports.CONTEXT_SECURITY = {}));
//# sourceMappingURL=interfaces.js.map