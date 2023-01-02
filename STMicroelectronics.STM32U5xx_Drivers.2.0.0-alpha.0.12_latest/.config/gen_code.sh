#!/bin/bash

# export DEBUG=1 in your local env to enable debug console print
[ "$DEBUG" = "" ] || set -x

generator_dir=$PWD
script_path=$(realpath "$(dirname "$0")")
DFP=$1            # not used
device=$2         # not used
project_path=$3
project_file=$4   # not used
gpdsctemplate=$5
generatorname=$6
cgeninputfile=$7

# Check cube is installed
which cube &> /dev/null
if [ $? -ne 0 ]; then
    echo "[GEN-ERROR] cube wrapper not found: STOP"
    exit 1
fi

# Check cube wrapper version
cube --version
cube_version=$(cube --version | grep version | cut -f3 -d'.')
if [ $cube_version -lt 19 ]; then
    echo "[GEN-ERROR] cube wrapper wrong version: STOP"
    exit 1
fi

cd $script_path

# Check codegen is installed
cube --list | grep -v mini | grep codegen
if [ $? -ne 0 ]; then
    echo "[GEN-ERROR] codegen not found: STOP"
    exit 2
fi

echo "[GEN-WARNING] bring-up version"

CUBE_COMMAND="cube codegen generatefrominputfile --path $cgeninputfile --generatorId $generatorname"
echo $CUBE_COMMAND
$CUBE_COMMAND

# Should we introduce an explicit parameter for the data file ?
# As we factorize the invocation we must take into account all components in 1 gpdsc
# So, we merge all .json files produced by the hook
# example: Device_STM32 HAL Code Gen_CRC Init.json + Device_STM32 HAL Code Gen_UART Init.json > STM32_HAL_gendata.json
myfilter() {
    GPDSC_DATA_PATTERN="Device_STM32 HAL Code Gen_"
    GPDSC_DATA_FILES="ls $project_path/generated/*.json"
    $GPDSC_DATA_FILES | grep "$GPDSC_DATA_PATTERN"
}

echo "{" > $project_path/STM32_HAL_gendata.json
echo "\"my_array\" : [" >> $project_path/STM32_HAL_gendata.json

myfilter > $project_path/gpdsc_files_list.txt
echo "Files to be merged: "
cat $project_path/gpdsc_files_list.txt
item=0
cat $project_path/gpdsc_files_list.txt | while read f
do
  item=$((item+1))
  echo "[INFO] Adding $f file in STM32_HAL_gendata.json"
  # take action on each file. $f store current file name
  echo "element number $item in my_array"
  cat "$f" >> $project_path/STM32_HAL_gendata.json
  echo "," >> $project_path/STM32_HAL_gendata.json
done
echo "{\"end of data\" : 1}" >> $project_path/STM32_HAL_gendata.json
echo "concatenation completed"
echo "] }" >> $project_path/STM32_HAL_gendata.json

# generate gpdsc
echo
echo "[GEN-INFO] generating the gpdsc, to be extended to handle conditions too"
CUBE_COMMAND="cube codegen generate --template $script_path/$gpdsctemplate --data $project_path/STM32_HAL_gendata.json --targetfolder $project_path --outputfilename STM32_HAL_Driver_codegen.gpdsc"
echo $CUBE_COMMAND
$CUBE_COMMAND