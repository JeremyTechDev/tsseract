## **User Endpoint**

The user endpoint handles all the request related to creating, fetching, updating and modifying users.

- **URL**

  ```
  /api/users
  ```

  | Gist:                                     | Route:                       | Method:  | Success Status: | Type:   |
  | ----------------------------------------- | ---------------------------- | -------- | --------------- | ------- |
  | Creates a new user                        | `/`                          | `POST`   | 200             | PUBLIC  |
  | Retrieve a user by id                     | `/:id`                       | `GET`    | 200             | PUBLIC  |
  | Retrieve a user by google id              | `/g/:googleId`               | `GET`    | 200             | PUBLIC  |
  | Toggle the follow state between two users | `/toggle-follow/:followToId` | `PUT`    | 200             | PRIVATE |
  | Delete a user account                     | `/`                          | `DELETE` | 200             | PRIVATE |
