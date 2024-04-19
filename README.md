<img src="./public/pal_logo.svg" width="100%" height="240px">

# Openformstack (PalCollective edition)

This is a forked, slightly modified, and a completely dockerised version of Openformstack for the purpose of using it in our humanitarian operations.

We can host the forms within the same project or on our landing page (a work started by @eliasmeana132)

## Instructions

Before being able to run the application in development/production, either on your local machine or elsewhere, you need to supply the env secrets. Follow the instructions in `.env.example` to create an `.env` file, locally (which you will need to copy to the remote when deploying on the remote server).

### Running in development

Use the `docker-compose-dev.sh` and `docker-compose-dev-logs.sh` scripts simultaneously, on your local machine.

You may need to update Docker desktop, since the scripts use the `docker watch` command.

### Running in production locally

If using `direnv`, start by disallowing the access to the local `.envrc` file, which contains the remote context (ensuring that you are running your docker commands locally, rather than attempting to run them on a remote machine -called context).

After that run `docker compose -f docker-compose.prod.yml up` locally from the repo folder, the containers will be built and launched.

You can access the website at http://localhost (default port 80).

### Running in production locally (still in progress)

If using `direnv`, start by allowing the access to the local `.envrc` file, which contains the remote context (which will run your docker commands on the remote server).

Note that for this to work, you must both configure SSH access and create a docker context. Instructions for both are available on our [hive](https://github.com/PalCollective/hive-odoo/tree/main) repository.

After that, all you need to do is to:
1. Create a DB data folder on the remote (if does not exist), in the location `/opt/openstackforms/db-data`.
1. Create a file with a random password (not using special characters) in `/opt/openstackforms/secrets/pg_pass` on the remote (will be used for the postgres database password in production).
1. Create a properly filled `.env` secrets file (following the instructions in `.env.example`) and store it at `/opt/openstackforms/secrets/.env` on the remote. 
1. Run the command `docker compose -f docker-compose.prod.ypc.yml up --detach` (which will run on the remote context if you followed the instructions in [the other repo](https://github.com/PalCollective/hive-odoo/tree/main)).

# Original documentation

This repository contains a Nuxt 3 application for creating and managing headless forms. The application uses Prisma for ORM and provides a user interface for creating and managing workspaces and forms.

## Requirements
1. Node.js( ***version 18 or higher*** )

2. Yarn package installer

3. Docker

4. Docker compose.exe if the .exe file is not included in the docker setup installation then download it from the docker page

## Setup Process

1. Clone the repository

```bash
git clone https://github.com/your-repo/OpenformStack.git
cd OpenformStack
```
2. Install Dependencies
   
```bash
yarn install
```
3. Create a `.env` file in the root directory of the project by copying the `.env.example` file:

for linux/macOS users
```bash
cp .env.example .env
```
for windows users
```bash
copy .env.example .env
```

4. Create a .env.developer.local file in the root folder of the project
   
For macOS/Linux 
```bash
touch .env.development.local
```
For windows
```bash
type nul > .env.development.local
```
5. Copy the code into the .env.development.local file

```bash
GOOGLE_CLIENT_ID=508816847621-jd5rqskggrh7veqi4pqjtj3nfleqt405.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET={ask admin for secret}
API_ROUTE_SECRET=(ask admin for secret}
AUTH_ORIGIN="http://localhost:3000"
BASE_URL="http://localhost:3000"
```

6. Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```
7. Run the prisma database migrations and generate the Prisma client:

```bash
yarn prisma:migrate:dev
yarn prisma:migrate:generate
```
8. Start the development server:

```bash
yarn dev
```

If you are facing an error in signing up then delete yarn lock file and node_modules file and re-install the yarn packages.

Yarn commands are often used in the context of database migrations. Here's what each of the commands you mentioned typically does:

a) yarn prisma:migrate:dev:

This command is usually used to apply pending database migrations in a development environment.
It runs the migrations that have been generated but not yet applied to the database.


b) yarn prisma:migrate:generate:
This command generates new Prisma migration files based on changes in your Prisma schema.
It compares the current state of your database with the Prisma schema and generates migration files that represent the changes needed to bring the database schema in sync with the Prisma schema.
