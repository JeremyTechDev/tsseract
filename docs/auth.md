## **Auth Endpoint**

The auth endpoint handles the user token, login and logout of the users accounts.

- **URL**

  ```
  /api/auth
  ```

  | Gist:                                                      | Route:    | Method: | Success Status: | Type:   |
  | ---------------------------------------------------------- | --------- | ------- | --------------- | ------- |
  | Returns the data contained the user token                  | `/`       | `GET`   | 200             | PRIVATE |
  | Authenticate an existing or new account signed with google | `/g/`     | `POST`  | 200             | PUBLIC  |
  | Create a new token for the user (Login)                    | `/login`  | `POST`  | 200             | PUBLIC  |
  | Removes the token to the authenticated user (Logout)       | `/logout` | `POST`  | 200             | PRIVATE |
