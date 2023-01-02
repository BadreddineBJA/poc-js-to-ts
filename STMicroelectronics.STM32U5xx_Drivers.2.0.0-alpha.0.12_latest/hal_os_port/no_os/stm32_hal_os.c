/**
  ******************************************************************************
  * @file    stm32_hal_os.c
  * @author  MCD Application Team
  * @brief   STM32 HAL OS abstraction: implementation for NO OS.
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

#define IS_IRQ_MODE()             (__get_IPSR() != 0U)
#define IS_IRQ()                  IS_IRQ_MODE()

/* Semaphore APIs */
hal_os_status_t HAL_OS_SemaphoreCreate(hal_os_semaphore_t *p_sem)
{
  *p_sem = 0;

  return HAL_OS_OK;
}

hal_os_status_t HAL_OS_SemaphoreTake(hal_os_semaphore_t *p_sem, uint32_t timeout)
{
  hal_os_status_t status = HAL_OS_ERROR;

  /* Get tick */
  uint32_t tickstart = HAL_GetTick();

  uint32_t time_over = 0;

  if (IS_IRQ() && timeout != 0)
  {
    return status;
  }
  else
  {
    do
    {
      /* Check if the lock is taken by a different thread */
      if (__LDREXW(p_sem) == 0)
      {
        /* Attempt to take the lock */
        if (__STREXW(1, p_sem) == 0)
        {
          status =  HAL_OS_OK;
        }
      }

      if (timeout != HAL_OS_TIMEOUT_FOREVER)
      {
        if (((HAL_GetTick() - tickstart) > timeout) || (timeout == 0U))
        {
          time_over = 1;
        }
      }

    } while ((time_over == 0) && (status != HAL_OS_OK));
  }

  /* Do not start any other memory access until memory barrier is complete */
  __DMB();

  return status;
}


hal_os_status_t HAL_OS_SemaphoreRelease(hal_os_semaphore_t *p_sem)
{
  /* Ensure memory operations complete before releasing p_sem*/
  __DMB();
  *p_sem = 0;

  return HAL_OS_OK;
}

hal_os_status_t HAL_OS_SemaphoreDelete(hal_os_semaphore_t *p_sem)
{
  /* Ensure memory operations complete before releasing p_sem*/
  __DMB();
  *p_sem = 0;

  return HAL_OS_OK;
}

/* Mutex APIs */
hal_os_status_t HAL_OS_MutexCreate(hal_os_mutex_t  *p_mutex)
{
  hal_os_status_t status = HAL_OS_ERROR;

  return HAL_OS_SemaphoreCreate((hal_os_semaphore_t *)p_mutex);
}

hal_os_status_t HAL_OS_MutexTake(hal_os_mutex_t *p_mutex, uint32_t timeout)
{
  return HAL_OS_SemaphoreTake((hal_os_semaphore_t *)p_mutex, timeout);
}

hal_os_status_t HAL_OS_MutexRelease(hal_os_mutex_t *p_mutex)
{
  return HAL_OS_SemaphoreRelease((hal_os_semaphore_t *)p_mutex);
}

hal_os_status_t HAL_OS_MutexDelete(hal_os_mutex_t *p_mutex)
{
  return HAL_OS_SemaphoreDelete((hal_os_semaphore_t *)p_mutex);
}