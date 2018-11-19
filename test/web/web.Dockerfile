FROM node:10-alpine AS build-deps

#JAVA installation for allure-command-line tool installation
RUN apk add python make g++
RUN apk update
RUN apk fetch openjdk8
RUN apk add openjdk8

# SET JAVA Env Vars
ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk/jre
ENV PATH ${PATH}:${JAVA_HOME}/bin
ENV NODE_ENV production
# -------------------------------------------
# COPY package.json /tmp/package.json
# RUN cd /tmp && yarn install --prod --frozen-lockfile

# RUN mkdir -p /qa && cp -a /tmp/node_modules /qa/
# RUN npm install -g allure-commandline 

# WORKDIR /qa
# COPY . /qa
# -------------------------------------------

RUN mkdir -p test/web
COPY package.json test/web
RUN cd test/web && yarn install --frozen-lockfile --production

COPY . test/web

WORKDIR /test/web