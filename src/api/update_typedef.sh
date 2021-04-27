#!/bin/bash

typegen http://nyx.devapp:5050/v1/openapi.json > openapi.d.ts
typegen http://nyx.devapp:5050/v1/openapi.json > openapiCached.d.ts

