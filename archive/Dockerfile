#TODO yarn-lock  -frozen lock file --production
#TODO copy only tests
FROM node:8.10.0-slim AS build-deps

COPY package.json /tmp/package.json
RUN cd /tmp && yarn install --prod --frozen-lockfile
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

RUN npm install -g allure-commandline

WORKDIR /app
COPY . /app
#COPY ./scripts/test.sh /
#COPY ./scripts/start.sh /

#ENTRYPOINT ["/bin/bash"]
#CMD ["scripts/test.sh"]