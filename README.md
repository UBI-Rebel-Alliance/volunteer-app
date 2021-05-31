# Volunteer App

An app for volunteers to manage and view badges and bounties.

## Tech Stack
### Web2
- `client`: JavaScript, React, Ant Design
- `api`: TypeScript, Node, PostgreSQL, Knex.js (query builder), Objection.js (ORM)

### Web3
- Smart contracts on Ethereum written in Solidity for [badges](https://github.com/UBI-Rebel-Alliance/badges-contracts).
- [Subgraph](https://github.com/UBI-Rebel-Alliance/badges-subgraph) using The Graph, an indexing protocol for querying Ethereum network.
- IPFS for storing badges metadata.

# Local Development

## Common Pre-requisites
You will need the following pre-requisites common across all repos:
1. [Yarn](https://classic.yarnpkg.com/en/)
2. NVM (Node Version Manager) for your OS which install node version locally from `.nvmrc`
3. PostgreSQL – [PostgreSQL Downloads](https://www.postgresql.org/download/)

It requires multiple repositories to run the app. Start with creating a folder named `ubi-rebel-alliance`. From now on, this will be the root of the project directory. All repos will be cloned at the project root.

```
mkdir ubi-rebel-alliance && cd ubi-rebel-alliance
```

Three components have to be up and running to start development:
1. Local blockchain node - smart contracts to be deployed here.
2. Local graph node - subgraph to be deployed here.
3. Local app - the app itself. 

## Local Blockchain Node

Run the below commands to start a local blockchain node and deploy the contracts.
1. Clone the repo - `git clone https://github.com/UBI-Rebel-Alliance/badges-contracts.git && cd badges-contract`
2. Install node version locally - `nvm install`
3. Install dependencies - `yarn`
4. Start blockchain node - `yarn start`
5. Deploy contracts - `yarn deploy`

## Local Graph Node

### Pre-requisites

To run a local graph node, the following needs to be install on your system:
- Rust (latest stable) – [How to install Rust](https://www.rust-lang.org/en-US/install.html)
- PostgreSQL – [PostgreSQL Downloads](https://www.postgresql.org/download/)
- IPFS – [Installing IPFS](https://docs.ipfs.io/install/)

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
