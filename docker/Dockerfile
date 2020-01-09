FROM node:13.5-alpine

RUN apk update && apk add bash

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

ARG PORT
ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install
RUN chown -R node:node /home/node/.npm-global

USER node

COPY . .

EXPOSE $PORT

CMD [ "npm", "run", "start:dev" ]
