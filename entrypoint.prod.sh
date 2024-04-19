#!/bin/sh

# Locate password of POSTGRESDB in production
if ! [ -z "$POSTGRES_PASSWORD" ]
then 
PGPASS=$POSTGRES_PASSWORD
elif [ -f "/run/secrets/pg_pass" ] && [ -s "/run/secrets/pg_pass" ]
then
PGPASS=$(cat /run/secrets/pg_pass)
else
echo "could not find POSTGRES_PASSWORD or /run/secrets/pg_pass, aborting..."
exit 1
fi 

# Create DATABASE_URL
export DATABASE_URL=postgres://postgres:${PGPASS}@db/headless_forms?schema=public
# Sync database
npx prisma db push

# .env files are not loaded automaticall in production (Nuxt 3)
# Locate .env file in production
if [ -f "/run/secrets/env_secrets_ypc" ]
then
ENVFILE=/run/secrets/env_secrets_ypc
elif [ -f "/run/secrets/env_secrets" ]
then
ENVFILE=/run/secrets/env_secrets
else
echo "could not find env secrets, aborting..."
exit 1
fi 

# Import secrets into environment
export $(grep -v "^#" $ENVFILE | xargs)

# Run Nitro server in production
node .output/server/index.mjs