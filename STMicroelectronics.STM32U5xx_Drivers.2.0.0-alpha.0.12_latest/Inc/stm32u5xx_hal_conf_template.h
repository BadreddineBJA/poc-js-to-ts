/**
  ******************************************************************************
  * @file    stm32u5xx_hal_conf_template.h
  * @author  MCD Application Team
  * @brief   HAL configuration template file.
  *          This file should be copied to the application folder and renamed
  *          to stm32u5xx_hal_conf.h.
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2021 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */

/* Define to prevent recursive inclusion -------------------------------------*/
#ifndef STM32U5xx_HAL_CONF_H
#define STM32U5xx_HAL_CONF_H

#ifdef __cplusplus
extern "C" {
#endif

/* Exported types ------------------------------------------------------------*/
/* Exported constants --------------------------------------------------------*/

/* ########################## Module Selection ############################## */
/**
  * @brief This is the list of modules to be used in the HAL driver
  */
#define USE_HAL_MODULE            1U
#define USE_HAL_ADC_MODULE        1U
#define USE_HAL_COMP_MODULE       1U
#define USE_HAL_CORDIC_MODULE     1U
#define USE_HAL_CORTEX_MODULE     1U
#define USE_HAL_CRC_MODULE        1U
#define USE_HAL_CRYP_MODULE       1U
#define USE_HAL_DAC_MODULE        1U
#define USE_HAL_DCACHE_MODULE     1U
#define USE_HAL_DCMI_MODULE       1U
#define USE_HAL_DMA_MODULE        1U
#define USE_HAL_DMA2D_MODULE      1U
#define USE_HAL_DSI_MODULE        1U
#define USE_HAL_EXTI_MODULE       1U
#define USE_HAL_FDCAN_MODULE      1U
#define USE_HAL_FLASH_MODULE      1U
#define USE_HAL_FMAC_MODULE       1U
#define USE_HAL_GFXMMU_MODULE     1U
#define USE_HAL_GPIO_MODULE       1U
#define USE_HAL_GPU2D_MODULE      1U
#define USE_HAL_GTZC_MODULE       1U
#define USE_HAL_HASH_MODULE       1U
#define USE_HAL_HCD_MODULE        1U
#define USE_HAL_I2C_MODULE        1U
#define USE_HAL_ICACHE_MODULE     1U
#define USE_HAL_IRDA_MODULE       1U
#define USE_HAL_IWDG_MODULE       1U
#define USE_HAL_LPTIM_MODULE      1U
#define USE_HAL_LTDC_MODULE       1U
#define USE_HAL_MDF_MODULE        1U
#define USE_HAL_MMC_MODULE        1U
#define USE_HAL_NAND_MODULE       1U
#define USE_HAL_NOR_MODULE        1U
#define USE_HAL_OPAMP_MODULE      1U
#define USE_HAL_OSPI_MODULE       1U
#define USE_HAL_OTFDEC_MODULE     1U
#define USE_HAL_PCD_MODULE        1U
#define USE_HAL_PKA_MODULE        1U
#define USE_HAL_PSSI_MODULE       1U
#define USE_HAL_PWR_MODULE        1U
#define USE_HAL_RAMCFG_MODULE     1U
#define USE_HAL_RCC_MODULE        1U
#define USE_HAL_RNG_MODULE        1U
#define USE_HAL_RTC_MODULE        1U
#define USE_HAL_SAI_MODULE        1U
#define USE_HAL_SD_MODULE         1U
#define USE_HAL_SMARTCARD_MODULE  1U
#define USE_HAL_SMBUS_MODULE      1U
#define USE_HAL_SPI_MODULE        1U
#define USE_HAL_SRAM_MODULE       1U
#define USE_HAL_TIM_MODULE        1U
#define USE_HAL_TSC_MODULE        1U
#define USE_HAL_UART_MODULE       1U
#define USE_HAL_USART_MODULE      1U
#define USE_HAL_WWDG_MODULE       1U
#define USE_HAL_XSPI_MODULE       1U

/* Tip: To avoid modifying this file each time you need to use different HSE,
   ===  you can define the HSE value in your toolchain compiler preprocessor. */

/* ########################### System Configuration ######################### */
/**
  * @brief This is the HAL system configuration section
  */
#define  VDD_VALUE                    3300UL /*!< Value of VDD in mv */
#define  TICK_INT_PRIORITY            ((1UL<<__NVIC_PRIO_BITS) - 1UL)  /*!< tick interrupt priority (lowest by default) */
#define  PREFETCH_ENABLE              1U               /*!< Enable prefetch */

/* ########################## HAL OS configuration ########################## */
/**
  * @brief Used by the HAL PPP Acquire/Release APIs when the define USE_HAL_MUTEX is set to 1
  */
#define USE_HAL_MUTEX                 0U

/* ########################## Assert Selection ############################## */
/**
  * @brief Enable or disable the "ASSERT_DBG_PARAM" macro in the HAL drivers code
  */
#define USE_ASSERT_DBG_STATE          0U

/* ########################## HAL API parameters check  ##################### */
/**
  * @brief Run time parameter check activation
  */
#define USE_HAL_CHECK_PARAM           1U

/* ########################## State transition   ############################ */
/**
  * @brief Enable protection of state transition in thread safe
  */
#define USE_HAL_CHECK_PROCESS_STATE   1U

/* ################## Register callback feature configuration ############### */
/**
  * @brief Set below the peripheral configuration  to "1U" to add the support
  *        of HAL callback registration/unregistration feature for the HAL
  *        driver(s). This allows user application to provide specific callback
  *        functions thanks to HAL_PPP_RegisterCallback() rather than overwriting
  *        the default weak callback functions (see each stm32u5xx_hal_ppp.h file
  *        for possible callback identifiers defined in HAL_PPP_CallbackIDTypeDef
  *        for each PPP peripheral).
  */
#define  USE_HAL_ADC_REGISTER_CALLBACKS        0U /* ADC register callback disabled       */
#define  USE_HAL_COMP_REGISTER_CALLBACKS       0U /* COMP register callback disabled      */
#define  USE_HAL_CORDIC_REGISTER_CALLBACKS     0U /* CORDIC register callback disabled    */
#define  USE_HAL_CRYP_REGISTER_CALLBACKS       0U /* CRYP register callback disabled      */
#define  USE_HAL_DAC_REGISTER_CALLBACKS        0U /* DAC register callback disabled       */
#define  USE_HAL_DCMI_REGISTER_CALLBACKS       0U /* DCMI register callback disabled      */
#define  USE_HAL_DMA2D_REGISTER_CALLBACKS      0U /* DMA2D register callback disabled     */
#define  USE_HAL_DSI_REGISTER_CALLBACKS        0U /* DSI register callback disabled       */
#define  USE_HAL_ETH_REGISTER_CALLBACKS        0U /* ETH register callback disabled       */
#define  USE_HAL_FDCAN_REGISTER_CALLBACKS      0U /* FDCAN register callback disabled     */
#define  USE_HAL_FMAC_REGISTER_CALLBACKS       0U /* FMAC register callback disabled      */
#define  USE_HAL_GFXMMU_REGISTER_CALLBACKS     0U /* GFXMMU register callback disabled    */
#define  USE_HAL_GPU2D_REGISTER_CALLBACKS      0U /* GPU2D register callback disabled     */
#define  USE_HAL_HASH_REGISTER_CALLBACKS       0U /* HASH register callback disabled      */
#define  USE_HAL_HCD_REGISTER_CALLBACKS        0U /* HCD register callback disabled       */
#define  USE_HAL_I2C_REGISTER_CALLBACKS        0U /* I2C register callback disabled       */
#define  USE_HAL_IWDG_REGISTER_CALLBACKS       0U /* IWDG register callback disabled      */
#define  USE_HAL_IRDA_REGISTER_CALLBACKS       0U /* IRDA register callback disabled      */
#define  USE_HAL_LPTIM_REGISTER_CALLBACKS      0U /* LPTIM register callback disabled     */
#define  USE_HAL_LTDC_REGISTER_CALLBACKS       0U /* LTDC register callback disabled      */
#define  USE_HAL_MDF_REGISTER_CALLBACKS        0U /* MDF register callback disabled       */
#define  USE_HAL_MMC_REGISTER_CALLBACKS        0U /* MMC register callback disabled       */
#define  USE_HAL_NAND_REGISTER_CALLBACKS       0U /* NAND register callback disabled      */
#define  USE_HAL_NOR_REGISTER_CALLBACKS        0U /* NOR register callback disabled       */
#define  USE_HAL_OPAMP_REGISTER_CALLBACKS      0U /* MDIO register callback disabled      */
#define  USE_HAL_OTFDEC_REGISTER_CALLBACKS     0U /* OTFDEC register callback disabled    */
#define  USE_HAL_PCD_REGISTER_CALLBACKS        0U /* PCD register callback disabled       */
#define  USE_HAL_PKA_REGISTER_CALLBACKS        0U /* PKA register callback disabled       */
#define  USE_HAL_RAMCFG_REGISTER_CALLBACKS     0U /* RAMCFG register callback disabled    */
#define  USE_HAL_RNG_REGISTER_CALLBACKS        0U /* RNG register callback disabled       */
#define  USE_HAL_RTC_REGISTER_CALLBACKS        0U /* RTC register callback disabled       */
#define  USE_HAL_SAI_REGISTER_CALLBACKS        0U /* SAI register callback disabled       */
#define  USE_HAL_SD_REGISTER_CALLBACKS         0U /* SD register callback disabled        */
#define  USE_HAL_SDRAM_REGISTER_CALLBACKS      0U /* SDRAM register callback disabled     */
#define  USE_HAL_SMARTCARD_REGISTER_CALLBACKS  0U /* SMARTCARD register callback disabled */
#define  USE_HAL_SMBUS_REGISTER_CALLBACKS      0U /* SMBUS register callback disabled     */
#define  USE_HAL_SPI_REGISTER_CALLBACKS        0U /* SPI register callback disabled       */
#define  USE_HAL_SRAM_REGISTER_CALLBACKS       0U /* SRAM register callback disabled      */
#define  USE_HAL_TIM_REGISTER_CALLBACKS        0U /* TIM register callback disabled       */
#define  USE_HAL_TSC_REGISTER_CALLBACKS        0U /* TSC register callback disabled       */
#define  USE_HAL_UART_REGISTER_CALLBACKS       0U /* UART register callback disabled      */
#define  USE_HAL_USART_REGISTER_CALLBACKS      0U /* USART register callback disabled     */
#define  USE_HAL_WWDG_REGISTER_CALLBACKS       0U /* WWDG register callback disabled      */
#define  USE_HAL_XSPI_REGISTER_CALLBACKS       0U /* XSPI register callback disabled      */


/* ########################## DMA Module Services Selection ############################# */
/**
  * @brief This is the list of modules that uses HAL DMA services
  */
#define USE_HAL_ADC_DMA       0U
#define USE_HAL_CORDIC_DMA    0U
#define USE_HAL_CRYP_DMA      0U
#define USE_HAL_DAC_DMA       0U
#define USE_HAL_DCMI_DMA      0U
#define USE_HAL_FMAC_DMA      0U
#define USE_HAL_HASH_DMA      0U
#define USE_HAL_I2C_DMA       0U
#define USE_HAL_IRDA_DMA      0U
#define USE_HAL_LPTIM_DMA     0U
#define USE_HAL_MDF_DMA       0U
#define USE_HAL_OSPI_DMA      0U
#define USE_HAL_PSSI_DMA      0U
#define USE_HAL_SAI_DMA       0U
#define USE_HAL_SMARTCARD_DMA 0U
#define USE_HAL_SPI_DMA       0U
#define USE_HAL_SRAM_DMA      0U
#define USE_HAL_TIM_DMA       0U
#define USE_HAL_UART_DMA      0U
#define USE_HAL_USART_DMA     0U
#define USE_HAL_XSPI_DMA      0U

/* ################## SPI peripheral configuration ########################## */

/* CRC FEATURE: Use to activate CRC feature inside HAL SPI Driver
 * Activated: CRC code is present inside driver
 * Deactivated: CRC code cleaned from driver
 */
#define USE_SPI_CRC                   1U

/* ################## SDMMC peripheral configuration ######################### */

#define USE_SD_TRANSCEIVER            0U

#ifdef __cplusplus
}
#endif

#endif /* STM32U5xx_HAL_CONF_H */
