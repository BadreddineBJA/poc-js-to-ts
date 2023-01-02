function addConfigLC(str: string) {
  if (str && typeof str === "string") {
    return "_" + str.toLowerCase().replace("-", "_");
  }
  return "";
}

/*
  Brief: return if register callback has been enabled for the module
  Input:
    Settings: global settings set by the user
    module: module to check
  Output='' => 1 or 0
  */
export function helper_common_get_register_callback(
  Settings: any,
  Module: string
) {
  let result = 0;
  let resources = Settings["resources"];
  for (let resource in resources) {
    if (
      resources[resource].hasOwnProperty("componentid") &&
      resources[resource]["componentid"].includes(Module)
    ) {
      if (
        resources[resource].hasOwnProperty("register_callback") &&
        resources[resource]["register_callback"]
      ) {
        result = 1;
        break;
      }
    }
  }
  return result;
}
/*
  Brief: return if dma has been enabled for the following module
  Input:
    Settings: global settings set by the user
    module: module to check
  Output='' => 1 or 0
  */
export function helper_common_get_dma_activation(
  Settings: any,
  Module: string
) {
  let result = 0;
  let resources = Settings["resources"];
  for (let resource in resources) {
    if (
      resources[resource].hasOwnProperty("componentid") &&
      resources[resource]["componentid"].includes("DMA")
    ) {
      if (resources[resource].hasOwnProperty("configs")) {
        let configs = resources[resource]["configs"];
        configs.forEach((config: any) => {
          let json_format = JSON.stringify(config);
          JSON.parse(json_format, (key, value) => {
            if (key == "Request") {
              if (value.includes(Module)) {
                result = 1;
              }
            }
            return value;
          });
        });
      }
    }
  }
  return result;
}

/*
  Brief: Prepare an object will be used by hal_target.h.hbs template
  Input:
    global_ctxt: global context of the project
    ex
    TARGET template global_ctxt: {
        'STMicroelectronics::Device:STM32 HAL Code Gen:UART Init@0.1.0': [ { instanceid: 4, name: 'UART', settings: [Object] } ],
        'STMicroelectronics::Device:STM32 HAL Code Gen:TIM Init@0.1.0': [
            { instanceid: 4, name: 'TIM_CH1', settings: [Object] },
            { instanceid: 5, name: 'TIM_CH2', settings: [Object] }
        ],
        'STMicroelectronics::Utility:Debug:basic trace&Configurable@0.0.2': [ { instanceid: 4, name: 'TRACE', settings: [Object] } ]
    }
  Output=''
{
  component: [
    "CRC",
    "UART",
    "TIM",
  ],
  periphs: [
    {
      resource_inst: "crc_instance0",
      fct_name: "crc_instance0_undefined",
      fct_name_labels: [
        "mx_bring_up_undefined",
      ],
      generated: true,
      default: false,
    },
    {
      resource_inst: "usart1_instance0",
      fct_name: "usart1_instance0_config1",
      fct_name_labels: [
        "mx_bring_up_config1",
      ],
      generated: true,
      default: true,
    },
    {
      resource_inst: "usart1_instance0",
      fct_name: "usart1_instance0_config2",
      fct_name_labels: [
        "mx_bring_up_config2",
      ],
      generated: true,
      default: false,
    },
    {
      resource_inst: "tim1_instance0",
      fct_name: "tim1_instance0_config1",
      fct_name_labels: [
        "mx_bring_up_config1",
      ],
      generated: true,
      default: false,
    },
  ],
  list_resource_hw: [
    {
      hw_resource: "CRC",
      labels: [
        "mx_bring_up",
      ],
    },
    {
      hw_resource: "USART1",
      labels: [
        "mx_bring_up",
      ],
    },
    {
      hw_resource: "TIM1",
      labels: [
        "mx_bring_up",
      ],
    },
  ],
  need_goto_end: true,
}
  */
