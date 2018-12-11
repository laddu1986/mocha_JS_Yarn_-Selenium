helm init --client-only

echo -e '\nPackaging Helm chart ...'
helm package --version 0.1.0 deployment/helmchart

echo -e '\nCreating index.yaml file ...'
helm repo index --url https://s3-$AWS_REGION.amazonaws.com/$S3_BUCKET_NAME/helmchart --home . .

echo -e '\nSyncing index.yaml and packaged charts to S3...'
aws s3 sync . s3://$S3_BUCKET_NAME --exclude "*" --include "*.tgz" --include "index.yaml"