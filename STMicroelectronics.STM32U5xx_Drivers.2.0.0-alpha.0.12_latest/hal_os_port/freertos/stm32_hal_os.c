/**
  ******************************************************************************
  * @file    stm32_hal_os.c
  * @author  MCD Application Team
  * @brief   STM32 HAL OS abstraction: implementation for FreeRTOS OS.
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

/** @addtogroup $FAMILYNAME_UC$_HAL_Driver
  * @{
  */

/** @addtogroup OSAL
  * @{
  */

/* Exported types ------------------------------------------------------------*/
/** @defgroup OSAL_Private_Macros OSAL Private Macros
  * @{
  */


#define IS_IRQ_MODE()             (__get_IPSR() != 0U)
#define IS_IRQ()                  IS_IRQ_MODE()

/**
  * @}
  */


/* Semaphore APIs */
/**
  * @brief
  *
  * @param p_sem
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_SemaphoreCreate(hal_os_semaphore_t *p_sem)
{
  SemaphoreHandle_t hsemaphore = NULL;
  hal_os_status_t status = HAL_OS_ERROR;

#if (configSUPPORT_DYNAMIC_ALLOCATION == 1)
  hsemaphore = xSemaphoreCreateBinary();
#endif /* configSUPPORT_DYNAMIC_ALLOCATION == 1 */

  if (hsemaphore != NULL)
  {
    if (xSemaphoreGive(hsemaphore) != pdPASS)
    {
      vSemaphoreDelete(hsemaphore);
      hsemaphore = NULL;
    }
  }

  if (hsemaphore != NULL)
  {
    *p_sem = hsemaphore;
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
  SemaphoreHandle_t hsemaphore = (SemaphoreHandle_t) * p_sem;
  hal_os_status_t status = HAL_OS_ERROR;
  BaseType_t yield;

  if (hsemaphore != NULL)
  {
    if (IS_IRQ())
    {
      if (timeout == 0U)
      {
        yield = pdFALSE;

        if (xSemaphoreTakeFromISR(hsemaphore, &yield) == pdPASS)
        {
          status = HAL_OS_OK;
          portYIELD_FROM_ISR(yield);
        }
      }
    }
    else
    {
      if (xSemaphoreTake(hsemaphore, (TickType_t)timeout) == pdPASS)
      {
        status = HAL_OS_OK;
      }
    }
  }

  return status;
}

/**
  * @brief
  *
  * @param p_sem
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_SemaphoreRelease(hal_os_semaphore_t *p_sem)
{
  SemaphoreHandle_t hsemaphore = (SemaphoreHandle_t) * p_sem;
  hal_os_status_t status = HAL_OS_ERROR;
  BaseType_t yield;

  if (hsemaphore != NULL)
  {
    if (IS_IRQ())
    {
      yield = pdFALSE;

      if (xSemaphoreGiveFromISR(hsemaphore, &yield) == pdTRUE)
      {
        status = HAL_OS_OK;
        portYIELD_FROM_ISR(yield);
      }
    }
    else
    {
      if (xSemaphoreGive(hsemaphore) == pdPASS)
      {
        status = HAL_OS_OK;
      }
    }
  }

  return (status);
}

/**
  * @brief
  *
  * @param p_sem
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_SemaphoreDelete(hal_os_semaphore_t *p_sem)
{
  SemaphoreHandle_t hsemaphore = (SemaphoreHandle_t) * p_sem;
  hal_os_status_t status = HAL_OS_ERROR;

  if (!IS_IRQ())
  {
    status = HAL_OS_ERROR;
    vSemaphoreDelete(hsemaphore);
  }

  return (status);
}

/* Mutex APIs */
/**
  * @brief
  *
  * @param p_mutex
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_MutexCreate(hal_os_mutex_t *p_mutex)
{
  SemaphoreHandle_t hmutex;
  hal_os_status_t status = HAL_OS_ERROR;

  if (!IS_IRQ())
  {
    hmutex = xSemaphoreCreateMutex();
    if (hmutex != NULL)
    {
      *p_mutex = hmutex;
      status = HAL_OS_OK;
    }
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
  SemaphoreHandle_t hmutex = (SemaphoreHandle_t) * p_mutex;
  hal_os_status_t status = HAL_OS_ERROR;

  if (hmutex != NULL)
  {
    if (!IS_IRQ())
    {
      if (xSemaphoreTake(hmutex, (TickType_t)timeout) == pdPASS)
      {
        status = HAL_OS_OK;
      }
    }
  }
  return status;
}

/**
  * @brief
  *
  * @param p_mutex
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_MutexRelease(hal_os_mutex_t *p_mutex)
{
  SemaphoreHandle_t hmutex = (SemaphoreHandle_t) * p_mutex;
  hal_os_status_t status = HAL_OS_ERROR;

  if (hmutex != NULL)
  {
    if (!IS_IRQ())
    {
      if (xSemaphoreGive(hmutex) == pdPASS)
      {
        status = HAL_OS_OK;
      }
    }
  }
  return status;
}

/**
  * @brief
  *
  * @param p_mutex
  * @return hal_os_status_t
  */
hal_os_status_t HAL_OS_MutexDelete(hal_os_mutex_t *p_mutex)
{
  SemaphoreHandle_t hmutex = (SemaphoreHandle_t) * p_mutex;
  hal_os_status_t status = HAL_OS_ERROR;

  if (hmutex != NULL)
  {
    if (!IS_IRQ())
    {
      vSemaphoreDelete(hmutex);
    }
  }
  return status;
}

/**
  * @}
  */

/**
  * @}
  */
