#!/bin/sh

# test docker compose version for the "watch" command
if [ $(
    echo "$(docker compose version | grep --only-matching -E "[0-9]+\.[0-9]+") >= 2.23" | bc -l
    ) -eq 0 ]
then
echo "this scripts requires version 2.22 or above of docker compose, aborting..."
exit 1
else
echo "docker compose version check, passed..."
fi

export node_version=$(cat .tool-versions | pcregrep --only-matching=1 "^nodejs\s+(\S+)")
echo "node version $node_version extracted from .tool-versions..."

# rebuild cache only when there is no docker image with the tag "cached-image"
if [ $(docker image ls -q cached-image) ]
then
echo "cached-image exists and will be used..."
echo "(run 'docker image rm cached-image' to force rebuilding dependencies)"
else
echo "building cached-image with package.json dependencies..."
docker build --build-arg node_version=$node_version -f Dockerfile.dev.cached -t cached-image .
fi

# up the services using docker compose (uses the $node_version variable)
docker compose -f docker-compose.dev.yml watch

# in order to be able to see the logs in real time as someone would do when running
# "docker compose up", you will have to run the ./docker-compose-dev-logs.sh script