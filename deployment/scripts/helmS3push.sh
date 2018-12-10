helm init --client-only
# Create index.yaml
helm repo index --url https://$S3_BUCKET_NAME/helmchart --home . .
# helm repo add helmchart s3://$S3_BUCKET_NAME/helmchart
# helm s3 push --force ./helmchart-0.1.0.tgz helmchart
helm package --version 0.1.0 deployment/helmchart
echo "Syncing index.yaml and packaged charts ..."
aws s3 sync . s3://$S3_BUCKET_NAME/helmchart --exclude '*' --include "*.tgz" --include "index.yaml"
