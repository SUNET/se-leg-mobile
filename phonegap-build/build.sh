#!/bin/bash
scriptdir=`dirname $0`
source $scriptdir/phonegap-profiles/$FILE_TO_LOAD
# building the app
npm install
bower install --allow-root
# we recommend to use a task called "profile" emulating maven profiles
gulp profile --phonegapbuild --env $ENVIRONMENT
# building the zip
gulp zip --env $ENVIRONMENT