#!/bin/sh

# currently the watch command requires a separate terminal to show the logs
docker compose -f docker-compose.dev.yml logs --follow