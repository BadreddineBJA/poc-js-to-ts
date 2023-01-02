/**
  ******************************************************************************
  * @file    stm32_hal_os.h
  * @author  MCD Application Team
  * @brief   Header file of STM32 HAL OS: implementation for NO OS.
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
/* Define to prevent recursive inclusion -------------------------------------*/
#ifndef STM32_HAL_OS_H
#define STM32_HAL_OS_H

#ifdef __cplusplus
extern "C" {
#endif

#include "stdint.h"

#define HAL_OS_TIMEOUT_FOREVER 0xFFFFFFFF

typedef enum
{
  HAL_OS_OK      = 0x00,
  HAL_OS_ERROR   = 0x01
} hal_os_status_t;

typedef uint32_t hal_os_semaphore_t;
typedef uint32_t hal_os_mutex_t;

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

#endif /* STM32_HAL_OS_H */
