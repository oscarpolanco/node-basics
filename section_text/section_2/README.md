# Section 2: Node.js module system(Notes App)

In this section, we will be creating our first `node` app to explore the `Node Module System` that allows us to load functionality into our app and use it like read and write on the file system. We will target 3 different ways to use the `Node Module System`:

- Load core modules: Modules that come with the `node` installation
- Load third party modules: Modules build by other devs
- Load your custom modules: Modules that are build by you

## Importing node.js core modules

As we mentioned before we are going to introduce the `node module system` that is what is going to help us to take advantage of all the things that `node` provides. In this case, we are going to be using the [file system](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html) module and this will allow us to have access to the operating system `file system`; we will able to read; write; append files; figure out if a given file exists and more.

If you see on the [file system](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html) docs you will have a table of content. Scroll down until you begin to see the `fs.` sections; these are all the methods of the `file system` module. In our case we will use the `fs.writeFile` method that will allow us to write data to a file on our `file system` from our `node.js` app(For the moment we will use the `synchronous` version of the `fs.writeFile` that is called `fs.writeFileSync`); this method takes 2 argument that is the name of the file and the data that you will use to write on the file. So let us begin to write our app!!!

- Go to your editor
- Delete the `hello.js` file(we are not going to use it anymore)
- Create a new directory call `notes-app`
- In this newly created directory; create a file called `app.js`
- Open this newly created file
- Add the `fs` object and call the `writeFileSync` method

    `fs.writeFileSync();`

- As mentioned before the `writeFileSync` takes 2 arguments that are the name of the file and the content that you will add to the file. So add as a name of the file `notes.txt` and as a content `This file was created by Node.js!`

    `fs.writeFileSync('notes.txt', 'This file was created by Node.js!');`

- Now go to your terminal and get to the `app.js` file
- let us run our script using the `node` command: `node app.js`
- You should see an error on the terminal. `fs is not defined`; you get this error because you will need to `require` the `file system` object from `node` and this will be done using the `require` function that `node` provide
- Go back to the `app.js` file on your editor
- At the top of the file add the `require` function

    `require();`

    This is a function that `node` provides and this is the core of the `module system`. The `require` function is how we load in other things; whether is a core `node` module; another file that we created or `npm` module that we choose to install on our system
- We will pass a single string as a parameter of the `require` function and since is a `node` core module you just need to put the name of that module in this case `fs`

    `require('fs');`

- The `require` function returns all the stuff of the module that you are going to use so we need to store it in a constant so we can use it when we want. In this case, we will stick with the module name(the variable could be named as we wanted the only important thing is the string that we send to the `require` function matches on what `node` call that module)

    `const fs = require('fs');`

- Go back to your terminal and use the `node` command to run the `app` script: `node app.js`
- You should not see any output on your terminal
- Go back to your editor
- You should see that on the `notes-app` directory a new file is created with the name that you use on the `writeFileSync` method
- Open that file and you should see the message that you put on the `writeFileSync`
- Now let use another function that appends a message on the file that we create but first delete the file that was created by the `app` script
- Now bellow of the `writeFileSync` method; use the `fs` object and call the `appendFileSync` method

    `fs.appendFileSync();`

- The `appendFileSync` receive the name of the file and the `content` that you need to append so add the name of the file that you add on the `writeFileSync` and as a content ` This is the appended line`(Add a space before the new message because we are appending content)
- Go to your terminal and run the `app` script: `node app.js`
- Go back to your editor
- You should see a new file created
- Open that file and you should see the message that you saw before and the one that you just append

## Importing your own files

Now we are going to use the `require` function to load the files that you create on your project. At this moment you have the `app.js` file where all your code is stored and all new code that you add needs to be on this file in order to run; the thing that is not ideal as the application becomes larger and more complex. To fix the mentioned before we are going to create multiple files that will store part of the application. Let's begin with the process

- Go to the `app.js` file on your editor
- Remove all the content
- Add a constant call `name` and add your name as it value(A string)

    `const name = 'test';`

