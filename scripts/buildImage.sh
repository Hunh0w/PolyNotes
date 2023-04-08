#!/bin/bash
name="polynotes-front"

sudo kubectl delete -f kube/

sudo docker image prune -f
sudo docker rmi -f $name
sudo docker rmi -f localhost:5000/$name

sudo docker build -t $name .
sudo docker tag $name localhost:5000/$name
sudo docker push localhost:5000/$name

sudo kubectl apply -f kube/
