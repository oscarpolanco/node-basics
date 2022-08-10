# Section 12: Sorting, pagination, and filtering(Task app)

At this moment when a `user` make a request to get a list of data from the server like a list of `tasks`; the `user` has little control of what it comes back. If the client makes a request to get the list of `tasks` of a `user`; they will get back every single `task` in the order that was created on the database and that is not ideal because when the `user` add more and more `tasks` will constantly get a transfer back and forward which is going to slow down our app so we will give a little of control to the `user` so he can choose what is coming back. In this section, we will add some new features like giving the opportunity to a client to provide a `search term` so the app gets back only `tasks` that have that `search term` and get back just `completed` or `uncompleted` list of `tasks` in another word we are going to make possible to `filter` the data and add `pagination` as well. This will help us to make a more efficient application.

Before we begin; go to the `src/index.js` file and remove the example at the bottom of the file.

## Working with Timestamps

Here we will enable the `timestamps` for our `mongo` models. When we enable this option 2 new `fields` will be added; `createdAt` and `updateAt`; that will store when a `user` is `created` and the last time that the `user` data was `updated` this will also apply to the `task` model.

- On your editor; go to the `task-manager/src/models/user.js`

We will need to add a second parameter to the `Schema` that will receive a configuration object where we can set the `timestamp` functionality.

- Send an object as a second parameter in the `schema` method

    ```js
    const userSchema = new mongoose.Schema({
        name: {...},
        email: {...},
        password: {...},
        age: {...},
        tokens: [{... }]
    }, {});
    ```

- On the configuration object that you just added; set the `timestamps` with a `true` value

    ```js
    const userSchema = new mongoose.Schema({
        name: {...},
        email: {...},
        password: {...},
        age: {...},
        tokens: [{... }]
    }, {
        timestamps: true
    });
    ```

    The default value of `timestamps` is `false` so in order to have this option we will need to use this configuration object

