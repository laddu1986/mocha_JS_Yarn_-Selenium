export IMAGE_NAME="massiveinteractive/qa-web:$VERSION"
docker login -u $docker_user -p $docker_user_pwd

#build and push image with above version
docker build --build-arg Version=$VERSION -t $IMAGE_NAME test/web
docker push $IMAGE_NAME