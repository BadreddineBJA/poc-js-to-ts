import { IConfig, IResultOutput } from "./interfaces";
export declare function addConfig(str: string): string;
export declare function addConfigUC(str: string): string;
export declare function addConfigLC(str: string): string;
export declare function getNestedObj(config: IConfig, key: string): IResultOutput;
