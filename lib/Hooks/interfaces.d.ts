export interface IMappingObject {
    component: string;
    resource_type: RESOURCE_TYPE;
    resource: string;
    template: string;
    output: string;
}
export declare enum RESOURCE_TYPE {
    COMPONENT_ENTRY = "COMPONENT_ENTRY",
    HW_INSTANCE = "HW_INSTANCE",
    SW_INSTANCE = "SW_INSTANCE"
}
export interface GeneratedFile {
    gen_file: string;
    category: string;
}
export interface IGenFilesList {
    component: string;
    files: GeneratedFile[];
}
export declare enum CONTEXT_SECURITY {
    NONE = "NONE",
    SECURE = "SECURE",
    NON_SECURE = "NON_SECURE"
}
