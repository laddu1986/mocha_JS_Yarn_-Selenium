FROM node:10-alpine AS build-deps

#JAVA installation for allure-command-line
RUN apk add python make g++
ENV NODE_ENV production

#Install node packages and copy Web-Tests
RUN mkdir -p test/web
COPY package.json test/web
RUN cd test/web && yarn install --frozen-lockfile --production
COPY . test/web

WORKDIR /test/web