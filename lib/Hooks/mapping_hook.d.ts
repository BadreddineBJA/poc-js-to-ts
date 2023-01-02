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
import { IMappingObject } from "./interfaces";
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
export declare function hw_grouping_hook(component_id: string, component_templates: string[], get_hw_instances: any, get_sw_instances: any, cfg_data: unknown, secure_ctxt: string, genfileslist_folder: string, debug_print: any): IMappingObject[];
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
export declare function sw_grouping_hook(component_id: string, component_templates: string[], get_hw_instances: any, get_sw_instances: any, cfg_data: unknown, secure_ctxt: string, genfileslist_folder: string, debug_print: any): {};