- Save the file
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`

Since we already have data that doesn't have a `timestamp` we will need to drop our existing database so we can have all `fields`.

- Get to `Robo 3T`
- Right-click on the `task-manager-api` database
- Select `drop database`
- Get to `postman`
- Go to the `create user` request
- Fill the `body` of the request with valid data
- Send the request
- You should see the data of the new `user` and should have the new `timestamps` fields

Now we will continue with the `task` model but that model doesn't use the `schema` method like the `user` model so we will need to refactor this model in order to have access to the `mongoose` features that will help us to set the `timestamp`.

- Get to the `models/task.js` file
- Below the `Task` constant definition; create a new constant call `taskSchema` that its value will be the `Schema` method of `mongoose`

    `const taskSchema = mongoose.Schema();`

- Get to the `Task` constant and cut the configuration object of the model
- On the place of the configuration object that you just cut; add the `taskSchema` constant

    `const Task = mongoose.model('Task', taskSchema);`

- On the `Schema` method; send the configuration object as a first parameter

    ```js
    const taskSchema = mongoose.Schema({
        description: {...},
        completed: {...},
        owner: {...}
    });
    ```

- As a second parameter of the `Schema` method; send an object with the `timestamps` property set to `true`

    ```js
    const taskSchema = mongoose.Schema({
        description: {...},
        completed: {...},
        owner: {...}
    }, {
        timestamps: true
    });
    ```

- Save the file
- Go to `postman`
- Get to the `create task` request tab
- Send on the `body` of the request valid data
- Send the request
- You should see the data of the new `task` with the `timestamps` fields

## Filtering data

Now we will add some help options for the `user` that will allow them to target better the data that they need. We will work just in one route; the `get tasks` route where you can fetch all the `tasks` because this is the only route that returns an array of data so we can potentially get a lot of documents depending on all the data on the database and on the future can make this endpoint slow and send data that the `user` doesn't actually need so we will add an option that allows the `user` the data that it needs and we will do this using the `query string` so we can add an option as part of the `URL`. Let's begin

- Get to the `task-manager/src/routes/task.js`
- Go to the `get task` request handler

On this endpoint we will still get the `tasks` normally but also will allow to `filter` by the `completed` field so we will get something like this for the `URL`:

```bash
GET /tasks
GET /tasks?completed=true
GET /tasks?completed=false
```

- Update the parameter of the `populate` parameter and send an object

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        try {
            await req.user.populate({});

            res.send(req.user.tasks);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- On the object that you send as a parameter on the `populate` method; add a `path` property with a `string` as its value and the `string` will be `tasks`

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        try {
            await req.user.populate({
                path: 'tasks'
            });

            res.send(req.user.tasks);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

    At this moment we will have the same behavior as before the difference is when we use an object as the `populate` parameter we will be able to have access to more options for the method

- Now add a new property called `match` that its value will be an object with a `completed` property set to `true`

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        try {
            await req.user.populate({
                path: 'tasks',
                match: {
                    completed: true
                }
            });

            res.send(req.user.tasks);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

    The `match` property will only return the documents that `match` certain criteria. I will receive an object with the criteria that you need for `filter` the documents on this case will return all the documents that have been `completed`

- Save the file
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Go to `postman`
- Get to the `read tasks` request tab
- Send the request
- Depending on the `task` that you set before it will be returned(Play changing the `completed` property on the ` get tasks` route)

At this moment we have a fixed object that allows us to return the `tasks` that are or are not `completed` but we actually need that this object gets its value from the `URL` if it is needed.

- On the `read tasks` request tab; add the `completed` param on the `URL`

    `{{url}}/tasks?completed=true`

- Now get to the `get tasks` route
- Create a new constant call `match` with an empty object as a value

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};

        try {
            await req.user.populate({
                path: 'tasks',
                match: {
                    completed: true
                }
            });

            res.send(req.user.tasks);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Add a condition asking if `completed` is provided as a param on the `URL` using the `completed` property that will be part of the `req.query` property if the `user` provide it on the `URL`

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};

        if (req.query.completed) {}

        try {
            await req.user.populate({
                path: 'tasks',
                match: {
                    completed: true
                }
            });

            res.send(req.user.tasks);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

Now we will need to set the value of the `completed` property inside of the `match` object but we can't use directly the value that we will have on `req` because this will be a `string` and we need a `boolean` so we will need to turn the `string` that we get into the `boolean` that we need.

- Call the `completed` property on the `match` object and add as its value the following

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match: {
                    completed: true
                }
            });

            res.send(req.user.tasks);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

    Here we will compare the `string` that we get with the `string true` and this will return a `boolean` with the correct value

- Then eliminate the object from the `match` property of the `populate` method

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match
            });

            res.send(req.user.tasks);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

For the next part is better that all have the same `tasks` for a `user` in order to get the same results when we test everything that we need on this and the following sections so we will `delete` all the `tasks` of the current `user` and create some new.

- Go to `postman`
- Get all `_id` of all `tasks` of the current `user`
- Get to the `delete task` request tab
- Using all the `_id` on the `delete task URL` to `delete` all `tasks`
- Get to the `create task` request tab
- Create 4 `tasks` with the following specifications:

    ```JSON
    {
        "description": "first",
        "completed": true
    }

    {
        "description": "second",
        "completed": false
    }

    {
        "description": "third",
        "completed": true
    }

    {
        "description": "fourth",
        "completed": false
    }
    ```

- Get to the `read task` request `tasks`
- Remove the `completed` param of the `URL`
- Send the request
- You should see all `tasks`
- Add the `completed` param with a `true` value

    `{{url}}/tasks?completed=true`

- Send the request
- You should see the `first` and `third tasks` returned
- Update the `completed` param with a `false` value

    `{{url}}/tasks?completed=false`

- Send the request
- You should see the `second` and `fourth` returned

## Pagination data

We are going to continue adding options on the `get tasks` endpoint that the `user` can use at this case we will add `pagination` options but first, let's see an example.

- Go to your browser
- Get to google.com
- On the search input; type `paginations examples`
- You will see that you have a lot of results for this search
- Scroll to the bottom and you will see that you don't have all the results of the search just a couple then also you can go to the next page of results by clicking the numbers at the bottom of the page

This is what we call `pagination` which is the idea to create `pages` of data that can be requested so you don't fetch everything on a single request. For us, we will need to make available a way that the `user` send the backend the specific `page` of data that it will need to fetch and we will do that by adding 2 options that are `limit` and `skip`. Here are the new options on the `URL`

```bash
// GET /tasks?limit=numeric_value&skip=numeric_value
```

The `limit` option will allow us to `limit` the numbers of results that we are going to get back from every request regarding the `page` of data that we are. The other option that we will have is the `skip` option which will allow us to iterate over pages.

Now we will need to let `mongoose` know these 2 options when it searches the data.

- Get to the `task-manager/src/routes/task.js`
- Go to the `get tasks` route handler
- On the `populate` method; add a new property call `options` with an empty object as its value on the configuration object that was sent as a parameter

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {}
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

- On the new `options` property object; add a `limit` property with a value of `2`

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: 2
                }
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

- Save the file
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Go to `postman`
- Get to the `read tasks` request tab
- Send the request
- You should see only 2 results(first and second `task`)

Now that we see that `limit` works; we will need to take the `limit` value from a param of the `URL` and you may remember that we receive a `string` value so we will need to convert it to a `number`

- Get to the `get task` handler
- Remove the `2` value of `limit`
- Use the `parseInt` method ad the value of `limit`

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt()
                }
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

    The `parseInt` method will convert a `string` that contains a `number` to an actual `integer`

- Now send as `parseInt` parameter the `limit` property of `req.query`

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit)
                }
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

    Now if the `limit` is not provided or non a `number`; `mongoose` will ignore the value

- Save the file
- Go to `postman`
- Get to the `read tasks` request tab
- Send the request
- You will see that you have 4 results
- Add a `limit` of `3` on the `URL` of the request

    `{{url}}/tasks?limit=3`

- Send the request
- You should see `3` results back

Now let's work with the `skip` option

- Get to the `get tasks` handler
- Add a `skip` property to the `options` object with the `parseInt` method as its value and as the parameter of the `parseInt` method will be the `skip` property of `req.query`

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip)
                }
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

- Save the file
- Go to `postman`
- Get to the `get tasks` request tab
- Add a `limit` of `2` and `skip` of `0` on the request `URL`

    `{{url}}/tasks?limit=2&skip=0`

- Send the request
- You should see just `2` results
- Change the `skip` value to `4`(It will go to the `3` page of data)
- Send the request
- You should see an empty `array` because the `3` page doesn't exist since there are only `4 tasks`

## Sorting data

In this section, we continue with another option in this case `sort` the data. When this option is used the data will appear in the order that we choose like by the `task` date of creation or if a `task` is `completed` or not. We will have the following `URL` structure:

```bash
GET /tasks?sortBy=field:order
```

Here we see the `sortBy` option that will count with 2 parts divided by `:`(Could be anything you need but for the example, we will use this). The first part of the value will be the `field` that we want to take into consideration to order the data but this is not enough so we will add the second part of the value that will be the `order` that the data will have in this case `ascending` or `descending` in their short form: `asc` or `desc`.

- Get to the `task-manage/src/routers/task.js`
- Go to the `get tasks` handler
- Add a new property call `sort` on the `populate` configuration object with an empty object as its value

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort: {}
                }
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

- On the `sort` object; add a property called `createdAt` with a value of `-1`

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort: {
                        createdAt: -1
                    }
                }
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

    The property of the `sort` object represents the `field` that we will take into consideration for the `sorting` and `-1` represent the `order` that we wanna `sort` where `-1` is `descending` and `1` is `ascending`

- Save the file
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Go to `postman`
- Get to the `read task` request handler
- Send the request
- You should see the `tasks` from the `fourth` one(first to show) to the `first` one(last to show)

Now that we see how the `sort` property work; we will need to make the request dynamic instead of a static value

- On the `read tasks url`; add the `sortBy` option with a `createdAt:desc` value

    `{{url}}/tasks?sortBy=createdAt:desc`

- Get to the `get task` handler
- Create a new constant call `sort` that has an empty object as its value below the `match` constant

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};
        const sort = {};

        if (req.query.completed) {...}

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort: {
                        createdAt: -1
                    }
                }
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

Now we will need to create a condition to check if the `user` provide the `sortBy` option and if it does convert the value into something that we can use on the `populate` method

- Below the `completed` condition; add a new condition that checks if the `user` provide the `sortBy` param

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};
        const sort = {};

        if (req.query.completed) {...}

        if(req.query.sortBy) {}

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort: {
                        createdAt: -1
                    }
                }
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

- Now inside of the `sortBy` condition; create a new constant call `parts` and its value will be the result of the `split` of the options that we receive on the `sortBy` param

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};
        const sort = {};

        if (req.query.completed) {...}

        if(req.query.sortBy) {
             const parts = req.query.sortBy.split(':');
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort: {
                        createdAt: -1
                    }
                }
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

    The `split` method receives a `string` that represents the character where a `string` will be divided; in this case `:` and it will return an `array` where each position will have a part of the original `string` without the character that you send as a parameter to the `split` method

- Now use the `square brackets` notation on the `sort` object to add the first position of the `parts` array(which will be `createdAt` in this case) and will have the following value

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};
        const sort = {};

        if (req.query.completed) {...}

        if(req.query.sortBy) {
             const parts = req.query.sortBy.split(':');
             sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort: {
                        createdAt: -1
                    }
                }
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

    The new value of `sort` is a `ternary` operator. It is called the `ternary` operator because it counts by `3` parts: a condition; the first value and the second value. The `ternary` operator will return the first value when the condition y `true` and the second value otherwise. In this case, will check if the `parts string` match with `desc` and will return `-1` if it is the case

- Remove the `sort` value in the `populate` method

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        const match = {};
        const sort = {};

        if (req.query.completed) {...}

        if(req.query.sortBy) {
             const parts = req.query.sortBy.split(':');
             sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }

        try {
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            });

            res.send(req.user.tasks);
        } catch (e) {...}
    });
    ```

    This is because the `sort` objects have the same name as the `sort` property

- Save the file
- Get to `postman`
- Go to the `read tasks` request tab
- Send the request
- You should see that you have the `tasks` return from the last one created to the first one

Now we have multiple options that we can use separately or together on the `read tasks URL` so the `user` has some control over the data that it will receive.
