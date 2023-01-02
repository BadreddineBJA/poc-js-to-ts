@echo off

SET script_path=%~dp0
SET script_path=%script_path:\=/%

SET generatorname=%6
SET cgeninputfile=%7

ECHO "STM32U5xx_Drivers PACK generator entry point"
ECHO "[INFO] Invoked by: %generatorname% with: %cgeninputfile%"

bash -c "%script_path%gen_code.sh %*"