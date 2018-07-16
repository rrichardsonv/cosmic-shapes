#!/bin/bash

# We need to do this because localhost is different on device-emulator
local_uri=$(ipconfig getifaddr en0)
echo "Local ip is $local_uri"

LOCAL_URI="http://$local_uri:6001" parcel build src/index.js --out-dir www/js --out-file index.js
