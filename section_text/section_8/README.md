# Section 8: Application Deployment(Weather App)

At this moment the app is running perfectly on your local machine but the problem is exactly that because no one can have access to the application. In these sections, you will see how to `deploy` the application into a `production` server so anyone with the app `URL` can have access to use it. We will use 3 tools: `Git`, `Github` and `Heroku`.

- [Git](https://git-scm.com/): `Git` will allow us to put our application into a `version control` that going to allow us to track the changes to our app.
- [Github](https://github.com/): Will backup our code and collaborate with others
- [Heroku](https://www.heroku.com/): Will give us everything we need to `deploy` our `nodeJS` application to a `production` server so our app is accessible from a `URL`

## Joining Heroku and Github

Before to begin working with the `deploy` of the application we will need to join the 2 tools that will help us to make this possible that are `Heroku` and `Github`.

`Github` is a software development platform to give us all the tools necessary to manage software development projects whether we are working by ourselves or with others. Why `Github`? Is because it makes it easy to manage our projects; track code changes over time to collaborate with others and track `bugs`, `issues`, and `features requests`. Also with `Github` you can host `public` or `private` projects depending is you want or not share to them with others. Actually, all the `npm modules` that we use their code is hosted by `Github`.

`Heroku` will give us all the infrastructure needed to actually `deploy` our `nodeJs` project to a `production` server. `Heroku` is not a `nodeJs` specific; you can use `Heroku` with other languages.

To create accounts get to [Github](https://github.com/) and click on the `Sign up` button then fill the form and that it. Like with did on `Github` go to [Heroku](https://www.heroku.com/) and click on the `Sign up` button then complete the registration form. If you already have an account for any of these sites you can use it and we are going to use the free accounts no need to add a paid account.

We will need some tools that will make it easy to use `Heroku` so we will be downloading the `Heroku command line tool` that will make some commands available on our terminal that will help us to `deploy` our app easily. These are the steps:

- On your browser go to https://devcenter.heroku.com/articles/heroku-cli
- Get to de download section
- Download the one for your operating system
- Use the installer for the installation
- Open your terminal(If is already open; you will need to restart your terminal)
- Type the following command: `Heroku -v`
- You should see the version of `Heroku` that is installed

Now we will `login` to `Heroku` from your terminal to manage everything from the terminal.

- On your terminal use the following command: `Heroku login`
- Press any key on your keyword
- You will be redirected to your browser
- Login with your `Heroku` account(If you are already login on your browser just clicking the login button will be enough)
- Close the tab
- On your terminal, you should see that you are login using your `Heroku` account email

## Version Control with Git

At this moment we have access to a `Github` and `Heroku` account but at the end of the day, those accounts need access to our project code. `Heroku` will need access to the project code to `deploy` our app and `Github` need access to our project code to show it on the `repository` homepage so we can collaborate with others, track code changes over time, or manage issues on our application and for this, we will use `version control` with [Git](https://git-scm.com/).

`Version control` allows you to manage the version of your application over time. Imagine that you are adding features to an application; a `version control` will help you to track those changes creating `save points` for various `versions` of the application. For example, if you have an application that is in use and you add a new feature and `deploy` your app with the new feature so everyone can use it but after that, you realize that is a bug and you will need to get back to a previews state of the application in other to fix the bug and `deploy` it again; without `version control` this is a little bit difficult because the only `version` that you have is the last one with the bug included things that make it difficult to revert to a previews state but with `version control` you can do this on a second.

For this example, we will use `Git` that is easy to use and you can use it regardless of any language that you use.

### Installing Git

- On your browser go to [Git page](https://git-scm.com/)
- Click on the `download` button that is on the page
- Follow the installer steps
- Go to your terminal(Restart your terminal if you already have the terminal open; if you are on windows install the `git bash`)
- Use the `version` flag to check if `git` is correctly installed it: `git --version`
- You should see the `version` of `git`(Make sure that you are over the `version` 2)

## Exploring Git

Let's see a little overview of how `git` works.

Let imagine that we have a new project and create a new folder for the project and decide that I'm going to use `git`. The first thing we do is to initialize `git` on the folder with a command(Later we will see the actual command) so in other to work with `git` we first need to initialize where we want to use it. When we initialize `git` we can begin to add files to our project.

By default `git` don't track files that you add to your application so you will need to run commands to tell `git` that you want to track some specific files so if you add some new files to the project `git` will be considered then as `untracked files`. Let's imaging that we add to files on the folder that we created; an `app.js` script and a `markdown` file call `readme.md`

```
---------------
Untracked files
---------------
src/app.js
readme.md
```

As we mentioned by default the new files are considered `untracked files` and we can begin the process of getting into `commits`. When something is `committed` to `git` and will be tracking those files but this is a 2 step process. The first thing that we do is to `staged` those `changes` that will be the step that we put things that we wanna `save` with all the things that we wanna bundle into a `commit`.

```
---------------                      --------------
Untracked files                      Staged changes
---------------                      --------------
src/app.js      ==> add command ==>
readme.md
```

We will run a `add git command` that will allow us to take one or more files that are `untracked` and convert them to `staged changes`; in this case, we will `track` the `src/app.js` file

```
---------------                      --------------
Untracked files                      Staged changes
---------------                      --------------
readme.md       ==> add command ==>  src/app.js
```

As we mentioned we `staged` the things that we want so we can leave the `readme.md` file `untracked` and `staged` just the `app.js` file also the `staged changes` are the things that we are going to add to the next `commit` so the next step will be using a `git commit command` that will allow us to take all the files of the `staged changes`; in this case `src/app.js`; and bundle it on a single `commit`

```
---------------                      --------------                         -------
Untracked files                      Staged changes                         Commits
---------------                      --------------                         -------
readme.md       ==> add command ==>                 ==> commit command ==>  commit A
```

Each `commit` has a unique identifier. At this moment we have a single `commit` that is `tracking` some changes of the project and a single `untracked` file. Now let's say that we want to add a new script int our project.

```
---------------                          --------------                         -------
Untracked files                          Staged changes                         Commits
---------------                          --------------                         -------
readme.md            ==> add command ==>                 ==> commit command ==>  commit A
src/utils/geocode.js
```

The new file is added to the `untracked` files; in this case the `geocode` script with the `readme.md` but we also need to use the functions that we just added in the `app.js` file that is already `tracked` by `git`. When we add some changes on a file that is already `tracked` by `git` we are doing an `unstaged change` in other words a file that is already added on a previews  `commit` and you make a change to it `git` will categorize it into `unstaged changes.

```
---------------      ----------------                     --------------                         -------
Untracked files      Unstaged changes                     Staged changes                         Commits
---------------      ----------------                     --------------                         -------
readme.md            src/app.js       ==> add command ==>                 ==> commit command ==>  commit A
src/utils/geocode.js
```

At this point, we need to `commit` to our changes, and that is a 2 step process. The first one is to add the files that we want so they are `staged changes` in this case we will add the `geocode` file and the changes of the `app.js` file.

```
---------------      ----------------                     --------------                              -------
Untracked files      Unstaged changes                     Staged changes                              Commits
---------------      ----------------                     --------------                              -------
readme.md                             ==> add command ==> src/app.js           ==> commit command ==> commit A
                                                          src/utils/geocode.js
```

As you see we added only the changes that we need and we still don't `track` the `readme.md`. Finally, we can use the `git commit command` to bundle all our changes.

```
---------------      ----------------                     --------------                        -------
Untracked files      Unstaged changes                     Staged changes                        Commits
---------------      ----------------                     --------------                        -------
readme.md                             ==> add command ==>                ==> commit command ==> commit B
                                                                                                commit A
```

Now we have 2 `commits` for our project so we can use those `commits` to reverse our application to that point of time in our case we have the `commit A` that have just the `app.js` file than the `commit B` that have `app.js` file in it updated state and the `geocode` file. As we add new features to the project you will add some more `commits` and you will have the ability to move to any point when you need it.

## Integrating git

In this section, we will assume that you don't have any track files of the `web-server` project so let's get to initialize `git` on the project.

As we mentioned before if we are going to use `git` we will need to use a command to initialize it and is important to mention that we need to do it on the directory that we want to track in this case the `web-server` directory, not in a parent directory or a nested one.

- On your terminal; go to the `web-server` directory
- Type the following command: `git init`
- You will see a message output like this: `Initialized empty Git repository in path/to/your/project/.git`

`Git` create a new directory called `.git` and this directory is where `git` store everything that makes your `git` project so when we add new files or create new `commits` will be stored on data structure in the `.git` directory. We don't go to alter this directory instead is `git` that is in charge of altering this directory every time you run `git` commands. Another thing you may notice is that it mentions that a `git repository` is created; a `repository` is a place where a thing is stored which means that everything relate to `git` is stored in a `git` repository. In this case, we got a local `repository` store on the `.git` directory but later we will have remote `repositories` when we work with `Github` and `Heroku` where our code is backup.

You may not see the `.git` directory because a lot of editors hide this directory by default; if you want to see it; you just need to search the configuration on your editor that hides directories but as we mentioned before we will not touch this directory.

Now we will use the behavior of the `vscode` editor to see some of the behaviors that you will see for `Git`. After you initialize the `git` project on the `web-server` directory; you will see on the sidebar where it shows all the files that all of that directory is in `green` color; this is the convention for the files that are `untracked` so they are not been committed yet(This is a convention for the editors). From here we will continue the `git` to `track` the files

- On your terminal; use the following command: `git status`

The `status` command will show us the current `status` of our files. Here you will see all the files of the `web-server` directory that are not `track` yet in `red` color this is the convention that `git` uses for the `untracked` file. Now that we see all the files that we want we could continue with the add process but there is a directory that we don't want to `track` that is the `node_modules` directory because this is a generated directory and we can get back to its exact state using the `package.json` file and the `npm install` command so `git` don't need to know about this directory.

- On your editor; go to the `web-server` directory
- Create a new file called `.gitignore`(Need to add this exact name in order to `git` recognize the file)
- Add the name of the thing that we want to ignore; in this case the `node_modules` directory on this newly created file: `node_modules`
- Save the file
- Get to your terminal and use the `git status` command again
- You should see that the `node_modules` directory doesn't appear on the `untracked` files anymore because `git` is ignored it

On `vscode` you will see that the `node_modules` directory turns into `grey` and this is an editor's convention for ignoring files. At this moment we have all the files that we want to track for the application so we are ready to do our first `commit`.

- On your terminal; run the following command: `git add src/`

When we use the `git add` command we will need to at the thing we want to add that are `untracked`; in this case, we are adding the `src` directory so all the files on this directory are on the `staged` area meaning that all of then are ready to be `committed`.

- Run the `git status` command again
- You should see that the `src/` directory is not on the `untracked` file sections; they are moving to the `staging` area with the title `Changes to be committed` and they are on `green`(Convention for the `staged` files on `git`)
- Since we want to `commit` all the files we can continue adding the `untracked` files but instead of doing one to one we use a shortcut that is the following: `git add .`
- Run the `git status` again
- You will see all the files are `staged` so we can create the `commit`
- To create a `commit` we use the `git commit` command with the `-m` flag to add a message for the `commit` that describe wanting change but this is our first `commit` so for the convention we put `Init commit` like this: `git commit -m"Init commit"`
- You will see a large output but at the beginning, you will see the number of files that change and for all files, you will see `create` because they are not `tracked` before this `commit`

On `vscode` after you `commit` your changes the color of the files will get back to the normal color that you see before initializing the `git` repository. Now, let's add one more update.

- On your editor; go to the `app.js` file on the `web-server/public/js` directory
- Remove the console on the first line and move the first constant to the top of the file
- Save the file

On `vscode` you will see immediately after saving the file that the color of the `web-server` directory to the `js` file that we just update the change to `orange` this is the convention that we change a `track` file for editors.

- Get back to your terminal and run `git status`
- You will see that that the `app.js` file is in `red` but is in a new section called `Changes not staged for commits`. This means that we update a file that is already `track` but this update is not `committed` yet
- Run the add command: `git add .`
- Run `git status` again
- You should see that the `app.js` is `green` and is on the `Changes to be committed` section
- Now run the `commit` command with a message that describes the update: `git commit -m"Remove unnecessary console.log call"`

## Setting up SSH keys

At this moment you have created your `Github` account, make some commits, and are ready to upload those `commits` to `Github` and `Heroku` so they can access the latest version of our code but we need a secure way to transfer our code to those platforms and for this, we will use `SSH`. The `SSH` letters stand for `Secure Shell` and give users a secure way to communicate with another machine.

In this section we will set an `SSH key pair`; this is a set of 2 files with which we will use to facilitate secure communication. Let's get into the configuration. If you are on `Mac` or `Linux` you can do it from the terminal but on `Windows` you will need to download the `git bash` that we mentioned on the `Install git` section.

- Go to your terminal
- First; we will need to see if we got `ssh keys` on our machine and for this, we will use the following command

    `ls -a -l ~/.ssh`

    - `ls`: Allow us to list the content of a directory
    - `-a`: Make sure that all hidden files or folder shows up
    - `-l`: Change the format of the output of the command so we can read it easily. Will put everything top to bottom instead of using columns
    - `~/.ssh`: This is the path of the file that we want to see. The `~` is a shortcut for the user directory and the end represent that we are looking for the `ssh` folder

    There is a change that you don't have this directory so the command will fail but this is good because we will add the directory. If you have a file called `id_rsa` and another called `id_rsa.pub` that means that you already have a set of `ssh` keys and you can choose to use those instead of creating new ones. For the following steps, we will assume that you don't have `ssh` keys so you can see all the processes.

- Now use the following command:

    `ssh-keygen -t rsa -b 4096 -C "your_email@addres.com"`

    - `ssh-keygen`: This Will allow us to generate the `ssh` key pair
    - `-t`: Stand for `type` of protocol that we are going to use to generate the key
    - `rsa`: Algorithm that help users to generate a secure key
    - `-b 4096`: The `b` Stand for `bits` then the amount of `bits` for the key
    - `-C "your_email@addres.com"`: Make sure that the `C` is capital no lowercase and allow us to put a comment for the key. Generally, we put our `email` account

- Then it will show you a question for a file to save the key; just click enter to use the default one
- We won't provide a `passphrase` so click enter again
- Click enter again
- You will see that the key is created
- Now run the first command that we use on this section: `ls -a -l ~/.ssh`
- You will see that now you have an `id_rsa` and `id_rsa.pub` files

    The `id_rsa` is a secret file that you will not share with anyone and the other is a public file that we are going to be sharing with `Github` and `Heroku` so we can secure the communication of our machine with their servers

- Now we need to make sure that the program is running with the following command:

    `eval "$(ssh-agent -s)"`

    For windows:

    `eval $(ssh-agent -s)`

    This command will try to start up the `ssh-agent` and if is already running will tell use the `process id`
- You should see an output like this: `Agent pid ###`(The `#` represent numbers)
- Then we need to register the file with:

    `ssh-add -K ~/.ssh/id_rsa`

    The `-K` flag will make sure that things get added correctly on `Mac` for `Windows` and `Linux` we don't need it

    `ssh-add ~/.ssh/id_rsa`

- You will see that the file is added

## Pushing code to Github

Now that we have the `ssh` on your local; you can begin to push your code to those third-party services so we can continue the process of sharing the code on `Github` and deploy our app with `Heroku`. Let's get into the push process.

- On your browser go to https://github.com/
- Login with your account
- You should be on the front page of the `Github` page

We already have a local `repository` that we did on a previews section so we will do the same on the `Github` page and that is the way that `Github` will have access to our code.

- On the top right of the page; click on the `plus` button
- On the dropdown menu; click on create a repository
- You will be redirected to a form
- Fill the `repository name` with a name that makes sense to you
- Now choose between the `public` and `Private` checkboxes

    The `public` option will allow anyone to see your `repository` and the `private` one will hide the `repository` from the public but you can choose some users to see it in a limited number for the free version

- Click on the `create repository` button
- A new `repository` should be created and you are on a page with some instructions

On the instructions, you will see a couple of titles but we are interested in the `push an existing repository from the command line`. In that title we have 2 commands that we will use to push our existing code to `Github`; on the first one:

`git remote add origin repository.url`

On this line, we use the `remote` command. A `remote` represent a version of your project that is hosted somewhere in our case we will have our code hosted on the `Github` and `Heroku` servers. Then we use the `add` command to as its name said `add` the `URL` of the host of the code. Next, we choose the name of the `remote`; for a convention, we use `origin` for the first `remote` but we can put everything we want. Finally, we have a long string that represents your `remote` repository in this case `Github` provides this.

- Copy the `remote` command
- Go back to your terminal
- Be sure that you are at the root of your project(This is important because you need to be in the right place)
- Run the `remote` command that you copy early

Now we have a `remote` call `origin` that we can `push` to send our code to `Github` so as we create `commits` we will `push` those `commits` to `Github` making sure that we have the latest version and this will guide us to the second command that we have on the `Github` page:

`git push -u origin main`

On this line we use the `push` command that will allow us to `push` our `commits` to a giving `remote` then the name of the `remote` in this case called `origin` and finally the `branch` name and in this case is the default `branch` that `Github` provide to our call `main`. We actually can run this code yet because `Github` is not sure who is pushing the code so we will need to use the `ssh` key that we create before.

- Go back to the `Github` page
- Click on the profile picture at the top right
- On the dropdown menu; choose `settings`
- At the left sidebar; choose `SSH and GPG keys`
- Click on the `New SSH key` button
- Now add a name for the `SSH` key on the `title` input
- Now we need the actual `ssh` key so go to your terminal
- Use the following command: `cat ~/.ssh/id_rsa.pud`
    - `cat`: Concatenate the content of a file out to the terminal
    - `~/.ssh/id_rsa.pud`: File path
- We will get the content of the file on the terminal so grab all the output and copy it
- Get back to the `Github` page
- Paste the `ssh` content on the `key` input
- Click on the `Add SSH key` button
- You will see that the `key` is created and on said that is never been used
- Now we will test the connection; get back to your terminal
- Run the following command: `ssh -T git@github.com`

This command will test our `ssh` connection to the `Github` servers

- You will get a message with a question(This is not an error); type `Y` and continue
- Finally, you will get a message like `Hi yourGithubUsername! You've successfully authenticated, but Github does not provide shell access`

If you receive that message everything is good to go!!!

- Get back to the `Github` page
- Click on the top left `Github` icon
- On the search input at the left  sidebar; search the repository that we created before
- You will see that we still have the instructions that we saw before
- Get to your terminal
- Now we can run the `push` command: `git push -u origin main`
- You will see logs that end will end with: `Branch 'main' set up to track branch 'master' from 'origin'`
- Get back to the repository page on `Github`
- Refresh the page
- You will see that we have all files for our project!!!

## Deploying node.js to Heroku

Now that we push our code to `Github` we now can go to the next step of the process that is to push the code to `Heroku`. This will allow us to deploy our `node.js` application to `production` so at the end of this section we will have an `URL` that anyone with an internet connection can access to your application. Like with did with `Github` we are going to set our `remote` and use the push command to have the code available on `Heroku` but we still need a couple of updates on the application to work on the `Heroku` environment and one important thing is that we can manage almost all the steps to deploy our app from the terminal(Remember that we install `heroku-cli`).

### Notes:

- We are assuming that you add your local `git repository` inside of the `web-server` directory
- After we deploy the add assuming the previews note; there will be some steps if you set the `git repository` on a different folder level
- Also if you somehow change the `commit` that you use previously to deploy the app(Like change the `commit` hash); we will show how to force update this
- The last 2 notes can be skipped

### Deploy the web-server app to Heroku

Here we will see the steps to deploy the app.

- First; we will need to add our `ssh` key to `Heroku` as we did on `Github` so open your terminal and get to the `web-server` directory
- Type the following command: `heroku keys:add`
- After running the previews command a question will show up so you can choose which `ssh` key you will add(We are assuming that you are logged in)
- Type `Y` after choosing the file with the `ssh` key
- Now the `ssh` key is associated with our `Heroku` account and we can push security our code
- Now we can create our `Heroku` application. Type the following command: `heroku create name-of-your-app`

    This will need to run on the root of the project and the name of the app is optional so `Heroku` will assign a random name if you don't specify it; in our case is better to specify the name like `myName-weather-app` so we can avoid confusion and should be unique across the `Heroku` platform, not just your apps that is why to like to put my name or something meaningful for us.

    After running the command you will see the logs that a `Heroku` app is been created and 2 `URLs` appear. The first `URL` is the actual `URL` of the website and the other represents the `remote` where we push our code

- Copy the first URL
- Open your browser and paste the URL that you just copy
- You will see a welcome message from our new app(This is because we still don't deploy our app yet)
- Get back to the terminal

We are ready to push our code to `Heroku` but we need to make a couple of changes to actually tell `Heroku` can it run our app so we will continue with the push of the code after those updates.

#### Web-server update to work with Heroku

At this moment we run our application using the `node` command to run the `app.js` file so we need to `Heroku` do the same when we deploy our app. To do this we will need to app a `script` on the `package.json` file that `Heroku` run by default called `start`.

- On your editor; go to the `package.json` file at the root of the `web-server` directory
- Get to the `scripts` object

    This object as its name said will help us to define `scripts` for our application and you put a key/value pair where the key is the name of the command that we can run at the terminal and it pair will be the what it will run on the terminal

- Remove the `test` command(We will add it again in a future section)
- Add the following:

    ```json
    "scripts": {
        "start": "node src/app.js"
    },
    ```

    The `key` needs to be `start` and the value will be the same command that we use to run the `web-server` app. Now we can use the `start` command locally to run our app not just for `Heroku`

- Get to your terminal and run the following: `npm start`
- You will see the same logs that you see when you run the `node` command
- On your browser; go to `http://localhost:3000/`
- You will see that the app works normally
- Get back to your editor and get to the `app.js` on the `src` directory
- Bellow the `app` constant definition; create a constant call `port` with the following value:

    `const port = process.env.PORT || 3000;`

    At the bottom of the file on the `app.listen` line we specify the `port 3000` on which our app will run but when we deploy our app `Heroku` will provide us with a `port` that we don't know its value so we will need to update that line that is why we create the `port` constant. `Heroku` will provide us the `port` value on the `env` object(Where all the `environment variables` are available) on the `PORT` property but this `env` is not set on the local environment so we use the `or` logical operator to fallback `3000` is the `env` object doesn't exist

- Get to the bottom of the `app.js` file
- Update the `3000` on the `app.listen` line to use the `port` constant

    ```js
    app.listen(port, () => {
        console.log('Server is up on port 3000.');
    });
    ```

Now we are set to push our app to `Heroku`

#### Push the app to Heroku

- On your terminal; use the `status` command of `git`
- You should see all the changes that you made
- `Add` all the changes using: `git add .`
- Commit the changes using: `git commit -m"Message that represent the updates"`
- Now push the changes to `Github`(We are assuming that you are using `main`)
- The code on `Github` should be updated
- Now we need to push the changes to `Heroku` but first, we will check if our `remote` is added so use the `remote` command: `git remote`
- You will see a `Heroku` remote added on the list(This was done automatically when you create the app; it is not created you can do it manually as we did with `origin`)
- Use the `push` command with the `Heroku` remote to the `master` branch

    `git push heroku master`

    After running this command you will see logs on the process that `Heroku` follows (Installing dependencies and running the app) and finally telling you that the app is available to check. By default `Heroku` uses the `master` branch not the `main` like `Github` but is the same with another name.

- Get back to the `Heroku` app `URL` that you use before on your browser
- Refresh the page
- You will see the app working as expected

### Deploy to Heroku from a no root directory

In some cases, I have more than one app on the `repository` so the local `git` repository is added to the upper level of the app so we actually run the `Heroku` commands from the root instead of the actual app but we can make a workaround for this so for this part we will begin the process again like we did not deploy the app to `Heroku`.

Example directory:

```bash
root/
    - example-app/
    - web-server/
    .gitignore
```

So we will need to run every command from the `root` directory but only deploy the `web-server` app to `Heroku` not all the content of the `root` directory.

- On your terminal; go to the `root` directory
- Add your `ssh` key as you saw before using `heroku keys:add`
- Then create your new app using: `heroku create name-of-your-app`
- Now like you saw before preparing you app so it can work with `Heroku`(Create `start` script and add/use the `port` constant)
- Commit your changes and push to `Github`
- Now we will need to push to `Heroku` our code but the different than before that we will need to point the `web-server` directory so we push only those files. Use the following command on the root directory

    `git subtree push --prefix path/of/your/app heroku master`

    The `subtree` command will allow us to specify that we will run a command for a specific directory of our folders. In this case, we will need to `push` only the files on the `web-server` directory then we specify the `prefix` that will allow you to explicitly tell the path of the directory that will run the command; in this case the `web-server` directory and finally we continue with the `remote` and `branch` that we will at this case `push` our code.

- Get to the app `URL` on your browser and you should see that the app is deployed successfully

#### Note:

- If you are not on the `main` branch you can still use the `Heroku` command with `master`

### Force push to Heroku

Finally, in some cases, we can use some `git` features that update our past `commits` so we will need to `force` an update to `Heroku` because it will reject our update. In the case of the app that like the one first shown on the example just need to app the `-f` option to the `push` command like this:

`git push -f heroku master`

But in an app, like we show that is on a subdirectory will be more complicated because we need to combine 2 commands in one so it can `force push` and know that everything will run in a subdirectory. Here is the actual command:

```bash
git push heroku `git subtree split --prefix path/of/your/app name_of_your_current_branch`:master --force
```

Here we add the `push` command to the `heroku remote` but before specifying the branch we add the next command where we specify the `subtree` directory that we need to use on the `push` command and finally add the actual branch on that we are going to `push` with the `force` option. This will help you to `force push` if you need it. On the `prefix` you will need to put the name of the current branch that you did the update this will allow you to `push` no `main` branch as you `master` branch of `Heroku`.

#### Notes:

- Be careful with the `force push` because this will override all the code that you previously uploaded

## New feature deployment workflow

In this section, we will check the new workflow on which we add a new feature and that feature gets to `Heroku` and `Github`. Let's begin with the example!!!

- On your editor; go to the `about.hbs` on the `web-server/templates/`
- Bellow of the `header partial` add a `p` tag with a new message

    ```hbs
    <div class="main-content">
        {{>header}}
        <p>This site was created by me. It use data from mapbox.com and weatherstack.com!</p>
        <img class="portrait" src="/img/robot.png" />
    </div>
    ```

- Save the file
- Get to your terminal and go to the `web-server` directory
- Use `nodemon` to run your local server: `nodemon src/app.js -e js,hbs`
- On your browser go to the `about` page: http://localhost:3000/about
- You should see the new text available on the page

Now we will add some new data to the `forecast` text that we show when we search a location `weather`.

- Get to the `forecast.js` on the `src/utils/` directory
- We will use the `humidity` value that came on the `weatherstack` object response. Go to the last part of the condition on the `request` callback and add the following:

    ```js
    const currentWeather = body.current;
    callback(undefined, currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out and the humidity is ' + currentWeather.humidity + '%');
    ```

- Save the file
- Get to your browser and go to the homepage
- Type a valid location on the input
- The resulting text of the `forecast` will have the new information
- Now get back to your terminal and stop your local server
- Use the `add` command for the files that have updates: `git add .`
- `Commit` your changes using: `git commit -m"Message that represents the updates"`
- Use the `push` command to send all changes to `Github`: `git push origin main`(We are assuming that you are using `main` and the `web-server` is the root)
- Now `push` your changes to `Heroku` using: `git push heroku master`(We are assuming that your current branch is the one that you want to deploy and the `web-server` is the root; if you are not on the root get to the previews themes on this section)
- You should see all the logs of the deployment process
- Get to your browser and go to the `URL` of your app
- All should work property and have all the new text

## Avoiding global modules

Now we will make another `script` to make our development experience easier because at this moment we type the `nodemon` command ourselves every time we are working on something locally.

- On your editor; go to the `package.json` on the `web-server` directory
- On the `script` section; add a new `script` call `dev` and its value will be the `nodemon` command

    ```json
    "scripts": {
        "start": "node src/app.js",
        "dev": "nodemon src/app.js -e js,hbs"
    }
    ```

- Save the file
- Get to your terminal and go to the `web-server` directory
- Run the `dev` script using: `npm run dev`
- Get to your browser and go to `http://localhost:3000/`
- You should see that the application works as expected

One thing before we continue is that this script works because we previously install the `nodemon` dependency globally on our machine so if another person download the code and try to run this script maybe it fails because it doesn't have the script globally installed yet so we want that every dependency is locally installed so everyone can use it and do this we first uninstall `nodemon` globally

- Get to your terminal and stop your local server
- Use the `npm uninstall` command with the `g` flag for `nodemon`: `npm uninstall -g nodemon`
- Now install `nodemon` as a `dev dependency` on the `web-server` project using: `npm install nodemon --save-dev`
- On your editor; go to the `package.json`
- At the bottom; you will see a `devDependencies` object and in there should be `nodemon`

    A `dev dependency` is dependencies that are installed on your local machine for development and not installed on your `production` environment. In our case, `Heroku` won't install the `nodemon` dependency.

- Now get to your terminal
- Use the `nodemon` command as we use before: `nodemon web-server/src/app.js -e js,hbs`
- It should fail
- Now run the `dev` script
- It should work as expected
