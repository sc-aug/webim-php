#! /bin/bash
# imageName="koolob/swoole-docker"
docker pull $imageName
localImageName="swoole-server:0.1"
containerName="swoole-server"
docker build -t $localImageName .
docker stop $containerName
docker rm $containerName
docker run --name $containerName -d -p 9502:9502 $localImageName
docker rmi -f $(docker images | grep "<none>" | awk "{print \$3}")
