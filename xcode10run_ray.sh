#!/usr/bin/env bash
ojet build ios
cd hybrid
cordova run ios --buildFlag='-UseModernBuildSystem=0' $1 $2 $3
cd ..

