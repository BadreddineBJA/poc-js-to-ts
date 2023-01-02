export interface IConfig {
  [key: string]: unknown;
}

export interface IResultOutput {
  result: unknown;
  code: string;
}

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
