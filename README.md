# Finmo Assignment

## Installation

- Create .env file with the following keys

  `JWT_SECRET`                 : value can be anything you wish
  
  `DATABASE_URL`              : Create a database and pass the database url here
  
  `ALPHAVANTAGE_API_KEY` : Get the API key from alphavantage website and place it here. Details of free and premium keys are mentioned [here](#alphavantage-api-keys-details)

- Installing Dependencies
  ```bash
  npm install
  ```
- Starting Redis
Easiest way to run redis is via docker. Install Docker Desktop through this [link](https://www.docker.com/products/docker-desktop/). The docker installation process takes care of adding the bin folder to path, but if not add the bin folder to path. Bin folder is located in `C:\Program Files\Docker\Docker\resources\bin` and then run the below command in the command prompt.
  ```bash
  docker compose up
  ```

## Running the app

  ```bash
  # development
  npm run start
  
  # watch mode
  npm run start:dev
  
  # production mode
  npm run start:prod
  ```

## Test

  ```bash
  # unit tests
  npm run test
  
  # e2e tests
  npm run test:e2e
  
  # test coverage
  npm run test:cov
  ```

## Alphavantage API Keys Details

- Free API Key - 25 Requests per day
- Premium API Key - 75 and more API requests per minute, No daily limits

## Stay in touch

- Author - [Yuvaraj Singh](https://www.github.com/yuvarajsingh-0)
- Website - [https://yuvarajsingh-portfolio.netlify.app](https://yuvarajsingh-portfolio.netlify.app)
- Twitter - [@yuvaraj_singh_](https://twitter.com/yuvaraj_singh_)
