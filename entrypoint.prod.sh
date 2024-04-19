#!/bin/sh

npx prisma db push
# .env files are not loaded automaticall in production (Nuxt 3)
export $(grep -v "^#" /run/secrets/env_secrets | xargs)
node .output/server/index.mjs