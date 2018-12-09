#INSTALL aws-cli and helm
FROM ubuntu:latest as installer
RUN apt-get -y update && apt-get -y install curl git openssl build-essential

ADD https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get /usr/local/bin/gethelm
RUN chmod a+x /usr/local/bin/gethelm
RUN gethelm -v latest

# RUN curl -LO https://dl.google.com/go/go1.9.3.linux-amd64.tar.gz
# RUN tar -C /usr/local -xzf go1.9.3.linux-amd64.tar.gz
# RUN export PATH=$PATH:/root/go/bin

RUN mkdir -p ~/.helm/plugins
RUN helm plugin install https://github.com/hypnoglow/helm-s3.git



#NPM install and copy Tests
FROM node:10-alpine AS build-deps

RUN apk add python make g++
COPY aws /etc/apk/repositories
RUN apk add --update aws-cli@testing git ca-certificates && rm -rf /var/cache/apk/*

COPY --from=installer /usr/local/bin/helm /usr/local/bin/helm
COPY --from=installer /root/.helm /root/.helm

ENV NODE_ENV production

RUN mkdir -p test/web
COPY package.json test/web
RUN cd test/web && yarn install --frozen-lockfile --production
COPY . test/web

RUN aws configure set AWS_ACCESS_KEY_ID AKIAIE7TXRZ3BAQTKJRQ
RUN aws configure set AWS_SECRET_ACCESS_KEY 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
RUN aws configure set AWS_DEFAULT_REGION ap-southeast-2
RUN aws configure set AWS_DEFAULT_OUTPUT text

WORKDIR /test/web