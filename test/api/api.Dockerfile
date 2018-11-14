FROM node:10-alpine

RUN mkdir -p test/api
COPY package.json test/api
RUN cd test/api && yarn install --frozen-lockfile --production

COPY . test/api

WORKDIR /test/api

#DEV 
ENV API_ORGANIZATIONS_DEV https://hub.appcurator.io/org/api/v1/organizations/
ENV API_IDENTITIES_DEV http://a672f40ce2e4e11e88381023cadbc14f-717884523.ap-southeast-2.elb.amazonaws.com/api/identities/
ENV API_MEMBERSHIPS_DEV https://hub.appcurator.io/org/api/v1/memberships/
ENV API_SPACES_DEV https://hub.appcurator.io/spaces/v1/organizations/
ENV API_TOKEN_DEV http://a672f40ce2e4e11e88381023cadbc14f-717884523.ap-southeast-2.elb.amazonaws.com/connect/token
ENV API_KEYS_DEV https://hub.appcurator.io/keys/v1/organizations/
ENV API_INVITES_DEV https://hub.appcurator.io/org/api/v1/invites/
ENV API_METRICS_DEV https://hub.appcurator.io/metrics/v1/organizations/
ENV ACCOUNT_PASS Pass1234


ENTRYPOINT ["tail", "-f", "/dev/null"]
