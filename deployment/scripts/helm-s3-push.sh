helm init --client-only

echo -e '\nPackaging Helm charts ...'
helm package --version 0.1.0 deployment/web-regression-test
helm package --version 0.1.0 deployment/api-regression-test
helm package --version 0.1.0 deployment/orca-regression-test

echo -e '\nCreating Web index.yaml file...'
helm repo index --url https://s3-$AWS_REGION.amazonaws.com/$S3_BUCKET_NAME/web-regression-test --home . .

echo -e '\nSyncing Web charts and index... Generating creating API index'
aws s3 sync . s3://$S3_BUCKET_NAME/web-regression-test --exclude "*" --include "web*.tgz" --include "index.yaml" \
  && helm repo index --url https://s3-$AWS_REGION.amazonaws.com/$S3_BUCKET_NAME/api-regression-test --home . .

echo -e '\nSyncing API charts and index... Generating creating Orca index'
aws s3 sync . s3://$S3_BUCKET_NAME/api-regression-test --exclude "*" --include "api*.tgz" --include "index.yaml" \
  && helm repo index --url https://s3-$AWS_REGION.amazonaws.com/$S3_BUCKET_NAME/orca-regression-test --home . .

echo -e '\nSyncing API charts and index'
aws s3 sync . s3://$S3_BUCKET_NAME/orca-regression-test --exclude "*" --include "orca*.tgz" --include "index.yaml"