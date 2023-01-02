export interface ClockConfig {
  id: string;
  value: number;
  frequency: number;
}

export interface IClockHALConfig {
  HSI: boolean;
  MSI: boolean;
  PLL: boolean;
  PLLRGE: string;
  PLLFRACN: number;
  PLLMBOOST: string;
  OscillatorType: string;
  [key: string]: any; // for an extensible object
}

export interface IClockInputResult {
  found: boolean;
  clockselection: string;
  input: string;
}

/** GPIO Config */
export interface Infos {
  generated: boolean;
  label: string;
}

export interface Gpio {
  name: string;
  port: string;
  pin: number;
  low_power: boolean;
}

export interface GpioList {
  gpio: Gpio;
  label: string;
}

export interface GPIOInitTypeDef {
  Mode: string;
  Pull: string;
  Speed: string;
}

export interface GpioList2 {
  GPIO_InitTypeDef: GPIOInitTypeDef;
  exti: boolean;
  exti_trigger: string;
  [key: string]: any;
}

export interface Config {
  cfg_name: string;
  gpio_list: GpioList2[];
}

export interface Group {
  name: string;
  infos: Infos;
  gpio_list: GpioList[];
  configs: Config[];
}

export interface GPIOConfig {
  id: string;
  group: Group[];
  resource: string;
}
