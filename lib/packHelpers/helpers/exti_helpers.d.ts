import { GPIOConfig } from "./interfaces";
export interface GPIO_RESULT {
    found_exti: boolean;
    exti: any[];
    label_exti: any[];
}
export declare function helper_exti_get_gpio(Gpio_Config: GPIOConfig): GPIO_RESULT;
export interface CONFIG_RESULT {
    found_exti: boolean;
    exti_list: any[];
}
export interface LIST_EXTI {
    port: string;
    line: string;
    trigger: string;
    [key: string]: any;
}
export declare function helper_exti_get_config(gpio_list: any): {};
