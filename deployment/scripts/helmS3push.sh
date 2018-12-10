helm init --client-only

echo '\nPackaging Helm chart ...'
helm package --version 0.1.0 deployment/helmchart

echo '\nCreating index.yaml file ...'
helm repo index --url https://$S3_BUCKET_NAME/helmchart --home . .

echo '\nSyncing index.yaml and packaged charts to S3...'
aws s3 sync . s3://$S3_BUCKET_NAME/helmchart --exclude '*' --include "*.tgz" --include "index.yaml"