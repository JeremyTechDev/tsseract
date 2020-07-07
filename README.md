# Tsseract 🌐

<p align="center">
  <img src='./src/assets/tsseract-logo.png' width='100' height='100' /> 
</p>

Tsseract in a social media that allows you to create content and earn money 💸 with it depending on the amount of view and interactions your posts have.

## Folder Structure 🗂️

    ├── .github                     # GitHub Settings
        ├── workflows                 # GitHub Actions files
        └── pull_request_template     # PR Description template
    ├── client                      # React Components and Containers
        ├── Components                # Function React Components
            ├── index.jsx               # Component file
            └── styles.scss             # SASS styles file
        ├── Containers                # Class React Components
            ├── index.jsx               # Container file
            └── styles.scss             # SASS styles file
        └── context.js                # App context
    ├── pages                       # NextJS Pages
    ├── resourcese                  # App Resoureces
    └── server                      # App Restful API
        ├── config                    # Env variables and URLs endpoint access
            └── env.js                  # Access to env variables
        ├── controllers               # Database controllers
        ├── helpers                   # Helpers folder
        ├── middlewares               # Express middlewares
        ├── models                    # MongoDB collections Models
        ├── routes                    # Express routes
        ├── tests                     # Unit tests
        ├── app.js                    # Express App configuration file
        └── index.js                  # Server configuration file
    ├── .dockerignore               # Docker ignored files
    ├── .env                        # Environment variables file
    ├── .eslintrc.js                # ESLint config file
    ├── .gitignore                  # Git ignored file
    ├── .prettierrc                 # Prettier config file
    ├── docker-compose.yml          # Image dependencies file
    ├── Dockerfile                  # Image file
    ├── .jest.config.js             # Jest config file
    ├── License
    ├── package-lock.json
    ├── package.json
    └── README.md

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

First, you will need to create a `.env` file at the root of the project and set some environment variables:

```
NODE_ENV=8080
DB_NAME=...
DB_ADDRESS=...
JWT_KEY=...
```

### Minimal Set-up

You can just run the app using the Docker 🐳. To do that, you will need to download and install the following Docker technologies:

- [Docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [MongoDB Compass](https://www.mongodb.com/products/compass) - **Optional** To explore and manipulate the database

After that, you only need to run the following at the root of the project in a console:

```
docker-compose up
```

### Full Set-up

You will need to have installed and running these technologies in order to run the application:

- [NodeJS](https://nodejs.org/es/) - Dependencies Management
- [MongoDB](https://www.mongodb.com/es) - Database Storage
- [MongoDB Compass](https://www.mongodb.com/products/compass) - **Optional** To explore and manipulate the database

📌 **To run the app with npm. You need to make sure that the env variable `DB_ADDRESS` is empty or set to `localhost`.**

- Clone the repo:

  ```
  git clone https://github.com/jeremy2918/tsseract-app.git
  ```

- Install dependencies:

  ```
  npm install
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
🚀 Running server on port 8080...
📡 Connected to MongoDB...
```

## Running the tests

The app uses [Jest](https://jestjs.io/) as the testing framework for this App 🧑‍💻. To run tests, just run `npm test` in the console at the project directory.

Tests are run before every push and as a [GitHub Action](https://github.com/jeremy2918/tsseract-app/actions).

## Built With

- [NodeJS](https://nodejs.org/es/) - Dependencies Management
- [React](https://es.reactjs.org/) - The Web Framework
- [NextJS](https://nextjs.org/) - React Framework
- [Express](https://expressjs.com/es/) - API service framework
- [MongoDB](https://www.mongodb.com/es) - Database storage
- [SASS](https://sass-lang.com/) - Styles Framework
- [Jest](https://jestjs.io/) - Testing Framework

## Authors

- **Jeremy Muñoz Torres** - _Project Owner & Developer_ 🧑‍💻 - [GitHub Profile](https://github.com/jeremy2918)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
