#!/bin/bash

local_uri=$(ipconfig getifaddr en0)
echo "Local ip is $local_uri"

LOCAL_URI="$local_uri" parcel build src/index.js --out-dir www/js --out-file index.js
