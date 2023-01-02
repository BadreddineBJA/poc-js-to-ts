/**
  ******************************************************************************
  * @file    stm32_hal_os.c
  * @author  MCD Application Team
  * @brief   STM32 HAL OS abstraction: implementation for CMSIS OS.
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

/**
  * @brief
  *
  * @param p_sem
  * @return hal_os_semaphore_t
  */
hal_os_status_t HAL_OS_SemaphoreCreate(hal_os_semaphore_t *p_sem)
{
  hal_os_status_t status = HAL_OS_ERROR;

  *p_sem = osSemaphoreNew(1, 1, NULL);

  if (*p_sem != NULL)
  {
    status = HAL_OS_OK;
  }

  return status;
}

/**
  * @brief
  *
  * @param p_sem
  * @param timeout
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_SemaphoreTake(hal_os_semaphore_t *p_sem, uint32_t timeout)
{
  if (osSemaphoreAcquire(*p_sem, timeout) == osOK)
  {
    return HAL_OS_OK;
  }
  return HAL_OS_ERROR;
}

/**
  * @brief
  *
  * @param p_sem
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_SemaphoreRelease(hal_os_semaphore_t *p_sem)
{
  if (osSemaphoreRelease(*p_sem) == osOK)
  {
    return HAL_OS_OK;
  }
  return HAL_OS_ERROR;
}

/**
  * @brief
  *
  * @param p_sem
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_SemaphoreDelete(hal_os_semaphore_t *p_sem)
{
  if (osSemaphoreDelete(*p_sem) == osOK)
  {
    return HAL_OS_OK;
  }
  return HAL_OS_ERROR;
}

/**
  * @brief
  *
  * @param p_mutex
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_MutexCreate(hal_os_mutex_t  *p_mutex)
{
  hal_os_status_t status = HAL_OS_ERROR;

  *p_mutex = osMutexNew(NULL);

  if (*p_mutex != NULL)
  {
    status = HAL_OS_OK;
  }

  return status;
}

/**
  * @brief
  *
  * @param p_mutex
  * @param timeout
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_MutexTake(hal_os_mutex_t *p_mutex, uint32_t timeout)
{
  if (osMutexAcquire(*p_mutex, timeout) == osOK)
  {
    return HAL_OS_OK;
  }
  return HAL_OS_ERROR;
}

/**
  * @brief
  *
  * @param p_mutex
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_MutexRelease(hal_os_mutex_t *p_mutex)
{
  if (osMutexRelease(*p_mutex) == osOK)
  {
    return HAL_OS_OK;
  }
  return HAL_OS_ERROR;
}

/**
  * @brief
  *
  * @param p_mutex
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_MutexDelete(hal_os_mutex_t *p_mutex)
{
  if (osMutexDelete(*p_mutex) == osOK)
  {
    return HAL_OS_OK;
  }
  return HAL_OS_ERROR;
}

