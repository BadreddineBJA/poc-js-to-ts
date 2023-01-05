import { IConfig, IResultOutput } from "./interfaces";

  export function addConfig(str: string) {
    if (str && typeof str === "string") {
      return "_" + str;
    }
    return "";
  }
  
  export function addConfigUC(str: string) {
    if (str && typeof str === "string") {
      return "_" + str.toUpperCase();
    }
    return "";
  }
  
  export function addConfigLC(str: string) {
    if (str && typeof str === "string") {
      return "_" + str.toLowerCase();
    }
    return "";
  }
  
  export function getNestedObj(config: IConfig, key: string): IResultOutput {
    let research: unknown = config[key] != undefined ? config[key] : "undefined";
    return {
      code: "0000",
      result: {
        research,
      },
    };
  }