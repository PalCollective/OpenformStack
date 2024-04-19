#!/bin/sh

# THIS SCRIPT AND THE ASSOCIATED WORKFLOW IS UNDER DEVELOPMENT AND IS HERE FOR
# HISTORICAL REASONS

# this script needs direnv
if ! command -v direnv &> /dev/null
then
echo "this scripts requires the direnv (https://direnv.net) command to run, aborting..."
exit 1
else
# loads env variables from .envrc
echo "loading env variables from .envrc..."
direnv allow .
fi

# in this alternative dev script, we use docker compose only to spin up the database
# and the inngress dev server, while running the app using yarn on the localhost.
docker compose -f docker-compose.dev.yml up db inngest --detach
yarn start dev