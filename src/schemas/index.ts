import { compileFromFile } from "json-schema-to-typescript";
import * as fs from "fs/promises";
import * as path from "path";
// generated types
import { Stm32U5XxHalSystemParameters } from "./types/stm32u5xx_hal_system_parameters";
import { Stm32U5XxHalTimParameters } from "./types/stm32u5xx_hal_tim_parameters";
import { Stm32U5XxHalGpioParameters } from "./types/stm32u5xx_hal_gpio_parameters";
import { Stm32U5XxHalCrcParameters } from "./types/stm32u5xx_hal_crc_parameters";

// [1] generate types from parameters.json (schemas):
const packPath = getPackPath();
generateTypesFromSchemas(packPath);

// [2] Usage Examples: 

// System config  
let systemConfig: Stm32U5XxHalSystemParameters = {};
console.log(systemConfig.blocks?.configs);
// Tim Config
let timConfig: Stm32U5XxHalTimParameters = {}
console.log(timConfig.resources);
// gpio config
let gpioConfig: Stm32U5XxHalGpioParameters = {};
console.log(gpioConfig.blocks?.subcomponents);
console.log(gpioConfig.blocks?.infos);
// crc config
let crcConfig: Stm32U5XxHalCrcParameters = {};
console.log(crcConfig.resources?.instance);


// [Utils]
function getPackPath(): string {
  return path.resolve(
    __dirname,
    "../..",
    "STMicroelectronics.STM32U5xx_Drivers.2.0.0-alpha.0.12_latest",
    ".config"
  );
}
function generateTypesFromSchemas(packPath: string) {
  fs.readdir(packPath)
    .then((files: string[]) => {
      if (files.length > 0) {
        const list: string[] = files.filter((el) =>
          el.endsWith("_parameters.json")
        );
        return list;
      }
    })
    .then((filtered?: string[]) => {
      filtered?.forEach((name) => {
        const fileName = name;
        const outputName = fileName.split(".")[0].concat(".d.ts");
        compileFromFile(path.join(packPath, fileName)).then((ts) => {
          fs.writeFile(path.join(__dirname, "types", outputName), ts);
        });
      });
    })
    .catch((errors: Error) => {
      console.log(errors);
    });
}