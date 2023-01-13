FROM node:16.14.0-alpine3.14

# create root directory
RUN mkdir -p /var/log/applications/repo

# set working directory
RUN mkdir /repo
WORKDIR /repo

# install app dependencies
COPY ./package.json /repo/package.json

# update system
RUN apk update && apk add nano && yarn global add serve && yarn global add vm2 && yarn cache clean && yarn install --save

# add app to directory
COPY . /repo/


# apply permission on start file
RUN chmod a+rwx /repo/docker/bin/start.sh

COPY ./docker/bin/start.sh /usr/local/bin/start.sh

EXPOSE 80

#RUN yarn build

CMD ["sh", "/usr/local/bin/start.sh"]
