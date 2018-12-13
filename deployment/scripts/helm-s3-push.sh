helm init --client-only

echo -e '\nPackaging Helm chart ...'
helm package --version 0.1.0 deployment/web-regression-test

echo -e '\nCreating index.yaml file ...'
helm repo index --url https://s3-$AWS_REGION.amazonaws.com/$S3_BUCKET_NAME/mtribes-helm-charts/web-regression-test --home . .

echo -e '\nSyncing index.yaml and packaged charts to S3...'
aws s3 sync . s3://$S3_BUCKET_NAME/mtribes-helm-charts/web-regression-test --exclude "*" --include "*.tgz" --include "index.yaml"