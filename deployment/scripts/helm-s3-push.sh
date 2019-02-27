helm init --client-only

echo -e '\nPackaging Helm charts ...'
helm package --version 0.1.0 deployment/web-regression-test
helm package --version 0.1.0 deployment/api-regression-test
helm package --version 0.1.0 deployment/orca-regression-test

echo -e '\nCreating index.yaml file ...'
helm repo index --url https://s3-$AWS_REGION.amazonaws.com/$S3_BUCKET_NAME/qa-regression-test --home . . 

echo -e '\nSyncing files to S3 ...' \
 && aws s3 sync . s3://$S3_BUCKET_NAME/qa-regression-test --exclude "*" --include "*regression-test*.tgz" --include "index.yaml"