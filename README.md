# Tsseract App

<p align="center">
  <img src='./src/assets/tsseract-logo.png' width='100' height='100' /> 
</p>

Tsseract in a social media that allows you to create content and earn money with it depending on the amount of view and interactions your posts have.

## Folder Structure

    ├── .github                     # GitHub Settings
        ├── workflows                 # GitHub Actions files
        └── pull_request_template     # PR Description template
    ├── public                      # React Public folder
        └── index.html                # HTML5 file
    └── src
        └── app                     # Front-end
            ├── Components            # Function React Components
                ├── index.jsx           # Component file
                └── styles.scss         # SASS styles file
            ├── Containers            # Class React Components
                ├── index.jsx           # Container file
                └── styles.scss         # SASS styles file
            └── context.js            # App context
        ├── assets                  # App images and other resoureces
        ├── config                  # Env variables and URLs endpoint access
            └── env.js                # Access to env variables
        ├── helpers                 # Helpers folder
        ├── server                  # Back-end
            ├── controllers           # Database controllers
            ├── middlewares           # Express middlewares
            ├── models                # MongoDB collections Models
            ├── routes                # Express routes
            ├── app.js                # Express App configuration file
            └── index.js              # Server configuration file
        └──  tests                  # Unit tests
    ├── .env                        # Environment variables file
    ├── .eslintrc.js                # ESLint config file
    ├── .gitignore                  # Git ignore file
    ├── .prettierrc                 # Prettier config file
    ├── .jest.config.js             # Jest config file
    ├── License
    ├── package-lock.json
    ├── package.json
    └── README.md

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

- [NodeJS](https://nodejs.org/es/) - Dependencies Management
- [MongoDB](https://www.mongodb.com/es) - Database storage

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
- [NodeJS](https://nodejs.org/es/) - Dependencies Management
- [MongoDB](https://www.mongodb.com/es) - Database storage
- [SASS](https://sass-lang.com/) - Styles framework
- [Express](https://expressjs.com/es/) - API service framework
- [Jest](https://jestjs.io/) - Testing framework

## Authors

- **Jeremy Muñoz Torres** - _Project Owner_ - [GitHub Profile](https://github.com/jermy2918)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
