#!/bin/bash
docker-compose down
clear
docker-compose -f docker-compose.yml up --build