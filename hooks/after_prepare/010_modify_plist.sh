#!/bin/bash

PLIST=platforms/ios/HelloCordova/HelloCordova-Info.plist

cat << EOF |
Add :NSAppTransportSecurity dict
Add :NSAppTransportSecurity:NSAllowsArbitraryLoads bool YES
EOF
while read line
do
    /usr/libexec/PlistBuddy -c "$line" $PLIST
done

true