FROM node:10-alpine

RUN mkdir -p test/api
COPY package.json test/api
RUN cd test/api && yarn install --frozen-lockfile --production

COPY . test/api

WORKDIR /test/api

ENV API_ORGANIZATIONS_PROD http://organization/api/v1
ENV API_IDENTITIES_PROD http://identity
ENV API_MEMBERSHIPS_PROD http://organization/api/v1/memberships
ENV API_SPACES_PROD http://space/v1
#ENV API_TOKEN_PROD 
ENV API_KEYS_PROD http://keys/v1
ENV API_INVITES_PROD http://organization/api/v1/invites
ENV API_METRICS_PROD http://metrics/v1

ENTRYPOINT ["tail", "-f", "/dev/null"]
