# Task App

This API will help you to manage the data of the `tasks` that you need. Here you just need to create a `user` then you will be able to `create`, `read`, `update`, and `delete` the `tasks` that you store using this API. For the moment we don't have a `frontend` implementation this is just the `backend`.

## Requirements

- [NodeJs](https://nodejs.org/en/)
- [Sendgrid Account](https://sendgrid.com/)
- [MongoDB](https://www.mongodb.com/) installed locally or use [Mongo Atlas](https://www.mongodb.com/atlas/database)

## Setup environment

- Get to the `config` directory at the root of this project
- Create a new file called `dev.env`
- Add the following data(The name of the variables need to be an exact match of what is shared below):

    ```bash
    PORT=3000
    SENDGRID_API_KEY=your_secret_sendgrid_api_key
    SENDER_EMAIL=your_sender_email
    MONGODB_URL=your_mongodb_connection_string
    JWT_SECRET=any_sequence_of_characters
    ```

    The `MONGODB_URL` connection string could be `mongodb://127.0.0.1:27017/your-database-name` if have a local machine installation or `mongodb+srv://<username>:<password>.mongodb.net/your-database-name?retryWrites=true&w=majority` for `mongodb atlas`.

- If you got a local `MongoDB` installation; run your local instance of `MongoDB` using:

    `sudo mongod --dbpath /path_on_your_machine/mongodb_directory`

- On the root directory of this project; install all dependencies using: `npm install`
- Run your local server using: `npm run dev`(will automatically be on `watch` mode)

## Endpoints

<details>
    <summary>User's endpoints</summary>

- `POST /users`

    Create a user and send a welcome email to the user created

    http://localhost:3000/users

    ```json
    {
        "name": "Name",
        "email": "user@email.com",
        "password": "MyPass11"
    }
    ```

    * `name`: required
    * `email`: unique; required; need to match the specification of [npm validator](https://www.npmjs.com/package/validator)
    * `password`: required; min length `7` characters; can't include the word `password`

- `POST /users/login`

    Authenticate user

    http://localhost:3000//users/login

    ```json
    {
        "email": "user@email.com",
        "password": "MyPass11"
    }
    ```

- `POST /users/logout`

    Close the current session of the user

    http://localhost:3000/users/logout

- `POST /users/logoutAll`

    Close all user's sessions

- `GET /users/me`

    Read user profile

    http://localhost:3000/users/me

- `PATCH /users/me`

    Update user profile

http://localhost:3000/users/me

    ```json
    {
        "name": "Name",
        "email": "user@email.com",
        "password": "MyPass11"
    }
    ```

    You don't always need to send all the fields; you can just send the valid field that you need to update.

- `DELETE /users/me`

    Delete the current user profile and all tasks related to it also send a goodbye email

    http://localhost:3000/users/me

- `POST /users/me/avatar`

    Add profile image to the current user

    http://localhost:3000/users/me/avatar

    * The size of the file should be under `1MB`
    * The file should have one of these extensions: `.jpg`; `jpeg` or `.png`

- `GET /users/me/avatar`

    Fetch the current user profile image

    http://localhost:3000/users/me/avatar
</details>

<details>
    <summary>Task's endpoints</summary>

- `POST /tasks`

Create a task and associate it with the current user

http://localhost:3000/tasks

```json
{
    "description": "My task description",
    "completed": false
}
```

* `description`: string; required
* `completed`: boolean

- `GET /tasks`

    Get all tasks related to a user depending on the search criteria

    * `GET /tasks`

        Get all tasks related to the current user

        http://localhost:3000/tasks

    * `GET /tasks?limit=value&skip=value`

        Get tasks per page. The `limit` param will set the maximum number of tasks shown per page and the `skip` param will set the number of tasks that we are going to `skip` in order to show the correct page


        http://localhost:3000/tasks?limit=1&skip=1 (One task per page and show the second task)

    * `GET /tasks?sortBy=field:order`

        Get tasks sorted by the field sent on the param. The `order` can be `desc`(for descendent) or `asc`(for ascendent)

        http://localhost:3000/sortBy=createdAt:desc (sort by the time the task was created)

- `GET /tasks/:id`

    Get a single task of the current user by it id

    http://localhost:3000/tasks/:id

- `PATCH /tasks/:id`

    Update a single task of the current user by its id

    ```json
    {
        "description": "My task description",
        "completed": true
    }
    ```

    You don't always need to send all the fields; you can just send the valid field that you need to update.

- `DELETE /tasks/:id`

    Delete a task of the current user by its id
</details>
