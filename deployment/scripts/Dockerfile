#====================================================================================================
#Docker image with HELM and AWS-CLI to push packages to S3 buckets hosted at massiveinteractive/qa-ci
#====================================================================================================

#INSTALL helm packager and s3 push plugin
FROM ubuntu:latest as installer
RUN apt-get -y update && apt-get -y install curl git openssl build-essential

ADD https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get /usr/local/bin/gethelm
RUN chmod a+x /usr/local/bin/gethelm
RUN gethelm -v latest

RUN mkdir -p ~/.helm/plugins
RUN helm plugin install https://github.com/hypnoglow/helm-s3.git


FROM alpine:3.7

COPY repos /etc/apk/repositories
RUN apk add --update aws-cli@testing git ca-certificates && rm -rf /var/cache/apk/*

COPY --from=installer /usr/local/bin/helm /usr/local/bin/helm
COPY --from=installer /root/.helm /root/.helm