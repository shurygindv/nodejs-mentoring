#!/bin/bash 

echo "---------------------------"
echo "* Docker was initialized *"
echo ""
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "User: $(whoami)"
echo "Args: "
echo "- NODE_ENV = ${NODE_ENV:-"not specified"}"
echo "---------------------------"