- Use `console.log` to print `name`

    `console.log(name);`

- On your terminal; go to the `notes-app` directory
- Run the `app` script: `node app.js`
- You should the `name` content as an output
- Go back to your editor and create a new file call `utils.js` on the `notes-app` directory
- On this newly created file add a `console.log` with the name of the file so we know when the file run

    `console.log('utils.js');`

- Now get back to the `app.js` file
- At the top of the file add the `require` function

    `require();`

- As a parameter of the `require` function we will add the relative path of the file that we need to load. The first thing that we add is `./` that means that we will be on the folder that store `app.js`; then add the name of the file

    `require(./utils.js);`

- Go to your terminal and re-run the `app.js` file
- You should see the message of the `utils.js` file; them the `app.js` file message
- Now get back to the `app.js` file
- Remove the `name` constant(leave the `name` call on the `console.log`)
- Go to the `utils.js` file and add the `name` constant with different content than before
- In your terminal run the `app.js` script
- You should see an error that said the `name` is not defined. This is because in the `node module system` each file has its own scope. So you can't have access to the variables defined on another file. To have access to the variables and method of another file we need to `export` those
- At the bottom of the `util.js` file add `module.exports` and add the `name` variable as its content

    `module.exports = name;`

    The thing that you specify as the value of `module.export` is the content that will be returned when you `require` the file
- Go to the `app.js`
- Add a constant call `name` that catch the value of the `utils require`

    `const name = require('./utils.js');`

- Go to your terminal and run the `app.js` script
- You should see the `name` output without errors
- Now get to the `util.js`
- Define a function call `add` that receive 2 values and return the sum of these 2 values
    ```js
    const add = function(a, b) {
        return a + b;
    }
    ```
- Export the `add` function

    `module.exports = add;`

- Go to the `app.js` file
- Rename the `name` constant to `add`

    `const add = require('./utils.js');`

- Add a constant call `sum` that it value will be the sum of the `4` and `-2` numbers

    `const sum = add(4, -2);`

- Console the `sum` value(Remove the `name` console)

    `console.log(sum)`

- Go to your terminal and run the `app.js` script
- You should see the `utils` message and the `sum` value
- Go to back to your editor and add a new file call `note.js` on the `notes-app` directory
- Add a function that will be call `getNotes` and return a `string`
    ```js
    function getNotes() {
        return "Your notes...";
    }
    ```
- Export the `getNotes` function

    `module.exports = getNotes;`

- Import the `getNotes` function on the `app.js` file

    `const getNotes = require('./notes');`

- Add a constant call `notes` that it value will be the return string of the `getNotes` function and console it value
    ```js
    const notes = getNotes();
    console.log(notes);
    ```
- Go to your terminal and run the `app.js` file
- You will see the message of the `getNotes` function
- Now go to the `app.js` and remove all content not related to the `getNotes` function
- Delete the `utils.js` file

## Import npm modules

At this moment you see that you can get `node` core modules and files that you created and now you will be using` npm` modules. This will allow us to have access to a large number of packages so we don't recreate the will over and over.

As mentioned before when we install `node` you also get` npm`. This will give us access to everything on https://www.npmjs.com/ but before we begin to use `npm` modules we need to do 2 things:
- We have to initialize `npm` on our project
- We have to install all of the modules that we want to use

Let's begin with the process:

