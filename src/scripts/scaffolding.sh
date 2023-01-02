#!/bin/sh
set -eux
APP_PROJ_NAME=app
COMP_PROJ_NAME=comp
# Create the projects
cube project create ${APP_PROJ_NAME} --target-device stm32u5 --type application
cube project create ${COMP_PROJ_NAME} -p ${APP_PROJ_NAME} --target-device stm32u5 --type component
# Move into application
pushd ${APP_PROJ_NAME}
# Register the sw_proj in the application
cube project add -p ${COMP_PROJ_NAME}/${COMP_PROJ_NAME}.cproject.yml
# Move into the sw_proj
pushd ${COMP_PROJ_NAME}
# Add some interesting components
cube project add -c 'STMicroelectronics::Device:Startup' \
    'Device:STM32 HAL:Flash'                             \
    'Device:STM32 HAL Code Gen:UART Init'                \
    'Device:STM32 HAL Code Gen:TIM Init'                 \
    'Device:STM32 HAL Code Gen:GPIO Init'                \
    'Device:STM32 HAL Code Gen:CRC Init'