export function helper_common_get_target_context(
  global_ctxt: any
): TRAGET_CONTEXT {
  console.log(`[INFO] helper_common_get_target_context`);
  let result: TRAGET_CONTEXT = {
    component: [],
    periphs: [],
    list_resource_hw: [],
    need_goto_end: true,
  };
  let temp, length, Cgroup;

  for (const [key, value] of Object.entries(global_ctxt)) {
    if (key != undefined) {
      temp = key.split(":");
      length = temp.length;
      Cgroup = temp[3];
      if (Cgroup == "STM32 HAL Code Gen") {
        temp = temp[length - 1];
        temp = temp.split(" ");
        result["component"].push(temp[0]);
        const instanceList = value as any;
        instanceList.forEach((instance: any) => {
          let instanceid = instance.instanceid;
          let labels: any[] = [];
          if (
            instance.settings.blocks !== undefined &&
            instance.settings.blocks.info !== undefined
          ) {
            let resource = instance.settings.resources.instance.id;
            labels = instance.settings.blocks.info.labels;
            let name_labels: any[] = [];
            labels.forEach((label) => {
              name_labels.push("mx_" + label.toLowerCase().replace("-", "_"));
            });
            if (!result["list_resource_hw"].hasOwnProperty(resource)) {
              let periph = {
                hw_resource: resource,
                labels: name_labels,
              };
              result["list_resource_hw"].push(periph);
            }
            let generated = false;
            if (instance.settings.blocks.info.init_type != "disabled") {
              generated = true;
            }
            let fct_name_labels: any[] = [];
            let fct_name, resource_inst;
            if (instance.settings.blocks.configs !== undefined) {
              instance.settings.blocks.configs.forEach((config: any) => {
                let cfg_name = config["cfg_name"];
                resource_inst =
                  resource.toLowerCase() + "_instance" + instanceid;
                fct_name = resource_inst + addConfigLC(cfg_name);
                labels.forEach((label) => {
                  let fct_name_label;
                  fct_name_label =
                    "mx" + addConfigLC(label) + addConfigLC(cfg_name);
                  fct_name_labels.push(fct_name_label);
                });
                let default_called = false;
                if (config.hasOwnProperty("default")) {
                  default_called = config["default"];
                  if (default_called) {
                    result["need_goto_end"] = true;
                  }
                }
                let periph = {
                  resource_inst: resource_inst,
                  fct_name: fct_name,
                  fct_name_labels: fct_name_labels,
                  generated: generated,
                  default: true,
                };
                result["periphs"].push(periph);
              });
            } else {
              let periph = {
                resource_inst: resource.toLowerCase() + "_instancex",
                fct_name: resource.toLowerCase() + "_instancex_cfgy",
                fct_name_labels: ["mx_labely"],
              };
              result["periphs"].push(periph);
              console.log(
                `[WARNING] helper_common_get_target_context: no configs block`
              );
            }
          } else {
            let resource = "undefined";
            if (
              instance.settings.blocks !== undefined &&
              instance.settings.blocks.info !== undefined
            ) {
              resource = instance.settings.resources.instance.id;
            }
            let periph = {
              resource_inst: resource.toLowerCase() + "_instancex",
              fct_name: resource.toLowerCase() + "_instancex_cfgy",
              fct_name_labels: ["mx_labely"],
              generated: false,
              default: false,
            };
            let hw = {
              hw_resource: resource,
              labels: ["mx_labely"],
            };
            result["list_resource_hw"].push(hw);
            result["periphs"].push(periph);
            console.log(
              `[WARNING] helper_common_get_target_context: no blocks or info block`
            );
          }
        });
      }
    }
  }
  return result;
}

/*
  Brief: Function to allow the call of the partial
  Input:
    component: SW component which allow to call the partial (ex UART will called UART_partial.hbs)
  Output='PPP' (ex 'UART'   )

  */
export function helper_common_get_partial(component: string) {
  console.log(`[INFO] helper_common_get_partial`);
  return component;
}

export function helper_common_get_resource_ctxt(
  global_ctxt: any,
  component: string
) {
  console.log(`[INFO] helper_common_get_resource_ctxt`);
  let result = undefined;
  let temp, length, Cgroup;
  for (const [key, value] of Object.entries(global_ctxt)) {
    if (key != undefined) {
      temp = key.split(":");
      length = temp.length;
      Cgroup = temp[3];
      if (Cgroup == "STM32 HAL Code Gen") {
        temp = temp[length - 1];
        temp = temp.split(" ");
        if (temp[0] == component) {
          result = value;
        }
      }
    }
  }
  return result;
}

export interface TRAGET_CONTEXT {
  component: any[];
  periphs: any[];
  list_resource_hw: any[];
  need_goto_end: boolean;
  [key: string]: any;
}
