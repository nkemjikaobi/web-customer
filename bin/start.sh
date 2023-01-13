#!/bin/bash

if [ $APPLICATION_ENV == "development" -o $APPLICATION_ENV == "production" ]; then
    yarn build
else
    yarn build:dev
fi
serve -s build -l 80
