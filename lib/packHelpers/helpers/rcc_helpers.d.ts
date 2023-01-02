import { ClockConfig, IClockHALConfig, IClockInputResult } from "./interfaces";
export declare function helper_rcc_get_hal_clock_config_object_u5(clock_domain: ClockConfig[]): Partial<IClockHALConfig>;
export declare function helper_rcc_get_clock_input(clock_domain: ClockConfig[], hw_resource: string): IClockInputResult;
