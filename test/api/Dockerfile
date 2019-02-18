FROM node:10-alpine
RUN apk add python make g++ bash
RUN mkdir -p test/api
COPY package.json test/api
RUN cd test/api && yarn install --frozen-lockfile --production

COPY . test/api

WORKDIR /test/api

ENTRYPOINT [ "/bin/sh" ]
