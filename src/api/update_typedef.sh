#!/bin/bash

export NODE_TLS_REJECT_UNAUTHORIZED=0

npx openapicmd typegen https://localhost:5050/v1/openapi.json > openapi.d.ts

# typegen https://localhost:5050/v1/openapi.json > openapi.d.ts

