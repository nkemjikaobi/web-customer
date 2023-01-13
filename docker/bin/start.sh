#!/bin/bash

yarn global add serve

if [ REACT_APP_NODE_ENV == "production" ];
then
    yarn build --production
    serve -s build -l 80
else
    if [ REACT_APP_NODE_ENV == "development" ];
    then
        yarn build:dev
        serve -s build -l 80
    else
        # yarn run start
        yarn build:dev
        serve -s build -l 80
    fi
fi