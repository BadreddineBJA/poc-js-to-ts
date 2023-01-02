"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hbs = require("handlebars");
const ClockAPI_1 = require("@prg-cube/clock-configuration-model/lib/code-gen-helpers/ClockAPI");
const index_1 = require("@prg-cube/pinout-model/lib/code-gen/index");
const path = require("path");
// [1]- prepare template:
const template = `
{{#with this}}{{addConfig resource}}{{/with}}
{{#with this}}{{addConfigUC resource}}{{/with}}
{{#with this}}{{addConfigLC resource}}{{/with}}
{{#with this}}{{log "nestedObj" (getNestedObj this "a")}}{{/with}}
{{#with this}}{{log "get_hal_clock_config" (helper_rcc_get_hal_clock_config_object_u5 this.clockDomain)}}{{/with}}
{{#with this}}{{log "get_clock_input" (helper_rcc_get_clock_input this.clockDomain "RTC")}}{{/with}}
`;
// [2]- Prepare data context:
const data = {
    resource: "CRC",
    a: "1st key",
    b: "2nd key",
    c: {
        d: {
            e: {
                f: {
                    g: "",
                    h: "",
                },
            },
        },
    },
    clockDomain: [
        {
            id: "HSI",
            value: 16000000,
            frequency: 16000000,
        },
        {
            id: "HSE",
            value: 6000000,
            frequency: 6000000,
        },
        {
            id: "RTC_Clock_Source",
            value: 48000,
            frequency: 48000,
        },
        {
            id: "LSI",
            value: 32000,
            frequency: 32000,
        },
    ],
};
// [3]- Register helpers:
let filePath = path.join(__dirname, "..\\lib\\fakeHelpers\\index.js");
let fileContent = require(filePath);
let helpersListContent = Object.entries(fileContent);
for (let [key, value] of helpersListContent) {
    hbs.registerHelper(key, value);
}
const templateFunc = hbs.compile(template);
// [4] write the output. 
const output = templateFunc(data);
// [5] Getters access from helpers: 
/**
 * 1. is it possible to get the list of domain getters.
 * 2. is it possible to access the call getters methods from .js helpers.
 * 3. main limitations for getters that depends on the appprojpath.
 */
console.log("value ==> ", output);
console.log('ClockAPI', new ClockAPI_1.ClockAPI("").LoadGetters());
console.log('PinoutAPI', new index_1.PinoutAPI(""));
console.log('New PinoutAPI', new index_1.PinoutAPI("").LoadGetters().pinoutAPI.getHwInstanceSignalsConfig());
//# sourceMappingURL=index.js.map