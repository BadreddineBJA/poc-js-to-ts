"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_schema_to_typescript_1 = require("json-schema-to-typescript");
const fs = require("fs/promises");
const path = require("path");
// [1] generate types from parameters.json (schemas):
const packPath = getPackPath();
generateTypesFromSchemas(packPath);
// [2] Usage Examples: 
// System config  
let systemConfig = {};
console.log(systemConfig.blocks?.configs);
// Tim Config
let timConfig = {};
console.log(timConfig.resources);
// gpio config
let gpioConfig = {};
console.log(gpioConfig.blocks?.subcomponents);
console.log(gpioConfig.blocks?.infos);
// crc config
let crcConfig = {};
console.log(crcConfig.resources?.instance);
// [Utils]
function getPackPath() {
    return path.resolve(__dirname, "../..", "STMicroelectronics.STM32U5xx_Drivers.2.0.0-alpha.0.12_latest", ".config");
}
function generateTypesFromSchemas(packPath) {
    fs.readdir(packPath)
        .then((files) => {
        if (files.length > 0) {
            const list = files.filter((el) => el.endsWith("_parameters.json"));
            return list;
        }
    })
        .then((filtered) => {
        filtered?.forEach((name) => {
            const fileName = name;
            const outputName = fileName.split(".")[0].concat(".d.ts");
            (0, json_schema_to_typescript_1.compileFromFile)(path.join(packPath, fileName)).then((ts) => {
                fs.writeFile(path.join(__dirname, "types", outputName), ts);
            });
        });
    })
        .catch((errors) => {
        console.log(errors);
    });
}
//# sourceMappingURL=index.js.map