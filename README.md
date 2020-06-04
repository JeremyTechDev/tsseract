# Tsseract App

<img src='./src/assets/tsseract-logo.png' width='75' height='75' position='center' />

Tsseract in a social media that allows you to create content and earn money with it depending on the amount of view and interactions your posts have.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

- [NodeJS](https://nodejs.org/es/)
- [MongoDB](https://www.mongodb.com/es)

### Installing

- Clone the repo:

  ```
  git clone https://github.com/jermy2918/tsseract-app.git
  ```

- Install dependencies:

  ```
  npm install
  ```

- Set some environment variables

  ```
  NODE_ENV=5000
  DB_NAME=...
  JWT_KEY=...
  ```

- To run the client side of the app:

  ```
  npm start
  ```

- To run the server of the app:

  ```
  npm run server
  ```

- Or you can start both in development:

  ```
  npm run dev
  ```

You should get some of the following logs on the console:

```
🚀 Running server on port 5000...
📡 Connected to MongoDB...
```

## Running the tests

We use [Jest](https://jestjs.io/) as the testing framework for this App. To run tests, just run `npm test` in the console at the project directory.

Tests are run before every push and as an [Action in GitHub](https://github.com/jermy2918/tsseract-app/actions).

## Built With

- [React](https://es.reactjs.org/) - The web framework used
- [NodeJS](https://nodejs.org/es/) - Dependency Management
- [MongoDB](https://www.mongodb.com/es) - Database storage
- [SASS](https://sass-lang.com/) - Styles framework
- [Express](https://expressjs.com/es/) - API service framework
- [Jest](https://jestjs.io/) - Testing framework

## Authors

- **Jeremy Muñoz Torres** - _Project Owner_ - [GitHub Profile](https://github.com/jermy2918)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
