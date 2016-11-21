#!/bin/bash
scriptdir=`dirname $0`
export FILE_TO_LOAD=dev.properties

# building the app
bash $scriptdir/phonegap-build/build.sh

# uploading the app
bash $scriptdir/phonegap-build/upload.sh