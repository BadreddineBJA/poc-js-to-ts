export interface IMappingObject {
  component: string;
  resource_type: RESOURCE_TYPE;
  resource: string;
  template: string;
  output: string;
}

export enum RESOURCE_TYPE {
  COMPONENT_ENTRY = "COMPONENT_ENTRY" /* indicate we handle a "standard" component with no hardware instance */,
  HW_INSTANCE = "HW_INSTANCE" /* indicate we group by hardware instance */,
  SW_INSTANCE = "SW_INSTANCE" /* indicate we group by software instance (TBD) */,
}

/* To create the data file used as data map to populate the gpdsc */
export interface GeneratedFile {
  gen_file: string /* file name */;
  category: string /* file category as per OpenCMSIS spec */;
}

export interface IGenFilesList {
  component: string;
  files: GeneratedFile[];
}

// indicates if the context is 'None' (no security), 'Secure' (secure context), 'Non-secure' (non-secure context)
export enum CONTEXT_SECURITY {
  NONE = "NONE",
  SECURE = "SECURE",
  NON_SECURE = "NON_SECURE",
}
