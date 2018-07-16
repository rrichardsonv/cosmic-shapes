#!/bin/bash

local_uri=$(ipconfig getifaddr en0)
echo "Local ip is $local_uri"

LOCAL_URI="http://$local_uri:6001" parcel build src/index.js --out-dir www/js --out-file index.js
