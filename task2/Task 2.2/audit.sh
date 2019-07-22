#!/bin/bash 

docker image rm audit-nodejs-app -f
docker build --target audit -t audit-nodejs-app .
docker run --rm audit-nodejs-app