#! /bin/bash
imageName="koolob/swoole-docker"
#docker pull $imageName

#localImageName="swoole-server:0.1"
containerName="swoole-server"
#docker build -t $localImageName .

LocalVol="$(pwd)"
containerVol="/root/app"

docker stop $containerName
docker rm $containerName

docker run -it --name $containerName \
    -p 9502:9502 \
    -v $LocalVol:$containerVol \
    $imageName /bin/bash

# docker rmi -f $(docker images | grep "<none>" | awk "{print \$3}")
# docker pull koolob/swoole-docker
# docker build -t swoole-server:0.1 .
# docker run -t -i -p 8080:8080 swoole-server:0.1
