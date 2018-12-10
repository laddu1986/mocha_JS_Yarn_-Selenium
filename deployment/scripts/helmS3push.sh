helm init --client-only
helm package --version 0.1.0 deployment/helmchart
helm s3 init s3://$S3_BUCKET_NAME/helmchart
helm repo add helmchart s3://$S3_BUCKET_NAME/helmchart
helm s3 push --force ./helmchart-0.1.0.tgz helmchart
