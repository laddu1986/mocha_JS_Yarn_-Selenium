FROM node:8.9.1
ADD . /app
WORKDIR /app
RUN npm i