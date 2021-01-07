#!/bin/bash

echo What should the version be?
read VERSION

docker build -t justinchu252/develify:$VERSION .
docker push justinchu252/develify:$VERSION
ssh root@192.81.209.68 "docker pull justinchu252/develify:$VERSION && docker tag justinchu252/develify:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"