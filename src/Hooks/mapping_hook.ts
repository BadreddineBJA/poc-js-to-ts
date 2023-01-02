/******************** (C) COPYRIGHT 2022 STMicroelectronics.******************
 * File    mapping_hook.js
 * Author  MCD Application Team
 * This file implements functions providing the mapping logic to generate code.
 ******************************************************************************
 *
 * Copyright (c) 2022 STMicroelectronics. All rights reserved.
 *
 * This software is licensed under terms that can be found in the LICENSE file
 * in the root directory of this software component.
 * If no LICENSE file comes with this software, it is provided AS-IS.
 *
 ******************************************************************************/

import { GeneratedFile, IGenFilesList, IMappingObject, RESOURCE_TYPE } from "./interfaces";
/* The file system is required to store the list of files to be generated */
import * as fs from "fs";
/**
 * Nominal hook as per embedded software architecture
 * Several SW instances can configure the same HW instance,
 * but the configuration code must end-up in the same stm32_hwpppX.c file
 *
 * We expect the codegen service to call this hook per component.
 *
 * @param {string}   component_id         identifier of the component being processed by the codegen service
 * @param {array}    component_templates  array of templates for component_id
 * @param {function} get_hw_instances     function returning the hardware instances (from the configuration data model) associated to the component id
 * @param {function} get_sw_instances     function returning the software instances (from the configuration data model) associated to the component id
 * @param {object}   cfg_data             configuration data for the current software project
 * @param {string}   secure_ctxt          indicates if the context is 'None' (no security), 'Secure' (secure context), 'Non-secure' (non-secure context)
 * @param {string}   genfileslist_folder  where to write the list of files to be generated
 * @param {function} debug_print          function to evacuate logs
 * @return object describing the mapping rules to be applied, empty object if nothing to process
 */
export function hw_grouping_hook (
  component_id: string,
  component_templates: string[],
  get_hw_instances: any,
  get_sw_instances: any,
  cfg_data: unknown,
  secure_ctxt: string,
  genfileslist_folder: string,
  debug_print: any
): IMappingObject[] {
  const mapping_object: IMappingObject[] = []; /* the object to return the mapping rules */
  let my_hw_instances; /* array of hardware instances associated to component_id */
  let debug = true; /* decide if we debug                                     */
  const genfiles_list: IGenFilesList = {
    component: "",
    files: [],
  };  /* the object storing the list of files to be generated   */
  const genfiles_array: GeneratedFile[] = [];
  /* Disable the debug if no print function is provided (undefined or null) */
  if (debug_print == null) {
    debug = false;
  }

  /*
   * Parameters check: check null or undefined (so use ==)
   */
  if (
    component_id == null ||
    component_templates == null ||
    get_hw_instances == null ||
    cfg_data == null ||
    secure_ctxt == null ||
    genfileslist_folder == null
  ) {
    if (debug === true) {
      debug_print(
        "[ERROR] mapping_hooks.hw_grouping_hook: incorrect parameter(s)"
      );
    }

    /* exit now */
    return mapping_object;
  } else {
    if (debug === true) {
      debug_print("[INFO] mapping_hooks.hw_grouping_hook: starting");
    }
  }

  /* Prepare genfiles_list : add the component id */
  genfiles_list["component"] = component_id;

  /*
   * Retrieve all hardware instances associated to component_id in the configuration data
   */
  my_hw_instances = get_hw_instances(component_id, cfg_data);

  if (my_hw_instances.length === 0) {
    /* Return an empty object */
    if (debug === true) {
      debug_print("[WARNING] No HW instance found for: " + component_id);
    }
  } else {
    /*
     * All hw instances code must end-up in the same file
     */
    let array_index = 0;
    for (const hw_instance of my_hw_instances) {
      if (debug === true) {
        debug_print("[INFO] Processing hw_instance: " + hw_instance);
      }
      /* Apply it for all templates of this component (.c and .h) */
      for (const template of component_templates) {
        /*
         * Compute the proper output filename
         */
        let output_filename;
        let fragments = template.split(".");
        let extension = fragments[1]  /* save the extension: .c or .h */

        if (debug === true) {
          debug_print("\t[INFO] Processing template: " + template);
        }

        /* Apply a specific processing for templates starting by stm32_ (drivers) */
        const regex = /^stm32_/;
        let driver_template = regex.exec(template);

        if (driver_template === null) {
          /* This is not a driver template : probably abnormal for this hook */
          if (debug === true) {
            debug_print("\t[WARNING] not a driver template: " + template);
          }
          output_filename = template.replace("_template", "");
          output_filename = output_filename.replace(".hbs", "");
        } else {
          /*driver template:  determine the secure context and update the filename */
          if (secure_ctxt === "none") {
            output_filename =
              "stm32_" + hw_instance.toLowerCase() + "." + extension;
          } else if (secure_ctxt == "Secure") {
            output_filename =
              "stm32_" + hw_instance.toLowerCase() + "_s." + extension;
          } else {
            /* assume Non-secure */
            output_filename =
              "stm32_" + hw_instance.toLowerCase() + "_ns." + extension;
          }
        }

        if (debug === true) {
          debug_print("\t[INFO] output_filename: " + output_filename);
        }

        /*
         * Update the mapping object
         */
        mapping_object[array_index] = {
          component: component_id,
          resource_type: RESOURCE_TYPE.HW_INSTANCE /* indicate we group by hardware instance */,
          resource: hw_instance.toLowerCase(),
          template: template,
          output: output_filename,
        };

        /*
         * Store the output file
         */
        /* TODO : update it when we have the required info in cgen.yml */
        let category = "other";
        if (extension === "c") {
          category = "source";
        } else if (extension === "h") {
          category = "header";
        } else {
          category =
            "other"; /* TODO : update it when we have the required info in cgen.yml */
        }

        genfiles_array[array_index] = {
          gen_file: output_filename,
          category: category,
        };

        /* next array index */
        array_index++;
      } /* end loop on templates */
    } /* end loop on hardware instances */
  }

  /* Update the JSON object stroing the list of files to be generated */
  genfiles_list["files"] = genfiles_array;

  /*
   * Store the list of files to be generated in a file.
   * This file will be the input to generate the .gpdsc file
   */
  let json_content = JSON.stringify(genfiles_list);
  let component_words = component_id.split(":");
  let file_name =
    "\\" +
    component_words[2] +
    "_" +
    component_words[3] +
    "_" +
    component_words[4];

  if (debug === true) {
    debug_print("[INFO] Input object for .gpdsc: " + json_content);
  }

  if (!fs.existsSync(genfileslist_folder)) {
    fs.mkdirSync(genfileslist_folder);
  }
  fs.writeFile(
    genfileslist_folder + file_name + ".json",
    json_content,
    "utf8",
    function (err) {
      if (err) {
        if (debug === true) {
          debug_print(
            `[ERROR] mapping_hooks.hw_grouping_hook: an error occured while writing JSON Object to File.${err}`
          );
        }
      } else {
        if (debug === true) {
          debug_print(
            "[INFO] mapping_hooks.hw_grouping_hook: " +
              genfileslist_folder +
              file_name +
              ".json" +
              " written to disk."
          );
        }
      }
    }
  );

  if (debug === true) {
    const str = JSON.stringify(mapping_object);
    debug_print("[Object] \n" + str);
  }

  if (debug === true) {
    debug_print("[INFO] mapping_hooks.hw_grouping_hook: returning");
  }

  /* Return the mapping object */
  return mapping_object;
};