- On your terminal; go to the root of your app in this case the `notes-app` directory
- Use the `npm -v`
- You will see the version that you got of `npm` (Usually this version doesn't matter; just make sure that you are over version 5)
- Now initialize `npm` on your project with the following command:

    `npm init`

    This will create a single file that will help us to manage all the `npm` modules
- It will show a lot of information about what is happening and some options that you can update as you want. For every question that it asks we will stick with the default answer so press enter for each one
- You will see the output of the file that will create. Press enter to the last question
- You will see a new file is created that is called `package.json`. As you see the extension of this file is `json` that stands for` javascript object notation`
- Go to your browser
- Open the [npm page](https://www.npmjs.com/)
- On the `search package` input; type `validator` (We will use the` validator` package for the example)
- Choose the first option
- You will see the `npm` package page that has all the information of the package
- Go back to your terminal and type the install command for the `validator` package (You will see on the package page that use a` i` instead of `install` but both are the same). This command will go to the `npm` servers; grab all the code for that package and add it to our application

    `npm install validator`

    You will see that a new file and a new directory are added to the `notes-app` directory. One is the `node_modules` directory that is the folder that will contain all the code of every dependency in this case you will see that inside of it you have a` validator` directory with all the code that you just install. We should not update any file in the `node_modules` directory and when we use` npm install` it will generate `node_modules` every time. The `package.lock.json` is a file that contains extra information that makes` npm` a little bit faster and secure and it will give you the exact code that you install the first time that you add a module and again this file should not update this will be maintained by the `npm` commands. Finally, if you see the `package.json` new property is added that is called `dependencies` and have the information of the `validator` package that we just installed
- Now that we got the package installed; we can use it. Go to the `app.js` file
- At the top of the file add the `require` function:` require (); `
- Then we need to add the `package` name that we will use in this case` validator` as a parameter of the `require` function

    `require ('validator');`

- As we did before we need a variable to store all the content that comes from `require`

    `const validator = require ('validator');`

- In this case, we will use the `isEmail` function that will help us to know if a given` email` is valid. To add a `console.log` with the following

    `console.log (validator.isEmail ('test@example.com '));`

- Go to your terminal and run the `app.js` script
- You will see the `getNotes` output and below the value that returns the` isEmail` function that in this case is `true` because it is a valid` email` (You can test changing the `string` that you send to the function )
- Now we will the `isURL` method and console it

    `console.log (validator.isURL ('https://mead.io'));`

- Go to your terminal and run the `app.js` script
- You will have the same outputs as before and a new one with the value of the `isURL`

There is important to know that you will see on the documentation 2 forms of getting the `validator` module on your file; one with `require` as we used before and the other one with` import`. They are 2 different versions of the same but we use `require` because at this moment` node` does not support `import` by default.

Before we continue let's talk about the `node_modules` directory. This is a generated directory so is something that we should not manually change because when we use the `npm` command again our changes will be overwritten. You also can recreate this directory base on the content of the `package.json` and` package-lock.json` so when you are sharing your code with others you don't need to share the `node_modules` directory. Let's test it:

- On your editor delete the `node_modules` directory on the` notes_app` folder
- Go to your terminal and get to the `node_app` directory
- Run the `app.js` script
- You should see an error because you lose the functionality on the `node_modules` directory
- To generate it again just use the `install` command:

     `npm install`

     This command will look at the content of the `package.json` and create the` node_modules` directory again
- Run the `app.js` script
- You will see that work the same as before

## Global npm modules and nodemon

Now we are going to see `global npm modules` that will allow us to get a new command to execute on the terminal. Until this moment we install what is called `local installed package` that when we install a dependency explicitly on a project and you can tell is a `local dependency` because is listed on the `package.json` and you will need to use `require` on your `app` to get those modules.

When we install a module `globally` we don't need to call it directly on our source files instead we can call it directly on our terminal. In our case, we are going to install a useful module that will run our `app` and restart the process every time our `app` change its call [nodemon](https://www.npmjs.com/package/nodemon).

- Go to your terminal
- Run the following command:

    `npm install nodemon -g`

    The `-g` flag is responsible of install the module `globally`
- On your editor; check that the `package.json`; `package-lock.json` and `node_modules` don't present any updates
- Now get back on your terminal
- Type the `nodemon` command with the `-v` flag
- You should see the `nodemon` version
- Now go to the `notes-app` directory
- Run the `app.js` script using `nodemon`

    `nodemon app.js`

- You will see some logs then the output of the `app.js` script
- On your editor go to the `app.js` file
- Update one of the output messages and save
- Go to your terminal
- You should see the new output automatically
- Press `command c`(`ctrl c`) to stop the `nodemon` command
