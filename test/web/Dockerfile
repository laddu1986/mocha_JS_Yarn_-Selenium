FROM node:10-alpine AS build-deps

#JAVA installation for allure-command-line
RUN apk add python make g++
# RUN apk update
# RUN apk fetch openjdk8
# RUN apk add openjdk8

# Set ENV vars
# ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk/jre
# ENV PATH ${PATH}:${JAVA_HOME}/bin
ENV NODE_ENV production
# RUN npm config set unsafe-perm true
# RUN npm install -g allure-commandline

#Install node packages and copy Web-Tests
RUN mkdir -p test/web
COPY package.json test/web
RUN cd test/web && yarn install --frozen-lockfile --production
COPY . test/web

WORKDIR /test/web

