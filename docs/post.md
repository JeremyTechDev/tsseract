## **Posts Endpoint**

The post endpoint handles .

- **URL**

  ```
  /api/posts
  ```

  | Gist:                                                            | Route:          | Method:  | Success Status: | Type:   |
  | ---------------------------------------------------------------- | --------------- | -------- | --------------- | ------- |
  | Create a new post                                                | `/`             | `POST`   | 200             | PRIVATE |
  | Retrieves all posts                                              | `/`             | `GET`    | 200             | PUBLIC  |
  | Adds a new comment into a post                                   | `/c/:postId`    | `POST`   | 200             | PRIVATE |
  | Toggles the like state of the authenticated user in a post by id | `/like/:postId` | `PUT`    | 200             | PRIVATE |
  | Retrieves all the posts of a given user                          | `/by/:id`       | `GET`    | 200             | PUBLIC  |
  | Retrieves the feed of the authenticated user                     | `/feed/`        | `GET`    | 200             | PRIVATE |
  | Deletes a post by id                                             | `/:postId`      | `DELETE` | 200             | PRIVATE |
