export declare function helper_common_get_register_callback(Settings: any, Module: string): number;
export declare function helper_common_get_dma_activation(Settings: any, Module: string): number;
export declare function helper_common_get_target_context(global_ctxt: any): TRAGET_CONTEXT;
export declare function helper_common_get_partial(component: string): string;
export declare function helper_common_get_resource_ctxt(global_ctxt: any, component: string): unknown;
export interface TRAGET_CONTEXT {
    component: any[];
    periphs: any[];
    list_resource_hw: any[];
    need_goto_end: boolean;
    [key: string]: any;
}
