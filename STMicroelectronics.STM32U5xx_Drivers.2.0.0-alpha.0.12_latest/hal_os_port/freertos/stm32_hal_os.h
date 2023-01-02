/**
  ******************************************************************************
  * @file    stm32_hal_os.h
  * @author  MCD Application Team
  * @brief   Header file of STM32 HAL OS: implementation for FreeRTOS.
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2022 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
#ifndef STM32_HAL_OS
#define STM32_HAL_OS

#ifdef __cplusplus
extern "C" {
#endif

#include "freertos.h"
#include "semphr.h"

#define HAL_OS_TIMEOUT_FOREVER portMAX_DELAY

typedef enum
{
  HAL_OS_OK      = 0x00,
  HAL_OS_ERROR   = 0x01
} hal_os_status_t;

typedef SemaphoreHandle_t hal_os_semaphore_t;
typedef SemaphoreHandle_t hal_os_mutex_t;


hal_os_status_t HAL_OS_SemaphoreCreate(hal_os_semaphore_t  *p_sem);
hal_os_status_t HAL_OS_SemaphoreTake(hal_os_semaphore_t *p_sem, uint32_t timeout);
hal_os_status_t HAL_OS_SemaphoreRelease(hal_os_semaphore_t *p_sem);
hal_os_status_t HAL_OS_SemaphoreDelete(hal_os_semaphore_t *p_sem);

hal_os_status_t HAL_OS_MutexCreate(hal_os_mutex_t  *p_mutex);
hal_os_status_t HAL_OS_MutexTake(hal_os_mutex_t *p_mutex, uint32_t timeout);
hal_os_status_t HAL_OS_MutexRelease(hal_os_mutex_t *p_mutex);
hal_os_status_t HAL_OS_MutexDelete(hal_os_mutex_t *p_mutex);

#ifdef __cplusplus
}
#endif
#endif /* STM32_HAL_OS */
