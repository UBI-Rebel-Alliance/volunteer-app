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

It requires multiple repositories to run the app.

## Common Pre-requisites

You will need the following pre-requisites common across all repos:
- [Yarn](https://classic.yarnpkg.com/en/)
- NVM (Node Version Manager) for your OS which install node version locally from `.nvmrc`
- PostgreSQL – [PostgreSQL Downloads](https://www.postgresql.org/download/)
  - By default `postgres` should be the super user which will be used to create databases for the project. 
  - `psql` - an interactive command-line Postgres client.
  - Ensure that Postgres service is up and running on your system.

## Components

The following components have to be up and running to start development:
1. Run local blockchain node and deploy smart contracts here.
2. Run local graph node.
3. Deploy subgraph to local graph node.
4. Run local app.

Start with creating a folder named `ubi-rebel-alliance`. From now on, this will be the root of the project directory. All repos will be cloned at the project root.

```
mkdir ubi-rebel-alliance && cd ubi-rebel-alliance
```

## Local Blockchain Node

Run the below commands in project root to start a local blockchain node and deploy the contracts.
1. Clone the repo - `git clone https://github.com/UBI-Rebel-Alliance/badges-contracts.git && cd badges-contract`
2. Install node version locally - `nvm install`
3. Install dependencies - `yarn`
4. Start blockchain node - `yarn start`
5. Deploy contracts - open another terminal window and run `yarn deploy`

## Local Graph Node

### Pre-requisites

To build and run a local graph node you need to have the following installed on your system:

- Rust (latest stable) – [How to install Rust](https://www.rust-lang.org/en-US/install.html)
- IPFS – [Installing IPFS](https://docs.ipfs.io/install/)
- First time, create database named `graph-node` in Postgres
  - Enter psql command-line interface - `psql -U postgres -h localhost`
  - Create database - `create database "graph-node";` (NOTE: don't forget the semicolen at the back)

### Run local graph node

Run below commands in project root to start local graph node:
1. Clone repo - `git clone https://github.com/graphprotocol/graph-node.git && cd graph-node`
2. Run IPFS node - `ipfs init` followed by `ipfs daemon`
3. Run below command a new terminal window to spin local graph node:
```
cargo run -p graph-node --release -- \
  --postgres-url postgresql://postgres:postgres@localhost:5432/graph-node \
  --ethereum-rpc mainnet:http://127.0.0.1:8545 \
  --ipfs 127.0.0.1:5001
```

__NOTE:__ If you are trying to run a local graph node after the initial setup you will have to drop and recreate the `graph-node` database before proceeding to run the local graph node:
- Enter psql command-line interface - `psql -U postgres -h localhost`
- Drop database - `drop database if exists "graph-node";`
- Recreate database - `create database "graph-node";`

## Deploy Subgraph to Local Graph Node

### Pre-requisites

- Graph CLI - `yarn global add @graphprotocol/graph-cli`

### Deploy subgraph

Run below commands in project root to deploy subgraph to local graph node:
1. Clone repo - `git clone https://github.com/UBI-Rebel-Alliance/badges-subgraph.git && cd badges-subgraph`
2. Install dependencies - `yarn`
3. Create local subgraph - `yarn create-local`
4. Deploy local subgraph - `yarn deploy-local`

## Run local app

### Prerequisites
- Create Postgres database named `badges_dev`
  - Enter psql command-line interface - `psql -U postgres -h localhost`
  - Create database - `create database "badges-dev";`
- Environment variables:
  - `api` - create an dotenv file `/api/.env` file with the following key-value pairs.
```
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/badges_dev
```
  - `client` - for Pinata access create a dotenv file in `/client/.env` with the below key-value pairs (NOTE: Go to [Pinata](https://pinata.cloud/) to sign up for API keys)
```
REACT_APP_PINATA_API_KEY=
REACT_APP_PINATA_SECRET_API_KEY=
```

### Run local app

Run below commands in project root to run local app:
1. Clone repo - `git clone https://github.com/UBI-Rebel-Alliance/volunteer-app.git && cd volunteer app` (NOTE: This is the root of the repo)
2. Install dependencies - `yarn setup` to install dependencies for all folders.
3. Migrate database - `cd api && NODE_ENV=development yarn migrate` to migrate database.
4. Run app - go back to root of repo with `cd ..` followed by `yarn dev` to run client and api in one terminal OR run `yarn api:dev` and `yarn client:dev` in separate terminals.