/**
 * Alternate hook to prototype the possibility to provide several hooks.
 * Several SW instances can configure the same HW instance,
 * and the configuration code must end-up in different stm32_swpppX.c file
 *
 * We expect the codegen service to call this hook per component.
 *
 * @param {string}   component_id         identifier of the component being processed by the codegen service
 * @param {array}    component_templates  array of templates for component_id
 * @param {function} get_hw_instances     function returning the hardware instances (from the configuration data model) associated to the component id
 * @param {function} get_sw_instances     function returning the software instances (from the configuration data model) associated to the component id
 * @param {object}   cfg_data             configuration data for the current software project
 * @param {string}   secure_ctxt          indicates if the context is 'None' (no security), 'Secure' (secure context), 'Non-secure' (non-secure context)
 * @param {string}   genfileslist_folder  where to write the list of files to be generated
 * @param {function} debug_print          function to evacuate logs
 * @return object describing the mapping rules to be applied, empty object if nothing to process
 */

export function sw_grouping_hook (
  component_id: string,
  component_templates: string[],
  get_hw_instances: any,
  get_sw_instances: any,
  cfg_data: unknown,
  secure_ctxt: string,
  genfileslist_folder: string,
  debug_print: any
) {
  let mapping_object = {}; /* the object to return the mapping rules */
  let debug = true; /* decide if we debug                                     */

  /* Disable the debug if no print function is provided (undefined or null) */
  if (debug_print == null) {
    debug = false;
  }

  /*
   * Parameters check: check null or undefined (so use ==)
   */
  if (
    component_id == null ||
    component_templates == null ||
    get_sw_instances == null ||
    cfg_data == null ||
    secure_ctxt == null ||
    genfileslist_folder == null
  ) {
    if (debug === true) {
      debug_print(
        "[ERROR] mapping_hooks.sw_grouping_hook: incorrect parameter(s)"
      );
    }

    /* exit now */
    return mapping_object;
  } else {
    if (debug === true) {
      debug_print("[INFO] mapping_hooks.sw_grouping_hook: starting");
      debug_print("[WARN] NOT YET IMPLEMENTED");
    }
    /* exit now */
    return mapping_object;
  }
};

//Invocation Example
//hw_grouping_hook("component_id", [], undefined ,undefined, {}, "", "", console.log);