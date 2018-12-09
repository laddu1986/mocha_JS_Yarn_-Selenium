helm init --client-only
helm package --version 0.1.0 test/web/helmchart
helm s3 init s3://helm-job/helmchart
helm repo add helmchart s3://helm-job/helmchart
helm s3 push ./helmchart-0.1.0.tgz helmchart