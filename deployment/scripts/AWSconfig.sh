echo '\nInstalling aws-cli ...'
apk add --no-cache python \
    && apk add --no-cache --virtual .awscli-build-deps py-pip \
    && pip install awscli \
    && apk del --purge .awscli-build-deps

echo '\nConfiguring AWS credentials'
aws configure set AWS_ACCESS_KEY_ID $AWS_ACCESS_KEY_ID
aws configure set AWS_SECRET_ACCESS_KEY $AWS_SECRET_ACCESS_KEY
aws configure set AWS_DEFAULT_REGION $AWS_DEFAULT_REGION
aws configure set AWS_REGION $AWS_REGION
aws configure set AWS_DEFAULT_OUTPUT text