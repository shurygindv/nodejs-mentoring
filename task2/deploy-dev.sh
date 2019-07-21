#!/bin/bash 

# without db, only server

# docker kill #containerId
docker image rm nodejs-app-dev-server -f
docker build --rm --target development -t nodejs-app-dev-server .
docker run -d --restart=always -p 7070:7070 nodejs-app-dev-server