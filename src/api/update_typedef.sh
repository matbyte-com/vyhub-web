#!/bin/bash

export NODE_TLS_REJECT_UNAUTHORIZED=0

typegen httpzs://localhost:5050/v1/openapi.json > openapi.d.ts

