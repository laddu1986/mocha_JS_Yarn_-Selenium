FROM node:10-alpine

RUN mkdir -p test/api
COPY package.json test/api
RUN cd test/api && yarn install --frozen-lockfile --production

COPY . test/api
COPY ./data /test/data

WORKDIR /test/api

ENTRYPOINT [ "/bin/sh" ]
