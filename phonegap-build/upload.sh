#!/bin/bash
scriptdir=`dirname $0`
source $scriptdir/phonegap-profiles/$FILE_TO_LOAD
# uploading the app
PROGRESS_FILE=/tmp/$TOKEN-progress
echo "" > $PROGRESS_FILE
tail -f $PROGRESS_FILE &
curl -X PUT -F file=@dist/$FILE_TO_UPLOAD https://build.phonegap.com/api/v1/apps/$APP_ID?auth_token=$TOKEN -o $PROGRESS_FILE --progress-bar
kill $!
