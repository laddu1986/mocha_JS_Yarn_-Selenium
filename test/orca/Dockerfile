FROM node:10-alpine
RUN apk add python make g++ bash
RUN mkdir -p test/orca
COPY package.json test/orca
RUN cd test/orca && yarn install --frozen-lockfile --production

COPY . test/orca

WORKDIR /test/orca

ENTRYPOINT [ "/bin/sh" ]
