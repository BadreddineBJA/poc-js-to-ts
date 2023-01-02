/**
  ******************************************************************************
  * @file    stm32_hal_os.c
  * @author  MCD Application Team
  * @brief   STM32 HAL OS abstraction: implementation for MY OS.
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

#include "stm32_hal_os.h"

hal_os_status_t HAL_OS_SemaphoreCreate(hal_os_semaphore_t *p_sem)
{
  return HAL_OS_ERROR;

}

hal_os_status_t HAL_OS_SemaphoreTake(hal_os_semaphore_t *p_sem, uint32_t timeout)
{
  return HAL_OS_ERROR;
}
hal_os_status_t HAL_OS_SemaphoreRelease(hal_os_semaphore_t *p_sem)
{
  return HAL_OS_ERROR;
}

hal_os_status_t HAL_OS_SemaphoreDelete(hal_os_semaphore_t *p_sem)
{
  return HAL_OS_ERROR;
}

hal_os_status_t HAL_OS_MutexCreate(hal_os_mutex_t *p_mutex)
{
  return HAL_OS_ERROR;

}

hal_os_status_t HAL_OS_MutexTake(hal_os_mutex_t *p_mutex, uint32_t timeout)
{
  return HAL_OS_ERROR;
}

hal_os_status_t HAL_OS_MutexRelease(hal_os_mutex_t *p_mutex)
{
  return HAL_OS_ERROR;
}

hal_os_status_t HAL_OS_MutexDelete(hal_os_mutex_t *p_mutex)
{
  return HAL_OS_ERROR;
}