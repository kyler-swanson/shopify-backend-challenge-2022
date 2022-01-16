#!/bin/bash
docker-compose down
clear
docker-compose run --rm -e NODE_ENV=test app npm test "$@"