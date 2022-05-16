# KrakenFlex Back End Test Solution

## What I've Produced

I've produced a small program which solves the problem set out.

My solution consinsts of an [api client](./src/api/), [some types](./src/types/), a short [script](./src/main.ts) which completes the task, and appropriate tests.

All of the requirements are satisfied, all errors are handled.

## How to run

### Setup

Set envaironment variables for API_KEY and BASE_PATH. For local development make a `.env` file in the root of the project similar to the one below.

```
API_KEY="AAAAAAAAAAAAAAAAAA111111111111111"
BASE_PATH="https://api.krakenflex.systems/api-address"
```

Install the dependencies by running

```
npm install
```

### Run

To run, use the command

```
npm start
```

### Run Tests

To run, use the command

```
npm test
```
