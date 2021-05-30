# FightPandemics-Web3

Fight Pandemics Token Badges for volunteers.

`develop` branch is the default branch

Folder structure:
- `client`: frontend UI, contains React components to interact with contracts
- `api`: backend API, Node with PostGres database

# Prerequisites
- Yarn latest version
- NVM (Node Version Manager) - run `nvm install` to install node version locally from `.nvmrc` file within each folder
- Install PostGres for your platform and create database named `badges_dev` based on the database URL string below.
- Create an environment file `/api/.env` file with the following key-value pairs.
```
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/badges_dev
```
## For Pinata Access
- In `/client` create a `.env` file with the following
```
REACT_APP_PINATA_API_KEY=
REACT_APP_PINATA_SECRET_API_KEY=
```
- *contact @jontkoh for the Pinata keys*

# How to run the repo
Involves the following steps:
1. Install dependencies.
2. Migrating database.
3. Run the `client` and `api`.

## Install dependencies
Run `yarn setup` in project root directory to install dependencies for all folders.

## Migrate database
Run `cd api && NODE_ENV=development yarn migrate` to migrate database.

## Run
Back in root directory, run `yarn dev` to run client and api in one terminal OR run `yarn api:dev` and `yarn client:dev` in separate terminals.
