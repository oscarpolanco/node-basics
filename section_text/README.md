# Node Basics

On this repository, you will see some examples related to using `NodeJs` to get a basic understanding of this technology. The `commit` history will have the complete journey from the start to the more advanced topics and each `app` that I build will be on its own directory. Finally, this repository is inspired by the [The Complete Node.js Developer Course (3rd Edition)
](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/).

## Requirements

- NodeJs
- A terminal(command prompt on windows; command line on linux)
- An editor(I use [vscode](https://code.visualstudio.com/))

## Section 1: Installing and exploring Node.js

To begin with, to do these examples you just need a very basic experience with `js` and none for `Node.js` that we will covert from zero. I use `vscode` but you can use any other editor or `IDE` of your choosing the only thing is that we will use some `vscode` features to debug `nodeJs` in the editor but each editor should have its own way to do it. Finally, since I use `macOS` I will refer to the `terminal` but you can do it on another operator system and use the `command prompt` or `command line`; will be the same.

### Installing nodeJs

- On your browser; go to: https://nodejs.org/en/
- Click on the `current` version button
- Use the installer
- When the installer finish; open your terminal
- Type: `node -v`
- You should see the version that you just download from `node` (Use the lasted version for the examples)
- Now you are good to start the example

### What is Node.js?

`Node.js` came about when the original developers take `js` something that we can only run on the browser and they allow it to run as a `standalone` process on your machine so before `node`; `js` can't be used as a general-purpose language limited to the browser but this change with the introduction of `node` that will allow the `js` developers to use `js` on the `server` side so they can use the same `js` programing language to create web servers; command-line interfaces; application backend and more.

Now you may think how exactly is possible that `js` runs on the `server` side? Well, the answer is on the text at the [node.js site](https://nodejs.org/en/) that quote: `Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.`. All comes back to the `js` engine. There are all sorts of `js` engine; almost every browser have their own but `node` use the `V8 JavaScript` engine that is the one that powers the `chrome` browser. The `V8` engine is an open-source `Google` project that has the job of is to take `js` code and compile down to machine code so your machine can execute and this engine is written on the `C++` programing language that means that anyone can write a `C++` application then incorporate the `V8` engine and could extend the `js` functionality that `js` provides and that is exactly what `chrome` and `node.js` do.

As you see before on the quote of the `node.js` site mention that `node.js` is a `JavaScript runtime` this means that `node.js` is not a programing language at the end we will use `js` to write our applications. The `runtime` is something that provides custom functionality. On the browser, `V8` provides various objects and functions that allow `js` developers to do things on the browser like add a button click event or manipulate the `DOM` but those features don't make the same for `node` so that objects and functions that we have on the browser do not provide instead the `node runtime` provides various tools that `node` developers need for setting up web servers; integrating with the file system so you can read and write from the disk and more. At the end of the day, they are creating their own modified version of `js`.

A little resume will of all of that we mentioned early is that the `chrome` send to `v8` the `js` code because it can't not running itself and get the result back; the same thing happened on `node` that doesn't run the `js` code just send it to `v8` and receive the result also remember that `v8` is written on `C++` and both `chrome` and `node` are largely written on `C++` and the reason is that both `chrome` and `node` provide bindings instantiated with the `v8` engine and this is what allows then to create their own `js` runtime with some features like the ones that let `chrome` to interact with the `DOM` and `node` interact with your file system that is not features of `js` so `v8` doesn't have an idea of those features and is up to `node` and `chrome` to provide those features to `v8`.

Here a little example with 2 popular `js` methods that are used on the frontend:
`localStorage.getItem`: Will fetch an item from the `localStorage`
`document.querySelector`: Will allow you to `query` some elements from the `DOM`

And 2 popular `js` methods on the server:
`fs.readFile`: Allow you to read the context of a file on the disk
`os.platform`: `os` stand for `operating system` and `platform` will tell us the name of the `operating system` that we are running the code

These 2 methods are not part of the `js` language itself because they actually implemented by the `chrome` runtime; when `chrome` run the `js` file that uses either of those some `C++` code gets executed behind the scenes which are responsible for taking care of that functionality in other words `chrome` will tell `v8` what to do when it finds these methods. The exact same thing happened with `node`.

#### Practice example

- Open your browser(I'm using `chrome`; you can use any browser but the steps may change depending on what you are using)
- Go to any website
- Right-click on any part of the page
- Choose `inspect`
- The `dev tools should open
- Click on the `console` tab. The `console` will allow us to run `js` statements
- Type `2 + 3` on the `console` and click `enter`
- You should see the sum result
- Type any `string` and press enter
- You should see the same `string` as an output
- Type a lowercase `string` again but this time use the `toUppercase` method(This `string` method will change your `string` to it `uppercase` version)

    `"example".toUppercase()`

- You should have the `uppercase` version of the `string`
- Now open your terminal
- Type `node` and press enter. What we get after this step is a place where we can run individual `node` statements also know as `REPL` that stands for `read`; `eval`; `print` and `loop`.
- Type `2 + 3` and press `enter`
- Should see the output of the sum
- Type a lowercase `string` and use the `toUppercase` method
- You should see the `uppercase` version of the `string`

As you can see you still have all the `js` core features when independent that you are on the browser or on the `node` console because those are provided by `v8`.

- Get back to the browser
- On the `console` type `window`(The `window` object is a reference of the browser `window` that make sense on the `js` context because we have a `window` to work with) and click `enter`
- You will see a large object with a lot of methods and properties
- Go to the terminal
- Type `window` and click `enter`
- You should see an error that said `window is not defined`. This is because `window` is a specific provided by the `chrome` runtime when `js` is running in a `chrome` application
- Type `global`(`global` store a lot of the `global` things that we are going to be using similar to `window` for the browser) and click `enter`
- You will see a large object with a lot of methods and properties
- Go back to the browser
- Type `global` and click `enter`
- You should see an error that said `global is not defined`
- Type `document`(`document` allow you to work with the `DOM`)
- You will see a representation of your `html`
- Go to the terminal
- Type `document` and click enter
- You should see a not defined error
- Type `process` and click enter
- You will see a large object with a lot of methods and properties. `Process` is similar to `document` for manipulating the current `node` `process`
- Type `process.exit` and click `enter`
- Now you are on the standard terminal

### Why should I use node.js?

In the past, in the `node.js` website there was some more text that will help us to understand the advantages that we will have using `node.js`. One of that quotes will be: `Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

Let's begin to destructure the previews quote; `I/O` stand for `input and output`; your `node` application will use `I/O` anytime it trying to communicate with the outside world so if your `node` app needs to communicate with your machine that is running on that is `I/O` for example reading some data from a file in the filesystem or if your `node` app needs to communicate with your another server that's `I/O` as well. Those `I/O` operations take some time and that leads us to the `non-blocking` part of the quote; that means when your `node` application is waiting for a response; like a response from a database; it can do other things. Finally, the `event-driven` part refers to register `callbacks`(Later we will see about this) and call than when the `I/O` operation is done.

There was another quote that said: `Node.js package ecosystem, npm, is the largest ecosystem of open source libraries in the world`. `NPM` is a tool that actually is already in your machine when you installed `node` and its page is: https://www.npmjs.com/; where you can find a lot of pre-written packages that you can use inside of your application.

### Your first node.js script

- Create a new directory on your machine
- Open your new directory on your editor
- Create a new file on the directory that you just created and call it `hello.js`
- On the newly created file using the `console.log` to print a message

    `console.log('Welcome to the course!');`

    You might say that this is a regular `js` script no a `node` one but remember that `console.log` is not actually part of the `js` programing language that comes from the runtime; whether is `node` or the browser
- Open your browser
- Go to the [node.js page](https://nodejs.org/en/)
- Click on the `Docs` option on the top of the navbar
- At the left; you will see a sidebar with the `node` versions
- Click on the one that we are using(As we mentioned before we will be using the last version of `node`)
- On the left sidebar you will see all the functions that are available in the version of `node`; search for `console` and click on it
- Now you will see the specification of `console`
- Open your terminal
- Get to the folder using the `cd` command

    `cd path/to/my/folder`
- When you are on the folder that you created; type: `node hello.js`
- You should see the message that you added on the `hello.js` file

## Section 2: Node.js module system(Notes App)

In this section, we will be creating our first `node` app to explore the `Node Module System` that allows us to load functionality into our app and use it like read and write on the file system. We will target 3 different ways to use the `Node Module System`:

- Load core modules: Modules that come with the `node` installation
- Load third party modules: Modules build by other devs
- Load your custom modules: Modules that are build by you

### Importing node.js core modules

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

### Importing your own files

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

### Import npm modules

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

### Global npm modules and nodemon

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

## Section 3: File system and command line Args(Notes App)

At this moment we just make some examples to check the `node module system` and now is the moment to pull all of that together creating the `notes app`. We are going to check to main topics:

- File system: This Will allow us to store the user's data
- Command-line arguments: This Will allow us to get input from the user

### Getting input from the user

Now we will get some input from the user that will be a core functionality for the `notes app` because if a user wants to do something like `add` a new `note` it will need to provide some information about that like the title and body. For the moment we will use the terminal to get the input from the user but later we will see how to get that from the browser.

First, we are going to try to get the input from the terminal:

- On your terminal; go to the `notes-app` directory
- Run the `app.js` script but at the end add a new value like this:

    `node app.js test`

- You should see the same out that before without any change but actually we add a new value that our program could choose to use in this case `test`
- Now we need to have access to this new value and for this, we will use the `process` variable that we mentioned before when `node` was introduced. So on your editor; go to the `app.js`
- Remove all the code except the `requires`
- Log the `process.argv` variable

    `console.log(process.argv);`

    `argv` stands for `argument vector` that have an `array` will all `arguments` provided
- Go back to your terminal and run the same command as before
- You should see an `array` with 3 `strings`(The first 2 are always provided):
    - The first one is the path of the `node.js` executable
    - The second is the path of the `app.js` file
    - The third one is the extra `argument` that we use(in my case `test`)
- Now we are going to extract the `argument` that we need using the advantages of an `array`. Go back to the `app.js` and update the `process.argv` to get the correct `index` of the `array`

    `console.log(process.argv[2]);`

- On your terminal run the `app.js` again with the same command as before
- You should see just the `argument` that you just use in the output
- In the case of the `notes-app` we will use the first value to be the `action` that we are going to take. This will be our command and will run some code depending on it. So go back to the `app.js` and remove the `console`
- Add a new constant call command that have the `process.argv[2]` as it value

    `const command = process.argv[2];`

- Our first command will be `add` that will represent that the user want to create a `note`. So bellow the `command` variable add a condition that check for the `add` string and `console` a text
    ```js
    if (command === 'add') {
        console.log('Adding note!');
    }
    ```
- On your terminal run the `node` command but at the end put the `add` command

    `node app.js add`

- You should see the input related to the `add` command
- Go back to the `app.js` file and add the condition for the second command that will be `remove`
    ```js
    if (command === 'add') {
        console.log('Adding note!');
    } else if (command === 'remove') {
        console.log('Removing note!');
    }
    ```
- Go to the terminal and use the `node` command with `remove` at the end
- You should see the `remove` command output
- Now if someone `add` a `note` we will need some extra input like the `title` and the `body` of the `note` and for this, we will use the `command line options`(Those command with `-` like `node -v`; some have `--`). On the `app.js` file add a `console` with the `process.argv` again
- Go to your terminal and run the `node` command with the `add` command and an option called `title` like this

    `node app.js add --title="This is my title"`

- You should see the `add` command and the `title` option on the `array`. One thing you notice is that the option is not something that `parse` for us; we have the exact text that we add; so we will need to add some code to `parse` that and get the actual value that we need and for this, we will use an `npm` package for this next

### Argument parsing with Yargs: Part I

At this moment we know that we can pass `arguments` via `node` and read them using the `process` variable but; as we saw; we don't necessarily receive those `arguments` in the most useful way possible because `node` doesn't offer any `parse` utility so we get the raw `arguments`. We will need to write some code to get the actual value that we need but this is something common on `node` application this means that we got a lot of `npm` packages that can `parse` what we need so you don't have to reinvent the wheel over and over. One more thing is that `node` doesn't `parse` the `argument` intentionally to let the community create various packages each to solve the `parsing` problem. In our case, we will use [yargs](https://www.npmjs.com/package/yargs). Let's start with the process:

- On your terminal; go to the `notes-app` directory
- Use the `node install` command to install `yargs`

    `npm install yargs`

- Go to your editor
- Go to the `app.js` file and `require yargs`(At the top of the file; for convention, we put the package first then the file that we `require`)

    `const yargs = require('yargs');`

- Remove all the code bellow the all the `requires`
- Add 2 consoles; one for the `process.args` and the other for `yargs.argv`
    ```js
    console.log(process.argv);
    console.log(yargs.argv);
    ```
    The `yargs.argv` is the version of `process.argv` from `yargs`
- Go to your terminal and run the `app.js` without `arguments`

    `node app.js`

- You should see an output like this:
    ```bash
    [
        '/path/of/your/machine/.nvm/versions/node/v16.4.0/bin/node',
        '/path/of/your/machine/node-basics/notes-app/app.js'
    ]
    { _: [], '$0': 'app.js' }
    ```
    Here you see the `process` output that you saw before and the `yargs` output that is an object with the following properties
        - `_`: Will be populated with an array of `arguments`
        - `$0`: Name of the file that we execute in this case `app.js`
- Now run the `app.js` file sending `arguments`

    `node app.js add --title="Testing title"`

- You will get an output like this:
    ```bash
    [
        '/path/of/your/machine/.nvm/versions/node/v16.4.0/bin/node',
        '/path/of/your/machine/node-basics/notes-app/app.js',
        'add',
        '--title=Testing title'
    ]
    { _: [ 'add' ], title: 'Testing title', '$0': 'app.js' }
    ```
    Here you will see that the `yargs` output has the command on the `_` property and a new property that is our `command option` that in this case is the `title` with the text that you use as its value. Now we got an object that will be easy to access

By default `yargs` come with some useful behavior for example the `--help` option and some more.

- On your terminal; run the `app.js` script but add the `--help` option at the end of the command(Don't add any `arguments`)

    `node app.js --help`

- You will see some output of the application that define all the options that at this moment we have available on our app
- As you see there is a `--version` option. Let's use it

    `node app.js --version`

- This will output the `version` of the application(By default will be `1.0.0`)
- Go back to the `app.js` file
- Remove the `process.argv` console
- Now we are going to change the `version` of the application using the `yargs version` method. So before the console add the following

    `yargs.version('1.1.0');`

- Go back to your terminal and run the `version` option again
- You should see the new `version` as an output

At this moment we can begin to set `yargs` to work with the `commands` that we need for the `notes app`.

- On your editor; go to the `app.js` directory
- Lets create the `add` command for the application. Use the `command` method of `yargs`(Bellow the `version` line)

    `yargs.command({});`

- On the configuration object add the following
    ```js
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        handler: function () {
            console.log('Adding a new note');
        }
    });
    ```
    - `command` property: Define the name of the `command`
    - `describe` property: Describe the functionality of the `command`
    - `handler` property: Receive a function that will run when you use the `command`
- Go to your terminal and run the `--help` option

    `node app.js --help`

- You will see the new `add` command with the output of all `commands` available on our app
- Now use the `add command` to run the app

    `node app.js add`

- You will see the `add handler` function output
- Now add the following `commands` for the app:
    ```js
    yargs.command({
        command: 'remove',
        describe: 'Remove a note',
        handler: function() {
            console.log('Removing a note')
        }
    });

    yargs.command({
        command: 'list',
        describe: 'List your notes',
        handler: function() {
            console.log('Listing out all notes')
        }
    });


    yargs.command({
        command: 'read',
        describe: 'Read a note',
        handler: function() {
            console.log('Reading a note')
        }
    });
    ```

### Argument Parsing with Yargs part II

Now that we have all our `commands`; we will make some `actions` that will be supported by our `commands`. Let's get to it!!

- First; on your editor go to the `app.js` file
- On the `add` command; before the `handler` add the following property
    ```js
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {},
        handler: function () {
            console.log('Adding a new note');;
        }
    });
    ```
    The `builder` property will have an object that have all the information of the `option` that we want to support
- Now on the `builder` property add the following
    ```js
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {}
        },
        handler: function () {
            console.log('Adding a new note');;
        }
    });
    ```
    To define a new `option` we set it as a property on the `builder` object and will have an object where we can custumise how this option work
- On the `title` object add a `description` property with a `string` as it value
    ```js
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
            }
        },
        handler: function () {
            console.log('Adding a new note');
        }
    });
    ```
    The `describe` property will have information of the `option` that we are creating
- Now that we add the `builder` property; we got access to the `title` in the `handler` function via a parameter called `argv`. To add this `argv` parameter to the `handler` function and on the console print the `argv` parameter
    ```js
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
            }
        },
        handler: function (argv) {
            console.log('Adding a new note', argv);
        }
    });
    ```
- Then go to your terminal and get to the `notes-app` directory
- Run the `app.js` script with the `add` command and the `title` option

    `node app.js add --title="Test title"`

- You will see the `Adding notes` log and next to it will be the `argv` content(Remember that we got another console with the `yargs.argv` at the bottom of the file; remember it because is important and DO NOT DELETE IT )

    `Adding a new note { _: [ 'add' ], title: 'Test title', '$0': 'app.js' }`

- At this moment the `title` option is not `require` so if you run the `add` command without the `title` option it will work but actually we will need that to be `require` so go to your editor on the `app.js` file and add the following option to the `title` object
    ```js
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
            }
        },
        handler: function (argv) {
            console.log('Adding a new note', argv);
        }
    });
    ```
    The `demandOption` is by default `false` and changing it to `true` will mean that this command is `require`
- Go back to your terminal and run the `app.js` script with the `add` command and without a `title`

    `node app.js add`

- An error will show up with the available `options` and you should see the `title` with the `require` message
- At this moment if you provide the `title` option without a value it will return as a `boolean` but we actually always want that the `title` have a `string`. Go back to the `app.js` file on the editor
- Add the following property to the `title` object
    ```js
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            console.log('Adding a new note', argv);
        }
    });
    ```
    Now we will always have a `string` on the `title` command
- Go back to your terminal and run the `app.js` script with the `add` command and with the empty `title` option

    `node app.js add --title`

- You will see that the `title` log have an empty `string`
- Now go back to your editor
- On the `app.js` file delete the console at the bottom of the file that has the `yargs.argv` object
- On your terminal run the `app.js` script with the `add` command and the `title` option
- Now you won't see any output. This is because when we access the `argv` property on the console; `yargs` will know that it needs to `parse` the `arguments`
- To actually `parse` the `arguments` without the console you will need to use the `parse` method so at the bottom of the `app.js` file add the following

    `yargs.parse()`

- Get back to the terminal and run the previous command again
- Now you will see the output that is expected
- Go back to the `app.js` file and update the `log` to print the `title` on the `add` command
    ```js
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            console.log('Title: ' + argv.title);
        }
    });
    ```
- Finally, we will need to add the `body` option to the `add` command and log the `body` option
    ```js
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'Note body',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            console.log('Title: ' + argv.title);
            console.log('Body: ' + argv.body);
        }
    });
    ```

### Storing data with JSON

At this moment we need to see a little bit on how we are going to store the data of the application?; we already have the ability to take some inputs from the user via commands but what to do with that data when the application gets it? well, we will use the `fs` module to get all this data into the `file system` but inside of the files that we will create and inside of those files we will have `JSON` data. Inside of the file, we will have an `array` of `objects` and each `object` will represent a `note` with some properties that define that specific `note`; all in the `JSON` format. Before continuing with the app; is better to explore this specific topic isolate in this case working with `JSON` format so we will play a title bit!!

- On the root directory at the same level of the `notes-app`; create a new folder call `playground`
- On that newly created directory; create a file called `1-json.js`
- Create a constant call `book` that will be an object with the following content
    ```js
    const book = {
        title: 'Ego is the enemy',
        author: 'Ryan Holiday'
    }
    ```
- Now that we got an object we need to figure out how to change the `book` object to a `string` since the `fs` module can only work with `strings`. So to convert the `book` object to a `string` we will use the `JSON.stringify` method. Bellow the `book` object add a new constant call `bookJSON` that will have the `JSON.stringify` method as its value and send the `book` object as its parameter

    `const bookJSON = JSON.stringify(book);`

- Add a console to see the `bookJSON` value

    `console.log(bookJSON);`

- Go to your terminal; get to the `playground` directory
- Run the `1-json.js` with the `node` command

    `node 1-json.js`

- You will see the `JSON` representation of the `book` object
- Now we need the opposite of the `JSON.stringify` so we will recive `JSON` data and return an object. For this we will use the `JSON.parse` method. So below the `bookJSON` add a constant call `parseData` that it value will be the `JSON.parse` method sending the `bookJSON` as it value

    `const parseData = JSON.parse(bookJSON);`

- Then console the `parseData` value

    `console.log(parseData.author);`

- On your terminal; run the `1-json.js` script
- You will see the `author` name after the previous logs
- Get back to your editor
- At the top of the `1-json.js`; require the `fs` module

    `const fs = require('fs');`

- Bellow of the previous code; use the `writeFileSync` method to create a new file call `1-json.json` and the `bookJSON` as it content

    `fs.writeFileSync('1-json.json', bookJSON);`

- Now we need to read the new `1-json.json` file that we will create so we will need the `readFileSync`; so create a new constant call `dataBuffer` that its value will be the `readFileSync` sending a `string` with the name of the file that we will create

    `const dataBuffer = fs.readFileSync('1-json.json');`

- We can't directly read the information that the `readFileSync` method return because what comes back is a `buffer` that is a way of `node.js` to represent `binary` data so we will need to turn that data into a `string` and as you guess it we got a method called `toString` for that. Bellow the `dataBuffer` constant add a new one call `dataJSON` that will receive the value of the `toString` method

    `const dataJSON = dataBuffer.toString();`

- Then we need to turn the `dataJSON` into an object that we can read so we will need the `parse` method

    `const data = JSON.parse(dataJSON);`

- Finally log the `title` property of the `data` object

    `console.log(data.title);`

- Get back to the terminal and run the `1-json.js`
- You will see the previous logs and at the end, you will have the `title` property of `data`

### Adding Notes

Now we will add all the functionality of the `add` command.

- On your editor; go to the `notes-app` directory and open the `notes.js` file
- On the `notes.js` file bellow the `getNotes` function; add a new function call `addNotes`. This will be the function responsable of adding a note and will recive the `title` and the `body` options as parameters

    `const addNote = function(title, body) {}`

- Now we need to `export` the newly created function and to do this; instead of sending just the `getNotes` function we will send an object with both functions like this
    ```js
    module.exports = {
        getNotes: getNotes,
        addNote: addNote
    };
    ```
- Go to the `app.js` file
- Update the `getNotes` name to `notes` on the `require` at the top

    `const notes = require('./notes');`

- Now on the `handler` function of the add command; remove the consoles
- Then use the `addNotes` function sending the `title` and the `body` values
    ```js
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {...},
        handler: function (argv) {
            notes.addNote(argv.title, argv.body);
        }
    });
    ```
- Get back to the `note.js` file
- The first thing we need to do when we `add` a note is to `load` all the existing notes because we don't want `addNotes` to override any existing data and we will do this for multiples function so we will create a reusable function to do this. Below the `addNotes` function create a new function call `loadNotes`

    `const loadNotes = function() {}`

- We will need to read a file so `require` the `fs` module at the top of the file
    `const fs = require('fs');`
- Get back to the `loadNotes` function and add a variable call `dataBuffer` that it value will be the what the `fs.readFileSync` returns and the file that we are going to read is the `notes.json`(Does not exits yet) file
    ```js
    const loadNotes = function() {
        const dataBuffer = fs.readFileSync('notes.json');
    }
    ```
- Now create another variable call `dataJSON` that will be the `string` resolve of the `dataBuffer` variable(Using the `toString` method)
    ```js
    const loadNotes = function() {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
    }
    ```
- Then return an `object` using the `JSON.parse` function on the `dataJSON` variable
    ```js
    const loadNotes = function() {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    ```
- Use the `loadNotes` function on the `addNotes` function and log it result
    ```js
    const addNote = function(title, body) {
        const notes = loadNotes();
        console.log(notes);
    }
    ```
- At this moment the `loadNotes` function will work only if a `notes.json` file exits and if it does not; it will give us an error. To handle this we will use a `try/catch` like this:
    ```js
    const loadNotes = function() {
        try {
            const dataBuffer = fs.readFileSync('notes.json');
            const dataJSON = dataBuffer.toString();
            return JSON.parse(dataJSON);
        } catch(e) {
            return [];
        }
    }
    ```
    If something on the `try` block has an `error` it will automatically run the `catch` block without crashing the script. In our case, we will return an empty `array` in case of an error because we will add an `array` of notes and that will be our initial value
- On your terminal; go to the `notes-app` directory
- Run the `app.js` script using the `add` command an it options: `node app.js add --title="test" --body="testing, test"`
- You should see an empty array on the terminal log
- Get back to the `notes.js` file and remove the console of the `addNotes` function
- Now we can begin to add the notes that we need. Use the `push` function on the `notes` variable sending an object with the `title` and `body`
    ```js
    const addNote = function(title, body) {
        const notes = loadNotes();
        notes.push({
            title: title,
            body: body
        });
    }
    ```
- The next thing will be to save the data and like the `loadNotes` function we will use this functionallity on multiple functions so bellow the `addNotes` function create a new function that will be call `saveNotes` that will recive the `notes`

    `const saveNotes = function(notes) {}`

- On the newly create file add a new variable call `dataJSON` that will have the `JSON` representation of the `notes` array using `JSON.stringify`
    ```js
    const saveNotes = function(notes) {
        const dataJSON = JSON.stringify(notes);
    }
    ```
- Now we need to write the file that will store the `notes` using the `writeFileSync` function on the `notes.json` file using `dataJSON` as it content
    ```js
    const saveNotes = function(notes) {
        const dataJSON = JSON.stringify(notes);
        fs.writeFileSync('notes.json', dataJSON);
    }
    ```
- Use the `saveNotes` function on the `addNotes`
    ```js
    const addNote = function(title, body) {
        const notes = loadNotes();
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
    }
    ```
- Go to your terminal and run the `app.js` script again

    `node app.js add --title="test" --body="testing, test"`

- You should see that on the `notes-app` directory a new file is created called `notes.json`
- Inside of that file you will see the `title` and `body` that you added when you run the `add` command
- Now run the `add` command again with different inputs for the `title` and `body`
- You should see that the `notes.json` file is updated and have the new and old notes on it
- We will add one last feature that will be checking if a `title` already exists to not create a new note if that happens. So we need to look at the `notes` array on the `addNotes` function to see if the `title` that we get on the argument exists and for this, we will use the `filter` method like this:
    ```js
    const addNote = function(title, body) {
        const notes = loadNotes();
        const duplicateNotes = notes.filter(function(note) {
            return note.title === title;
        });

        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
    }
    ```
    The `filter` function will return the `notes` that match certain criteria. The `filter` method receives a function that will be called for each item of the `array` and will send the individual item as a parameter on that function and if you return `true` the current item will be returned. In our case, we will check every item of the array of `notes` to see if we already have a `title` and if it have it we will store it on the `duplicateNotes` constant
- Now below of the `duplicateNotes` variable add a condition that checks the length of `duplicateNotes` and puts all the `addNotes` logic inside of it. Console a message to now that a note is added
    ```js
    const addNote = function(title, body) {
        const notes = loadNotes();
        const duplicateNotes = notes.filter(function(note) {
            return note.title === title;
        });

        if(duplicateNotes.length === 0) {
            notes.push({
                title: title,
                body: body
            });
        
            saveNotes(notes);
            console.log('New note added!');
        }  
    }
    ```
- Finally add a `else` block with a message that no new note id added
    ```js
    const addNote = function(title, body) {
        const notes = loadNotes();
        const duplicateNotes = notes.filter(function(note) {
            return note.title === title;
        });

        if(duplicateNotes.length === 0) {
            notes.push({
                title: title,
                body: body
            });
        
            saveNotes(notes);
            console.log('New note added!');
        }  else {
            console.log('Note title taken!');
        }
    }
    ```
- Get back to your terminal and run one on the same command as before
- You should see that the `Note title taken!` shows up
- Run the `add` command again but will a new `title`
- You should see that a new note is created without any issue

### Removing a Note

Now that we have the `add` command we can continue with the `remove` one. So let's begin!!!

- On your editor go to the `app.js` file on the `notes-app` directory
- We need to add the first option that the `remove` will use that is the `title` of the note that we are going to `remove` so add the `builder` property on the `remove` command
    ```js
    yargs.command({
        command: 'remove',
        describe: 'Remove a note',
        builder: {},
        handler: function(argv) {
            console.log('Removing a note');
        }
    });
    ```
- Now add the `title` option on the `builder` object and the `title` will have a `description`; will be a `string` and should be `require`
    ```js
    yargs.command({
        command: 'remove',
        describe: 'Remove a note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function(argv) {
            console.log('Removing a note');
        }
    });
    ```
- Go to the `notes.js` file
- Add a new function bellow of the `addNotes` function call `removeNote` that recive a `title` and log that `title`
    ```js
    const removeNote = function(title) {
        console.log(title);
    }
    ```
- Export the `removeNote` function
    ```js
    module.exports = {
        getNotes: getNotes,
        addNote: addNote,
        removeNote: removeNote
    };
    ```
- Go back to the `app.js` file and use the `removeNote` function on the `remove handler` and sent the `title` that it recive via arguments
    ```js
    yargs.command({
        command: 'remove',
        describe: 'Remove a note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function(argv) {
            notes.removeNote(argv.title);
        }
    });
    ```
- Now on your terminal go to the `notes-app` directory and run the `app.js` script with the `remove` command and sending a `title`

    `node app.js remove --title="testing"`

- You should see the `title` as the output
- Now we need to do the `removeNote` function so get to the `notes.js`
- On the `removeNote` function use the `loadNotes` function to get all existing notes and remove the log
    ```js
    const removeNote = function(title) {
        const notes = loadNotes();
    }
    ```
- Then use `filter` to get all notes that don't match with the `title` that we recive as an argument. The notes will be store on a variable call `notesToKeep`
    ```js
    const removeNote = function(title) {
        const notes = loadNotes();
        const notesToKeep = notes.filter(function(note) {
            return note.title !== title;
        });
    }
    ```
- Now we need `save` the notes that we have on the `notesToKeep` variable but we need to make sure that we only call this function when we actually `remove` a note so we will do a condition that check if the `notes` variable have different `length` that the `notesToKeep` that will mean that you remove a note
    ```js
    const removeNote = function(title) {
        const notes = loadNotes();
        const notesToKeep = notes.filter(function(note) {
            return note.title !== title;
        });

        if(notesToKeep.length !== notes.length) {}
    }
    ```
- Inside of the condition add the `saveNotes` function sending the `notesToKeep` variable as a parameter with a message that represent that we `remove` a note
    ```js
    const removeNote = function(title) {
        const notes = loadNotes();
        const notesToKeep = notes.filter(function(note) {
            return note.title !== title;
        });

        if(notesToKeep.length !== notes.length) {
            saveNotes(notesToKeep);
            console.log(chalk.green.inverse('Note removed!'));
        }
    }
    ```
- Now add an `else` clause with a message that represents that we don't `remove` a note
    ```js
    const removeNote = function(title) {
        const notes = loadNotes();
        const notesToKeep = notes.filter(function(note) {
            return note.title !== title;
        });

        if(notesToKeep.length !== notes.length) {
            saveNotes(notesToKeep);
            console.log('Note removed!');
        } else {
            console.log('No note found!');
        }
    }
    ```
- Get to the terminal and install the [chalk package](https://www.npmjs.com/package/chalk)

    `npm install chalk`

- Go back to the `notes.js` file
- Require the `chalk` package bellow the `fs` module

    `const chalk = require('chalk');`

- Now use `chalk` on the all logs of the `addNote` and `removeNote` to be `green` for affirmative message and `red` for negative one like this
    ```js
    const removeNote = function(title) {
        const notes = loadNotes();
        const notesToKeep = notes.filter(function(note) {
            return note.title !== title;
        });

        if(notesToKeep.length !== notes.length) {
            saveNotes(notesToKeep);
            console.log(chalk.green.inverse('Note removed!'));
        } else {
            console.log(chalk.red.inverse('No note found!'));
        }
    }
    ```
- Get back to your terminal and use the `remove` command sending an existing note `title`
- You should see a `green` log and the note should not be on the `notes.json` file
- Use the `remove` command and send a `title` that does not exist
- You should see a `red` message and no notes should be `remove` from the `notes.json` file

### ES6 Aside: Arrow functions

Now we are going to make a quick stop to talk about a `js` feature that is called `arrow functions`.

- First; on your editor; create a new file on the `playground` directory call `2-arrow-function.js`
- Now on this newly create file add the following function
    ```js
    const square = function(x) {
        return x * x;
    }
    ```
    This function receives a number then return the `square` of that number
- Run and console the `square` function with sending a number

    `console.log(square(3));`

- Now on your terminal; go to the `playground` directory and run the `2-arrow-function.js` script with `nodemon`

    `nodemon 2-arrow-function.js`

- You should see the `square` of the number that you send to the `square` function
- Now get back to the `2-arrow-function.js` file
- Update the `square` function like the following
    ```js
    const square = (x) => {
        return x * x;
    }
    ```
    On an `arrow` function the first thing that we set is the `arguments` without the `function` keyword; then the `arrow`(`equal` and the `greater than` symbols) and finally the `code` block of the function
- Save the file and check the logs on the terminal
- You should see the same output as before
- Now we are going to take a look at the `arrow` function `shorthand syntax`. A lot of the functions that we use are pretty simple where we `return` immediately the value that we need. Now update the `square` function as the following:

    `const square3 = (x) => x * x;`

    If you `return` the value that you need immediately you can put that value after the `arrow` and that will be `retuned` after calling the function
- On your terminal; you should see the same output as before
- Now we are going to see the `arrow` function in the context of methods; in other words `arrow` functions as the properties of an object. Remove the previous code
- Add an object call `event`

    `const event = {}`

- Add a `name` property with the following message:
    ```js
    const event = {
        name: 'Birthday party'
    };
    ```
- Now we will add a `printGuestList` that have a function that console a message with the `name` property as part of the message
    ```js
    const event = {
        name: 'Birthday party',
        printGuestList: function() {
            console.log('Guest list for ' + this.name);
        }
    };
    ```
    To have access to the `name` property of the object we need to use the `this` binding that will have a reference to the `event` object
- Now use the `printGuestList` function bellow the `event` definition

    `event.printGuestList();`

- On your terminal you should see the following: `Guest list for Birthday party`
- Now get back to the `event` object and remove the `function` keyword of the `printGuestList` property and add a `arrow`
    ```js
    const event = {
        name: 'Birthday party',
        printGuestList: () => {
            console.log('Guest list for ' + this.name);
        }
    };
    ```
- Save the file and check your terminal
- You should see the following:

    `Guest list for undefined`

    We got `undefined` because the `arrow` functions don't `bind` their own `this` value which means that we don't have access to the `this` biding as a reference of the `event` object so in this case is better to use a standard function
- We got a method `shorthand` to use a shorter syntax for the case of the `event` object will still having access to the `this` biding and all the standard feature
    ```js
    const event = {
        name: 'Birthday party',
        printGuestList() {
            console.log('Guest list for ' + this.name);
        }
    };
    ```
    This is a alternative syntax available to us when we are using methods on objects
- Save the file and and check the terminal
- You should see the following: `Guest list for Birthday party`
- Lets add some more data to the `event` object
    ```js
    const event = {
        name: 'Birthday party',
        guestList: ['Andrew', 'Jen', 'Mike'],
        printGuestList() {
            console.log('Guest list for ' + this.name);
        }
    };
    ```
- Now the goal will be to print all the guest of the `guestList` property bellow of the console of the `printGuestList` function. So use the `forEach` function on the `guestList` array
    ```js
    const event = {
        name: 'Birthday party',
        guestList: ['Andrew', 'Jen', 'Mike'],
        printGuestList() {
            console.log('Guest list for ' + this.name);
            this.guestList.forEach();
        }
    };
    ```
- As a parameter to the `forEach` method add a function that will recive an `argument` call `guest` and console the following message using the `guest` argument and the `name` of the event
    ```js
    const event = {
        name: 'Birthday party',
        guestList: ['Andrew', 'Jen', 'Mike'],
        printGuestList() {
            console.log('Guest list for ' + this.name);
            this.guestList.forEach(function(guest) {
                console.log(guest + ' is attending ' + this.name);
            });
        }
    };
    ```
- Save and check your terminal
- You will see the following:
    ```bash
    Andrew is attending undefined
    Jen is attending undefined
    Mike is attending undefined
    ```
    We got the `event name` because we the standard function like the one we use on as a parameter of the `forEach` method is going to have it own `this` biding and actually we don't want that this function don't have it own `this` biding; we actually want that have access to it parent function biding
- Now get to the function on the `forEach` parameter and change that function to be a `arrow` function
    ```js
    const event = {
        name: 'Birthday party',
        guestList: ['Andrew', 'Jen', 'Mike'],
        printGuestList() {
            console.log('Guest list for ' + this.name);
            this.guestList.forEach((guest) => {
                console.log(guest + ' is attending ' + this.name);
            });
        }
    };
    ```
- Save the file and check your console
- You should see the following:
    ```bash
    Andrew is attending Birthday party
    Jen is attending Birthday party
    Mike is attending Birthday party
    ```
    The `arrow` function doesn't bind the `this` value; they access to the `this` value in the context in which they are created in this case the `printGuestList` function

### Refactoring to use arrow functions

On the examples that we are doing on this repository, we will use `arrow` functions and `shorthand syntax` as most as we can so we will need to refactor the functions that we have at this moment.

- On your editor; go to the `app.js` file in the `notes-app` directory
- In here we got all the commands of the application and as you see we got a function on the `handler` property and as we see before when we got a method in a object we can use the `shorthand syntax` for functions like this:
    ```js
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {...},
        handler(argv) {
            notes.addNote(argv.title, argv.body);
        }
    });
    ```
- Do the same for all the other commands
- Now get to the `notes.js` file
- Here we got a lot of functions that we can use `arrow` functions. So lets begin with the `addNote` function. Turn that function to a `arrow` function

    `const addNote = (title, body) => {...}`

- Then inside of the `addNote` function we got a `filter` method that recive a function and that can be an `arrow` function and use the `shorthand syntax`
    ```js
    const addNote = (title, body) => {
        const notes = loadNotes();
        const duplicateNotes = notes.filter((note) => note.title === title);

        if(duplicateNotes.length === 0) {
            ...
        } else {...}
    }
    ```
- Now is the `removeNote` function turn and will be similar job than the `addNote` funtion
    ```js
    const removeNote = (title) => {
        const notes = loadNotes();
        const notesToKeep = notes.filter((note) => note.title !== title);

        if(notesToKeep.length !== notes.length) {
            ...
        } else {...}
    }
    ```
- The next stop is the `saveNotes` function and there we can just turn into an `arrow` function
    ```js
    const saveNotes = (notes) => {
        const dataJSON = JSON.stringify(notes);
        fs.writeFileSync('notes.json', dataJSON);
    }
    ```
- Finally; we will do the same as the `saveNotes` function on the `loadNotes`
    ```js
    const loadNotes = () => {
        try {
            ...
        } catch(e) {...}
    }
    ```
- Test the `add` and `remove` command on your terminal

You may as yourself; since we are exporting those functions on an object why we don't use the `shorthand syntax` on a standard function? The reason is that those functions are not designed to work with a specific object and don't need the `this` keyword.

### Listing notes

Now we can continue with another command in this case the `list` command. The `list` command will print a header message then will print each note `title`.

- On your editor; go to the `notes.js` file in the `notes-app` directory
- On that file; bellow the `removeNote` function add a new function call `listNotes`

    `const listNotes = () => {}`

- On this newly created function; load all notes using the `loadNotes` function
    ```js
    const listNotes = () => {
        const notes = loadNotes();
    }
    ```
- Now print a message to be the header message of the command
    ```js
    const listNotes = () => {
        const notes = loadNotes();

        console.log(chalk.green.inverse('Your notes'));
    }
    ```
- Finally; use the `forEach` method on the `notes` variable to console the `title`
    ```js
    const listNotes = () => {
        const notes = loadNotes();

        console.log(chalk.green.inverse('Your notes'));

        notes.forEach(note => console.log(note.title));
    }
    ```
- Export the `listNotes` function
    ```js
    module.exports = {
        getNotes: getNotes,
        addNote: addNote,
        removeNote: removeNote,
        listNotes: listNotes
    };
    ```
- Get to the `app.js` file
- Use the `listNotes` function on the `list` command
    ```js
    yargs.command({
        command: 'list',
        describe: 'List your notes',
        handler() {
            notes.listNotes();
        }
    });
    ```
- Now get to your terminal and go to the `notes-app` directory
- Run the `app.js` script with the `list` command
- You should see the list of all available notes

### Reading a note

Before we get to the last command of the application we will need to do a quick stop on the `addNote` function to check the `filter` method that we are using.

We use `filter` to track down potential `duplicates` and keep the notes that we wanna keep but `filter` look throw every single item of the array and run the function that checks if its a `duplicate` on each of them; the problem is that regardless what happened with the condition `filter` will check every single item to the end of the array and we don't want this; it better to us that when it finds the first `duplicate` stop checking. For this, we will change the `filter` method using `find` that will return the first occurrence. Let's get to it!!

- On your editor; get to the `note.js` file in the `notes-app` directory
- Update the `duplicateNotes` name to `duplicateNote`
- Update the `filter` function using the `find` method

    `const duplicateNote = notes.find((note) => note.title === title);`

- Update the condition to check if `duplicateNote` is `undefined`
    ```js
    const addNote = (title, body) => {
        const notes = loadNotes();
        const duplicateNote = notes.find((note) => note.title === title);

        if(!duplicateNote) {
            ...
        } else {...}
    }
    ```

Now we can work with the final command that will be the `read` command. The `read` command will receive a `title` as an argument then print the `title` and `body` of the note if it finds it.

- Go to the `app.js` file
- Add a `builder` option on the `read` command
    ```js
    yargs.command({
        command: 'read',
        describe: 'Read a note',
        builder: {},
        handler() {
            console.log('Reading a note');
        }
    });
    ```
- Now add the `title` option that will be a `string` and `require`
    ```js
    yargs.command({
        command: 'read',
        describe: 'Read a note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler() {
            console.log('Reading a note');
        }
    });
    ```
- Now get to he `notes.js` file
- Bellow the `listNote` function; add a new one call `readNote` that recive a `title`

    `const readNote = (title) => {}`

- Now load all notes on the `readNote` function
    ```js
    const readNote = (title) => {
        const notes = loadNotes();
    }
    ```
- Then use the `find` method to get the specific note that match with the `title` that we recive on the parameters
    ```js
    const readNote = (title) => {
        const notes = loadNotes();
        const note = notes.find((note) => note.title === title);
    }
    ```
- Add a condition to check if we have a match on the `title` condition
    ```js
    const readNote = (title) => {
        const notes = loadNotes();
        const note = notes.find((note) => note.title === title);

        if(note) {} else {}
    }
    ```
- Print the `title` and `body` of the note that have a match with the `title` that came as an argument. Use `chalk` to have a `inverse` color on the `title`
    ```js
    const readNote = (title) => {
        const notes = loadNotes();
        const note = notes.find((note) => note.title === title);

        if(note) {
            console.log(chalk.inverse(title));
            console.log(note.body);
        } else {}
    }
    ```
- Finally; add a message when a note doesn't have a match(red inverse)
    ```js
    const readNote = (title) => {
        const notes = loadNotes();
        const note = notes.find((note) => note.title === title);

        if(note) {
            console.log(chalk.inverse(title));
            console.log(note.body);
        } else {
            console.log(chalk.red.inverse('No note found!'));
        }
    }
    ```
- Now get to your terminal and test the `read` command!!

## Section 4: Debugging node.js(Notes App)

Is a good moment to explore how to debug an application using the `notes app` that we already build so here we will get the tools that we need to explore `errors` and fix them.

### Debugging using node.js

In general there are 2 types of `errors` that we are going to encounter in a `node.js` application:

- An explicit `error` message: Some kind of `error` that is handle by `node` and have an explicit message for it like a `typo` on the code
- An not explicit `error` message: You got some kind of `error` on your logic and you will need to find it

The more basic `debugging` tool that we can use is `console.log`. We can print each piece of data that we need to check a piece of code that has some issues. Is not the best but is the most basic one.

The other one is the `debugger` from `node` that is the `node's` built in `debugging` tool which intigrate `v8` and the `chrome` browser. The `debugger` like `console.log` need to be in aspecific place on the application. Lets say that we want to check all the variables of the `addNote` function in a point of time; you will need to do something like this:

- On your editor; go to `notes.js` file on the `notes-app` directory
- Before the condition; add the `debugger` keyword
    ```js
    const addNote = (title, body) => {
        const notes = loadNotes();
        const duplicateNote = notes.find((note) => note.title === title);

        debugger

        if(!duplicateNote) {
            ...
        } else { ... }
    }
    ```
    This will stop the application at a point in time that I can the `dev tools` to check any value that I want. One thing to know is that our application will not have any change when we add the `debugger` keyword and it will not pause our application by default
- On your terminal; go to the `notes-app` directory
- Now we need that the `debugger` begin to work and to do this we need to use the `inspect` option when we use the `node` command. Since we add the `debugger` on the `addNote` function we will need to run the `add` command.
    
    `node inspect app.js --title="test" --body="testing"`
- You should see some logs ending with the `debug>` line. These are the logs that use `node` to let us know that the `debugger` is running
- Now open the `chrome` browser(This is a `chrome` feature so for `debugging` we will need to use this browser)
- Go to this url: `chrome://inspect/#devices`
- You will see a `Remote target` title with some stuff below (At least 2 targets; both are the same). If you don't see anything this means that you have a misconfiguration(This happened sometimes) you will need:
    - Click on the `configure` button of the `Discover network targets`
    - On the `Target discovery setting` modal; add `localhost:9229`
    - Then add `127.0.0.1:9229`
    - Click on the `Done` button
- Click on the `inspect` link on one of the `targets`
- The `chrome dev tool` should open with `app.js` file(If you don't see the `app.js` file you can click on the first option on the `Call Stack` section at the right)
- Now we will add the `notes-app` directory to the `dev tool`; so click on `Add folder to workspace` at the left side(Choose the `notes-app` directory when it asks you)
- You should see all files of the `notes-app` directory on the left side. Also, you will see a little `green` icon on the `app.js` file which means that is the currently active file. Is important to mention that any line of the code is run yet; you will see a line lighting on `blue`; on the right, you will see where the program is currently is and the `scope` that we have access and at the top of the right side you will have the buttons that will take use throw the application
- Click the `blue` play button at the top right. That button will run the code until it finds a `debugger` keyword
- You will see that it run the code and pause on the `debugger` keyword in `note.js`. On the `Call Stack` you will see where we are at that moment and below you will see on the `Scope` section all the variables that we have access to at that moment
- On the `dev tool` console type the name of one of the variables that you have available at that moment like `body`
- You will see that you have access to the `body` variable and log its value
- Click again into the `blue` play button
- Since we don't have any other `debugger` the code will finish and print the result on the console of the `dev tool`(Unfortunately `chalk` can't style the logs on the browser)
- Close the `dev tool`
- Check that the `targets` are not available
- Go to your terminal and type `restart`(This command will `restart` the app again)
- Now shut down the `debugger` using `command + c` twice
- Remove the `debugger` keyword on `notes.js` file

### Error messages

To talk about `errors` the first thing we are going to do is generate an` error`.

- On your editor; go to the `note.js` file on the` notes-app` directory
- Then on the `saveNotes` function update the` dataJSON` to `dataJsON` just one time; leave the other call as it is
- Now get to your terminal and go to the `notes-app` directory
- Run the `app.js` script with one of the commands that use the` saveNotes` function like the `add` command
- You should get a big output that is an `error`

You will need to scroll until you see a broken line; that is the important part of the `error` message in this case:

`ReferenceError: dataJsON is not defined`

This is the actual `error` message from` v8` that tells you why the program didn't run. In this case, is a `ReferenceError` that is one of the` error` categories and it have an explicit message. The message tells us why the program didn't run but it doesn't say why so is going to be up to the dev to identify what is producing the issue.

Bellow the message you will have a `stracktrace` and this contains a `trace` of all functions that are running to get to the `error`. In this case, you will see a call to the `saveNotes` function pointing to the correct file and the line that the` error` happens. This will be the most useful line that you will get after the `error` message. As we go down the `trace` we will get less specific messages until you get to the` node` internals calls.

Note: Remember to fix the issue of `dataJsON`

## Section 5: Asynchronous node.js(Weather App)

If you check some information on what `node` is maybe you found some of this thing:
- Asynchronous
- Non-blocking
- Single-threaded
- Event-driven

All of those are correct when you are describing `node`. In this section, we will see all those terms and make an example that will help us to understand them. We will be working on a `weather` app that will have a `frontend` on the browser where the user will provide its `location` and begin the scenes we will have `node` communicating with third-party services to convert that `location` into a `forecast`; then we going to send the `forecast` to the browser so we can render the data for the user.

### Asynchronous basic

Now we are going to make our first `non-blocking` example that will mean that we are going to make a code that will continue running while waiting for an `I/O` process to complete. Let's begin

- On the root directory; create a new folder call `weather-app`
- Inside of this newly created directory; add a file called `app.js`
- Open to the `app.js` file
- Add 2 consoles with the following messages
    ```js
    console.log('Staring');

    console.log('Stopping');
    ```
    As you may know, we have a synchronous program where one line run after the other regardless of how long each line take to execute
- Now we will use one of the basic `asynchronous` functions that `node` provides which is the `setTimeout`(it allow us to run some code after a specific amount of time). Use the `setTimeout` between the consoles like this:
    ```js
    console.log('Staring');

    setTimeout(() => {
        console.log('2 second timer');
    }, 2000);

    console.log('Stopping');
    ```
    The first argument of the `setTimeout` function is a function and the second is a number that represents the amount of time in milliseconds that will pass to run the function that we send as a first argument(`2000` ms === `2`s)
- On your terminal; go to the `weather-app` directory
- Use `node` to run the `app.js` file: `node app.js`
- You will see the following:
    ```bash
    Staring
    Stopping
    2 second timer
    ```
    The `Staring` and `Stopping` logs appear immediately then the program hangs for `2` seconds and finally print the `2 second timer` message. This means our `node` app is a `no-blocking` because it can do other things when you run an `asynchronous function 
- Now let's add another `setTimeout` with `0` ms
    ```js
    console.log('Staring');

    setTimeout(() => {
        console.log('2 second timer');
    }, 2000);

    setTimeout(() => {
        console.log('0 second timer');
    }, 0);

    console.log('Stopping');
    ```
- Get to the terminal and run one more time the `app.js` script
- You will get the following
    ```bash
    Staring
    Stopping
    0 second timer
    2 second timer
    ```
You may ask why the `0 second timer` print after the 2 other consoles if it does not wait to run the function? The answer will be in the next section.

### Call Stack, callback Queue, event loop

In the last example we see strange behavior when we run an `asynchronous` function; that behavior will be address in this section where we are going to explore how `node` and `v8` run the `asynchronous` functions.

On the example we will have a piece of code; the output of the terminal and a visual representation of what is happening behind the scenes on both `node` and `v8`(`Call Stack`, `Node APIs`, `Event Loop` and `Callback Queue`)

But first, let define some terms:

- `Call Stack`: This is a simple data structure provided by the `v8` engine and its job is to track the execution of the program and is does that keeping track of all the functions that are currently running. We actually saw a `call stack` before on the `error` section where we saw 2 things: the actual `error` message and bellow that we saw all the functions that are running that get to the point of the one that has the `error` on the program and that is a `call stack`. The `call stack` works by adding a function one on top of another so to get to the first one that you added you will need to remove the one above it.

- `Node APIs`: Is the API that has some function implementation on `C++` that we can use on our `node` script 

- `Callback Queue`: Maintain all the `callback` functions that are ready to get executed

- `Event loop`: It looks at the `call stack` and the `callback queue`. If the `call stack` is empty it will run items on the `callback queue`


Lets begin running the following `synchronous` example:

```js
const x = 1;
const y = x + 2;
console.log('Sum is ' + y);
```

The first thing that is going to happen is that our script will be wrap in a `main` function that `nodeJs` provide and that is the first function that is pushed to the `call stack`

```
--- Call Stack ---
|     main()     |
--- Call Stack ---
```

When something is pushed to the `call stack` this means that the function that is pushed will be executed. This means that the `main` function will be excuted at this moment and will begin to run the script.

The `const x = 1;` will create the constant with the value of `1`; then the `y` constant is created with the `3` value finally we call the `console.log('Sum is ' + y);` but remember if you call a function this will be added to the `call stack`.

```
---- Call Stack ----
|  log('Sum is 3') |
|     main()       |
---- Call Stack ----
```

When the `log` run we actually are going to see the output

```
---- Call Stack ----         --- output ---
|  log('Sum is 3') |    =>   |  Sum is 3  |
|     main()       |         --- output ---
---- Call Stack ----
```

When a function finishes or returns a value will be removed from the `call stack`. Since the `log` function finish it will be removed

```
---- Call Stack ----
|     main()       |
---- Call Stack ----
```

Now that we run the last line of the script the `main` function will also be removed from the `call stack` and the program is done.

For the next example we still have a `synchronous` function but a little more complex:

```js
const listLocations = (locations) => {
    locations.forEach((location) => {
        console.log(location);
    });
}

const myLocations = ['Philly', `NYC`];
listLocations(myLocations);
```

Now let's begin to run our script and as you may know the first thing that will happen is that the `main` function is pushed to the `call stack`

```
---- Call Stack ----
|     main()       |
---- Call Stack ----
```

This will begin the execution of the script and on the first line we will create the `listLocations` constant and create a function as its value but we are not calling this function just yet; then we move to the `myLocations` line where we create that constant and give an array of strings as its value; finally we get to the last line of the script where we call the `listLocations` function sending the `myLocations` array; since this is a function it will be added to the `call stack`

```
------ Call Stack ------
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

Now the `listLocations` function will begin to run and the only thing on this function is a loop on the `locations` parameter using `forEach` and `forEach` is a function so it will be added to the `call stack`

```
------ Call Stack ------
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

The `forEach` will run and for each `location` will run a function; since a function will run will be added to the `call stack`(The function don't have a name so it will be an `anonymous` function)

```
------ Call Stack ------
|  anonymous('Philly') |
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

Inside of the `anonymous` function is the `log` function so it will be added to the `call stack` too. After the `log` run will be output a value

```
------ Call Stack ------      --- output ---
| console.log('Philly') |     |   Philly   |
|  anonymous('Philly')  |     --- output ---
|     forEach(...)      | => 
| listLocations([...])  |
|      main()           |
------ Call Stack ------
```

Since `log` finish will remove it from the `call stack`

```
------ Call Stack ------
|  anonymous('Philly') |
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

The `anonymous` finish after the `log` so it will also remove it from the `call stack`

```
------ Call Stack ------
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

The `forEach` function will run again another `anonymous` function will the next value of the array and that will be added to the `call stack`

```
------ Call Stack ------
|   anonymous('NYC')   |
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

Inside of the `anonymous` function is the `log` function so it will be added to the `call stack` too. After the `log` run will be output a value

```
------ Call Stack ------     --- output ---
| console.log('NYC')   |     |   Philly   |
|  anonymous('NYC')    |     |    NYC     |
|     forEach(...)     | =>  --- output ---
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

Since the `log` finish we pop up from the `call stack` and it was the only thing that is on the `anonymous` function so it will remove it as well

```
------ Call Stack ------
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

At this point the `forEach` is done with all items on the array so it will remove it from the `call stack` and since is the only thing that is running on the `listLocations` function it will remove it as well

```
------ Call Stack ------
|      main()          |
------ Call Stack ------
```

Now we are back to the script the last line so this means that the `main` function finishes its execution and will be removed from the `call stack`

This is a little long but it will help us to understand the process that we follow when we execute a script with `node`. Now we will add our final example that is the `asynchronous` code that we saw in the previews section:

```js
console.log('Staring');

setTimeout(() => {
    console.log('2 second timer');
}, 2000);

setTimeout(() => {
    console.log('0 second timer');
}, 0);

console.log('Stopping');
```

Like the other examples the first thing that is added to the `call stack` is the `main` function

```
------ Call Stack ------
|       main()         |
------ Call Stack ------
```

The first line of the script is run and that is a `log` function that will output the first message

```
------- Call Stack -------     --- output ---
| console.log('Staring') |  => |  Staring   |
|         main()         |     --- output ---
------- Call Stack -------
```

Since the `log` finish its execution it will pull out of the `call stack`

```
------ Call Stack ------
|       main()         |
------ Call Stack ------
```

Now the execution moves to the first `setTimeout` and it will push to the `call stack`

```
------ Call Stack ------
| setTimeout(..., 2000) |
|        main()         |
------ Call Stack ------
```

Now `setTimeout` is not part of the `javascript` programing language instead is `node` that create an implementation on `C++` and provide it to your `nodeJs` script to use so when we call `setTimeout` we are registering an event with `nodeJs` API

```
------ Call Stack ------     ---- Node APIs ----
|        main()        |  => | setTimeout(2sec) |
------ Call Stack ------     ---- Node APIs ----
```

At this part of the process, the `2 seconds` clock starts to count and while we are waiting we can continue using the `call stack`. As we mentioned before `javascript` is `single threaded` and the `call stack` enforce that but `node` use some other `threats` in `C++` to begin the scenes to manage events and that is what allows us to continue to run our application while we are waiting those `2 seconds`. So we continue running our script and will get to the other `setTimeout` line

```
------ Call Stack ------     ---- Node APIs ----
|   setTimeout(..., 0) |     | setTimeout(2sec) |
|        main()        |  => ---- Node APIs ----
------ Call Stack ------
```

When we run the `setTimeout` it will register another event

```
------ Call Stack ------     ---- Node APIs ----
|        main()        |     | setTimeout(2sec) |
------ Call Stack ------  => | setTimeout(0sec) |
                             ---- Node APIs ----
```

Since the clock of the `setTimeout` begin at the moment that we register the event and one of them already finish because is `0 seconds` we actually need to run the function associate with that `setTimeout` and here is when the `event loop` and `callback queue` enter in action. The `callback queue` will add a `callback` function when a given event is done in this case the `0 seconds` timer. Here we will execute the functions top throw bottom

```
------ Call Stack ------     ---- Node APIs ----      --- Callback Queue ---
|        main()        |     | setTimeout(2sec) |     |    callback(0sec)   |
------ Call Stack ------  => ---- Node APIs ----  =>  --- Callback Queue ---
           ^                                                    ˅
| ------------------------------ Event loop ------------------------------- |
```

Before executing the `0 seconds` timer function we will need to add it on the `call stack` and that is where the `event loop` enters to action. It will look at the `call stack` and will see that is not empty so we can't run the `o seconds` timer function so `main` continue with its execution and it will run the last `log` of the script

```
------- Call Stack -------      --- output ---    ---- Node APIs ----      --- Callback Queue ---
| console.log('Stopping') |     |  Staring   |    | setTimeout(2sec) |     |    callback(0sec)   |
|         main()          | =>  |  Stopping  | => ---- Node APIs ----  =>  --- Callback Queue ---
------- Call Stack -------      --- output ---
           ^                                                                        ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

Since the `log` finish it will pull out from the `call stack`

```
------- Call Stack -------      --- output ---    ---- Node APIs ----      --- Callback Queue ---
|         main()          |     |  Staring   |    | setTimeout(2sec) |     |    callback(0sec)   |
------- Call Stack -------  =>  |  Stopping  | => ---- Node APIs ----  =>  --- Callback Queue ---
                                --- output ---
           ^                                                                        ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

Since the `main` function get to the last line of the script it will consider that its finish it execution

```
------- Call Stack -------      --- output ---    ---- Node APIs ----      --- Callback Queue ---
|                         |     |  Staring   |    | setTimeout(2sec) |     |    callback(0sec)   |
------- Call Stack -------  =>  |  Stopping  | => ---- Node APIs ----  =>  --- Callback Queue ---
                                --- output ---
           ^                                                                        ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

On a regular `synchronous` script this will mean that the execution finishes but this is not the case on our `asynchronous` program because now the `event loop` can do its job because it seems that the `call stack` is empty. It will move the `callback` to the ` call stack` to run

```
------- Call Stack -------      --- output ---    ---- Node APIs ----      --- Callback Queue ---
|      callback(0sec)     |     |  Staring   |    | setTimeout(2sec) |     |                     |
------- Call Stack -------  =>  |  Stopping  | => ---- Node APIs ----  =>  --- Callback Queue ---
                                --- output ---
           ^                                                                        ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

The only thing on the `callback` is a `log` function and that will be added to the `call stack` too

```
------- Call Stack -------      ----- output -----    ---- Node APIs ----      --- Callback Queue ---
|     console.log('0...') |     |    Staring     |    | setTimeout(2sec) |     |                     |
|      callback(0sec)     | =>  |    Stopping    | => ---- Node APIs ----  =>  --- Callback Queue ---
------- Call Stack -------      | 0 second timer |
                                ----- output -----
           ^                                                                              ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

Because the `event loop` doesn't send the `callback` function before the `main` function end is the reason for seeing the `0 second timer` message after the other `logs`. Since the `log` finish and is the only thing on the `callback` both pull out of the `call stack`

```
------- Call Stack -------      ----- output -----    ---- Node APIs ----      --- Callback Queue ---
|                         |     |    Staring     |    | setTimeout(2sec) |     |                     |
------- Call Stack -------  =>  |    Stopping    | => ---- Node APIs ----  =>  --- Callback Queue ---
                                | 0 second timer |
                                ----- output -----
           ^                                                                              ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

But the program is not finished yet but the `call stack` and `callback queue` are empty so it will sit there until the `2 seconds` are done. When the `2 seconds` are done it will add the function of the timer to the `callback queue`

```
------- Call Stack -------      ----- output -----    ---- Node APIs ----      --- Callback Queue ---
|                         |     |    Staring     |    |                  |     |   callback(2sec)   |
------- Call Stack -------  =>  |    Stopping    | => ---- Node APIs ----  =>  --- Callback Queue ---
                                | 0 second timer |
                                ----- output -----
           ^                                                                              ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

The `event loop` will see that the `call stack` is empty so will take the `callback` to the `call stack`

```
------- Call Stack -------      ----- output -----    ---- Node APIs ----      --- Callback Queue ---
|      callback(2sec)    |      |    Staring     |    |                  |     |                     |
------- Call Stack -------  =>  |    Stopping    | => ---- Node APIs ----  =>  --- Callback Queue ---
                                | 0 second timer |
                                ----- output -----
           ^                                                                              ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

The only thing on the `callback` is a `log` so it will be added to the `call stack`

```
------- Call Stack -------      ----- output -----    ---- Node APIs ----      --- Callback Queue ---
|   console.log('2...')  |      |    Staring     |    |                  |     |                     |
|      callback(2sec)    |  =>  |    Stopping    | => ---- Node APIs ----  =>  --- Callback Queue ---
------- Call Stack -------      | 0 second timer |
                                | 2 second timer |
                                ----- output -----
           ^                                                                              ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

Since the `log` finishes and was the only thing on the `callback` both are removed from the `call stack` and the program will finish its execution.

### Making HTTP requests

Now we will make an `HTTP` request from our `node` application and this is an important milestone for us because this will be the way that our application will be able to communicate with the outside world in the case of this section; if we need real-time `weather` data we will need to make an `HTTP` request.

In this section we will have an application making `HTTP` request to another company servers to get some task done in other words that somewhere on our code you will specify the URL that we wanna make the request to(provided by the API documentation); we are to fire that request; sending some data possibly and getting a response back. In our case, we will send a `location` and will get back a `weather` information that I can use.

#### Weather API

For our application, we will use the [weatherstack](https://weatherstack.com/) API to get the real-time `weather` data that we need. You can use the free trial that gives us 1000 requests a month that is more than enough for our example app.

- On your browser go to [weatherstack](https://weatherstack.com/)
- Click on the `sign up free` button at the top right
- Click `Sign up` on the `Free` option
- Fill the form and submit the data
- You will be redirected to a quick start guide
- Choose a copy of your `API` key(This is a randomly generated `string` that will help us to authenticate to make a request to `weatherstack`). DO NOT SHARE THIS API KEY
- Below you will see some endpoints docs that are worth checkout
- Now we will make our first request in order to get real-time `weather` data. Open a new tab on your browser
- Add the base URL of `weatherstack` that is `http://api.weatherstack.com/`
- To access the current `weather` data we need to add `current` on the base URL: `http://api.weatherstack.com/current`
- Now we need to provide the `API key` so we can get access to our `weatherstack` account. To provide the key we will send a `query` string with a key/value pair with the following format: `?access_key=my_access_key_number`(Change `my_access_key_number` with your `API key` number). So the URL is this to this moment:

    `http://api.weatherstack.com/current?access_key=my_access_key_number`

- Then we need to add the location that we want to obtain the `weather` information and for this, we need to add another `query` param and for this, we first need to add `&` before adding the second param

    `http://api.weatherstack.com/current?access_key=my_access_key_number&`

- Add a param call `query` that will have the coordinate of `Alcatraz; San Francisco`(The value is the `longitude` and `latitude`)

    `http://api.weatherstack.com/current?access_key=my_access_key_number&query=37.8267,-122.4233`

- Click enter and you should see a `JSON` response with a lot of information

As you see we make a request to an API and get a `JSON` as a response and when we got that response `JSON` on our code we can take it; parse it and get access to all the information that it provides.

#### Make the weather API request from our code

Now we will make the same request that we did before on the browser from our code. Let's get into it:

- On your editor; go to the `weather-app` directory and open the `app.js`
- Remove all content of that file

To make an `HTTP` request they are a few different things that we can do. We can use the `node` core modules(We will covert later), but these are a very low level and require making a lot of unnecessary code to get everything working together. There are a lot of `npm modules` that are wrappers around that core module making it easier to make an `HTTP` request and that is what we are using for this example. We will use the [request](https://www.npmjs.com/package/request) package(This package is deprecated and will remove it later; you can follow the example that we will remove it later).

- Now get to your terminal and go to the `weather-app` directory
- Initialize the project with `npm init -y`(The `-y` allow us to answer `yes` to every question)
- Install the `request` module using: `npm install request`
- On your editor; go to the `app.js` file on the `weather-app` directory
- Require the `request` module

    `const request = require('request');`

- Store the URL that you use on your browser to access the `weatherstack` API information

    `const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number&query=37.8267,-122.4233';`

- Now use the `request` module sending an object as a first value and an `arrow` function as the second one

    `request({}, () =>  {});`

    - The first parameter is an optional object that outlines what we like to do; that is where we provide the URL and other information
    - The second argument is a function to run when we actually got a response

- Set a `URL` property on the options object with the `weatherstack` URL as it value

    `request({ url: url }, () =>  {});`

- Add the `error` and `response` parameters to the function argument of the request. The `error` parameter will tell us if we got some kind of `error` when we do the request and the `response` will have all sources of information including the actual data return by the API

     `request({ url: url }, (error, response) =>  {});`

- Console the `response` on the function

    ```js
    request({ url: url }, (error, response) =>  {
        console.log(response);
    });`
    ```

- Go to your terminal and run the `app.js` file using: `node app.js`
- You will see a lot of information output on your terminal. You will see a large string on green color and that is our `JSON` data on the `body` property
- Let parse the `body` property. So get back to the `app.js` file
- Add a constant call `data` and use `JSON.parse` on the `body` property as it value

    ```js
    request({ url: url }, (error, response) =>  {
        const data = JSON.parse(response.body);
        console.log(data);
    });
    ```

- Get back to your terminal and run the `app.js` script
- You will see a lot of data output to the terminal related to the `weather`
- For the moment we just have interest in the `current` property so let's log just this property

    ```js
    request({ url: url }, (error, response) =>  {
        const data = JSON.parse(response.body);
        console.log(data.current);
    });
    ```

- On your terminal run the `app.js` script again
- You will see the `current weather` information of the `location` that we provide

### Customizing HTTP request

Now we will explore some options to customize the request so we can have some more information from the API and make us easier handle the response data on our code. First, we will automatically `parse` the response.

- On your editor; go to the `app.js` and get on the `weather-app` directory
- On the configuration object of the `request` function add the `json` property and set it to `true`

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        const data = JSON.parse(response.body);
        console.log(data.current);
    });
    ```

    The `JSON` property when is set to `true` will automatically `parse` the response of the request to an object. By default is `false`

- Now we can remove the `JSON.parse` from the function because is already an object and print the `body` property of the `response`

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        console.log(response.body);
    });
    ```

- On your terminal go to the `weather` directory and run the `app.js` script with `node app.js`
- You should see the same response as before
- Now we will need to use some more information to use it on our code and for this will be easier for us to check it on the browser instead of the terminal. So go to the browser and put the same URL that we use before to get a response
- But is difficult to see so you will need an extension to have a better view of the data in my case; on `chrome`; I use [JSON formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en). Install one extension of your choosing on the browser that you are using to continue

    As you see on the response we will have: 
    - A `request` property with contains information about the request that `weatherstack` process
    - A `location` property that tells us information from the `location` that we are viewing the `weather` data
    - A `current` property that contains the `current weather` data

    We will use the `weather_description`; the `temperature on Fahrenheit` and the `feels like temperature on Fahrenheit` 

- Now get back to the `app.js` file
- Remove the console
- Add a new variable call `currentWeather` that its value will be the `current` property of the response

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        const currentWeather = response.body.current;
    });
    ```
- Now we will need a console to add the message that we need. The first thing that we will add if the `weather_descriptions` property and that property as you see on the response in the browser is an `array` and we will need to put the first position

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        const currentWeather = response.body.current;

        console.log(currentWeather.weather_descriptions[0]);
    });
    ```
- Then we will need to access the current `temperature` with the following message 

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        const currentWeather = response.body.current;

        console.log(currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out.');
    });
    ```

- At this moment we just missing to add the `feels like temperature` that will be on the `feelslike` property

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        const currentWeather = response.body.current;

        console.log(currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out.');
    });
    ```

- Finally, we need to change the `temperature` from `celsius` to `Fahrenheit`. For this, we will need to check the `weatherstack` documentation. On your browser open a new tab and go to this [url](https://weatherstack.com/documentation)
- On the left sidebar search for the `units` option and click on it
- You will see all the information of the `units query param` that we can use
- Get back to the `app.js` file on the
- At the end of the `url` value add the following: `&units=f`
- On your terminal re-run the `app.js` script
- You should see the message that we set

### Using mapbox api

Now we will use the [mapbox](https://www.mapbox.com/) API that will provide a `geocoding` service. The `geocoding` service is the process to take an `address` and covert it into a `latitude` and `longitude`. When we have those coordinates we can combine them with the `weatherstack` API to get the `weather` from a determined location but for the moment we will do the request separate to test.

- On your browser; go to the [mapbox page](https://www.mapbox.com/). `Mapbox` have a lot of services but we will be using the `geocode` service
- Click on the `sign in` button at the top right
- Fill the form and submit it
- You will be redirected to a getting start page
- Copy the `public token` and store it for later
- Search for the `Mapbox services` link and click on it. This will let you the request documentation of `mapbox`
- On the left sidebar click on the `Search service` dropdown
- Then click on `Geocoding`

    You will see that we have to type of `geocoding`:
    - `Forward geocoding`: We provide an `address` and get back the `latitude` and the `longitude`(This is what we are going to use)
    - `Reverse geocoding`: We provide a `latitude` and `longitude` and get back an `address`

- Scroll down to the `endpoint` section. Get to the `forward geocoding` section

    As you see in the table we will have 2 required parameters:
    - `endpoint`: `Mapbox` type of service and we have `mapbox.places` that is the main one or `mapbox.places-permanent` that is for enterprises and customers
    - `search_text`: This is where we provide the `address`

- Continue scrolling until you get to the `Example request: Forward geocoding` example
- Copy the URL without the quotes(Already have your access token)
- Open a new browser tab
- Paste the URL that you just copy

    As you see on the browser you will get a `JSON` response with 4 properties: `type`, `query`, `features`, and `attribution`. The `query` property will let us know what we provide via the URL. The `features` contain an array with the data that we want. By default the `features` array will have the 5 more relevant results for your `search term` and the most relevant one is the first one. You can see that each item on the features array is an object and for use, the `place_name`(Contains the name of the location) and the `centers`(Contains the `longitude` and `latitude`) properties are the ones that we are interested

- Now get back to the documentation tab
- Get to the optional parameters of the `forward geocoding`
- Search for `limit`

    As you see the `limit` parameter will help us to specify the maximum of results that returns the `api`. In our case, we will specify that return just the most relevant one

- Get back to the tap that we see the `JSON` result
- At the end of the URL add the following: `&limit=1`
- Click enter
- You should see that the `features` array just have one item

#### Using request with mapbox

- On your editor get to the `app.js` file on the `weather-app` directory
- Bellow the `URL` constant; add a new constant call `geoCodeUrl` that its value will be the URL that you use before to see the `JSON` response of `mapbox`
- Now at the button use the `request` method sending the configuration object(URL and JSON parse option) and a callback function

    ```js
    request({ url: url, json: true }, (error, response) =>  {});
    ```

- On the callback function; create a new constant call `coordinatesInfo` that its value will be the coordinates of the location(`latitude` and `longitude`)

    ```js
    request({ url: url, json: true }, (error, response) =>  {
        const coordinatesInfo = response.body.features[0].center;
    });
    ```

- Print the `latitude` and `longitude`

    ```js
    request({ url: url, json: true }, (error, response) =>  {
        const coordinatesInfo = response.body.features[0].center;
        console.log('The latitude is ' + coordinatesInfo[1] + ' and the longitude is ' + coordinatesInfo[0]);
    });
    ```
- On your terminal; go to the `weather-app` directory
- Run the `app.js` script using: `node app.js`
- You should see the correct `latitude` and `longitude` print on the console
### Handling Errors

We need to think that not always we are going to have the best-case scenario when we do a request to an `API` because plenty of things can go wrong so in this section we will check how to handle a couple of those` errors` that can happen.

One of the most common things that can happen is when we don't have any network available. Let's check how to handle this

- On your editor go to the `app.js` file on the `weather-app` directory
- Comment the `geocoding` code
- On your computer turn off your internet connection
- On your terminal; go to the `weather-app` directory
- Run the `app.js` script with:` node app.js`
- You should see a big `error` message
- Now get back to the `app.js` file
- On the `weatherstack` request callback; console the `error` parameter and comment on the other code

    ```js
    request ({url: url, json: true}, (error, response) => {
        console.log (error);
        // const currentWeather = response.body.current;
        // console.log (currentWeather.weather_descriptions [0] + '. Its is currently' + currentWeather.temperature + 'degrees out. Its feels like' + currentWeather.feelslike + 'degrees out.');
    }
    ```
- Go back to your terminal and run the `app.js` script
- You should see an object print on the console

    This object contains some information about the `error` that happen but still, we don't have a lot of understandable things to show

- Go back to the `app.js` file
- Delete de console of the `error` and uncomment the other code block
- Add a new condition that checks if the `error` exits

    ```js
    request ({url: url, json: true}, (error, response) => {
        if (error) {}
        const currentWeather = response.body.current;
        console.log (currentWeather.weather_descriptions [0] + '. Its is currently' + currentWeather.temperature + 'degrees out. Its feels like' + currentWeather.feelslike + 'degrees out.');
    }
    ```

- Add the following message if we got an `error`

    ```js
    request ({url: url, json: true}, (error, response) => {
        if (error) {
            console.log ('Unable to connect to weather service!')
        }
        const currentWeather = response.body.current;
        console.log (currentWeather.weather_descriptions [0] + '. Its is currently' + currentWeather.temperature + 'degrees out. Its feels like' + currentWeather.feelslike + 'degrees out.');
    }
    ```

- Add the other code to an `else` statement

    ```js
    request ({url: url, json: true}, (error, response) => {
        if (error) {
            console.log ('Unable to connect to weather service!')
        } else {
            const currentWeather = response.body.current;
            console.log (currentWeather.weather_descriptions [0] + '. Its is currently' + currentWeather.temperature + 'degrees out. Its feels like' + currentWeather.feelslike + 'degrees out.');
        }
    }
    ```

- On your terminal; run the `app.js` script again
- You should see the `error` message that you put on the log
- Turn on your internet connection
- Run the `app.js` script again
- You should see that work correctly
- We got 2 types of `error` for this request; one is from our local machine like the one we see before and the other is for `user` input so instead of having the `error` parameter we actually will have a `response` so we need to handle it. Go to your browser
- Get the complete `weatherstack` URL to get the `JSON` response and use it on the browser
- Remove the value of `query` on the URL
- You will get a `response` but with an `error` message
- Go back to the `app.js` file
- On the `weatherstack` request callback add an `else if` statement that checks if we got an `error` property on the `body`

    ```js
    request({ url: url, json: true }, (error, response) =>  {
        if(error) {
            console.log('Unable to connect to weather service!')
        }  else if(response.body.error) {

        } else {
            const currentWeather = response.body.current;
            console.log(currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out.');
        }
    }
    ```

- On the `else if` block add the following message

    ```js
    request({ url: url, json: true }, (error, response) =>  {
        if(error) {
            console.log('Unable to connect to weather service!')
        }  else if(response.body.error) {
            console.log('Unable to find location');
        } else {
            const currentWeather = response.body.current;
            console.log(currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out.');
        }
    }
    ```

- On the `url` constant break the `url` as you did before on the browser
- On your terminal; run the `app.js` script
- You should see the error message that you just add
- Now we will do the same to the `geocoding` block. Uncomment the `geocoding` block
- Add the following conditions and messages to the `geocoding` request

    ```js
    request({ url: geoCodeUrl, json: true }, (error, response) => {
        if(error) {
            console.log('Unable to connect to location service!');
        } else if(response.body.features.length === 0) {
            console.log('Unable fo find location. Try another search.');
        } else {
            const coordinatesInfo = response.body.features[0].center;
            console.log('The latitude is ' + coordinatesInfo[1] + ' and the longitude is ' + coordinatesInfo[0]);
        }
    });
    ```

    To test the `geocoding error` we need to mess with the URL that we did before changing the text after the `place/` and before of `.json`(In the case of the example `Los%20Angeles`) with some random text. You will see that the `features` array is empty that is why we check if the `features` array have `length`

- Test the `error` cases and if the correct request continue working

### Callback functions

In this section, we will explore a little bit about `callback` functions where we are going to see how they work and how can we use them. This is important because is part of the core of the `nodeJs asynchronous` development.

- On your editor; go to the `playground` directory
- Create a new file call `4-callback.js`
- On this newly created file we will use a `callback` function with an old friend call `setTimeout`(Put a 2 seconds time)

    `setTimeout(() => {}, 2000);`

    The first parameter of the `setTimeout` is the `callback` function and it will run to the after the time we put on the second parameter

- Add a log on the `callback` function

    ```js
    setTimeout(() => {
        console.log('Two seconds are up');
    }, 2000);
    ```

    The `callback` function is a function that provides an argument to another function with the intention that runs it later. In this case, we are using the `callback` pattern in an `asynchronous` way but this is not the rule you can use the `callback` pattern on a `synchronous` functions; for example `array's filter`

- Create a constant call `names` with the following values

    `const names = ['Andrew', 'Jen', 'Jess'];`

- Then create a new variable call `shortNames` that it value will be the `filter` result of the `name` that have less or equal `4` letters

    ```js
    const shortNames = names.filter((name) => {
        return name.length <= 4;
    });
    ```

    The `callback` function is the parameter that we sent to the `filter` function and will run for each item on the `array` of names. In this case, we use the `callback` function on a `synchronous` function. To this moment we use the `callback` functions on functions that we don't define such as `filter` and `setTimeout` but we can define our custom function and still use the `callback` pattern if we need to

- Create a constant that will be called `geocode` with a function as its value. The function we will receive an `address` and a `callback`

    `const geocode = (address, callback) => {}`

    Here we will intend to reproduce the `geocode` functionality but use it in different places that is why we create a new function that will contain the request block and run a function when we have the data

- On the `geocode` function define a `data` constant that will have some example `longitude` and `latitude`

    ```js
    const geocode = (address, callback) => {
        const data = {
            latitude: 0,
            longitude: 0
        };
    }
    ```

    There are 2 ways that we can receive the data from the `geocode` function; one is that we return the value from the function and the other is to provide the `callback` and use the data there. Since we already have the data like we have to this moment the choice will be easy; just return the value

- Return `data` on the `geocode` function

    ```js
    const geocode = (address, callback) => {
        const data = {
            latitude: 0,
            longitude: 0
        };

        return data;
    }
    ```

- Below the `geocode` function create a new `data` constant that it value will be the return value of the `geocode` function sending `Philadelphia` as an argument and log the value

    ```js
    const data = geocode('Philadelphia');
    console.log(data);
    ```

- On your terminal; go to the `playground` directory and run the `4-callback.js` script: `node 4-callback.js`
- You should see the `data` value on the logs. As you see this is a `synchronous` function but later we will need to add the `geocode` request that we already know is `asynchronous` so let use a `setTimeout` to simulate an `asynchronous` code
- Put all the code inside of the `geocode` function and put it inside of a 2 seconds `setTimeout`

    ```js
    const geocode = (address, callback) => {
        setTimeout(() => {
            const data = {
                latitude: 0,
                longitude: 0
            };

            return data;
        }, 2000);
    }
    ```

- Get back to your terminal and run the `4-callback.js` again
- You should see `undefined` instead of the `data` value. The problem here is that we don't return anything on the function because the actual return statement is inside of the `callback` function of the `setTimeout`; the same thing will happen with the `geocode` request. Let's fix this
- Remove the `data` constant below of the `geocode` function(Leave the `geocode` call) and log

    `geocode('Philadelphia');`

- Add a second parameter to the `geocode` call that will be a `callback` function

    `geocode('Philadelphia', () => {});`

- Now eliminate the return statement on the `setTimeout` and call the `callback` function sending the piece of data that we need; in this case `data`

```js
const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        };

        callback(data);
    }, 2000);
}
```

- Get back to the `gecode` call and now that we know the piece of that that we are going to use let's finish the `callback` function

    ```js
    geocode('Philadelphia', (data) => {
        console.log(data);
    });
    ```

- Get back to your terminal and run the `4-callback.js` script
- You should see the `data` value after the 2 seconds

### Callback Abstraction

At this moment we can improve a little bit the code of the `weather-app` using the `callback` pattern where we will have a reusable code and easy to maintain in other words we will have some functions that we can call multiple times and make it easy for us do one thing before another and we will need this to send the `geocode` result to the `weatherstack` API so we can have the `weather` of a specific place. Let's begin the process

- On your editor; go to the `app.js` on the `weather-app` directory
- Now comment all the code of the `app.js` file
- At the bottom of the file add a `geocode` constant that its value is a function

    `const geocode = () => {}`

- Now we will add what we need to trigger the request; in our case the `address` and the `callback` that we want to run after the request finish

    `const geocode = (address, callback) => {}`

- Now below the `geocode` constant; call the function sending the following parameters

    `geocode('Boston', () => {});`

- Then on the callback function we will need to add the parameters that we need. As you can see before we will receive an `error` and the `data` of the `response` and that is what we will add as parameters of the `callback`

    `geocode('Boston', (error, data) => {});`

- At this moment we will need to make sure that the `callback` is called with the correct parameters so copy the `geocode` URL that you use before
- On the `geocode` function add a new constant call `url` and paste the `geocode` URL as its value

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=your_access_key&limit=1';
    }
    ```

- Now remove the `address` part of the URL and use the `address` parameter on it

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=your_access_key&limit=1';
    }
    ```

- Since is a URL we will need to `encode` the value that we receive from the `address` parameter to handle the special characters and for this, we will use the `encodeURIComponent` function

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';
    }
    ```

- Now that we have a dynamic URL we can fire the request. So add the `request` method with its corresponding parameters

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';

        request({ url: url, json: true }, (error, response) => {});
    }
    ```

- Then we need to add the conditions to handle the `errors`

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';

        request({ url: url, json: true }, (error, response) => {
             if(error) {
             } else if(response.body.features.length === 0) {
             } else {
             }
        });
    }
    ```

- To show the message we need to use a reusable function so the user can use the message as it wants; so we will use the `callback` function to send the correct arguments. First for the first condition using the same message as before

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';

        request({ url: url, json: true }, (error, response) => {
             if(error) {
                 callback('Unable to connect to location service!');
             } else if(response.body.features.length === 0) {
             } else {
             }
        });
    }
    ```

    Since is an `error` we actually don't want to send a value for `data` so we don't send any value that will be equal to `undefined`

- Then we add the second message to the second condition as we use before

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';

        request({ url: url, json: true }, (error, response) => {
             if(error) {
                 callback('Unable to connect to location service!');
             } else if(response.body.features.length === 0) {
                 callback('Unable fo find location. Try another search.');
             } else {
             }
        });
    }
    ```

- Get to the `geocode` function call and log the `error` and `data` parameters

    ```js
    geocode('Boston', (error, data) => {
        console.log('Error', error);
        console.log('Data', data);
    });
    ```

- Now we can test the functions. Turn off your internet connection
- Get to your terminal and go to the `weather-app` directory
- Run the `app.js` script using: `node app.js`
- You should see the correct `error` message
- Turn on your internet connection
- Now get to the `app.js` file on the `weather-app` directory
- Change the string of the address to another that you know doesn't exist
- Get back to your terminal and run the `app.js` script
- You should see the correct `error` message
- Now get back to the `app.js` file on your editor and add the correct `address` on the `geocode` function call
- On the `else` clause of the `geocode` function add the following

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';

        request({ url: url, json: true }, (error, response) => {
             if(error) {
                 callback('Unable to connect to location service!');
             } else if(response.body.features.length === 0) {
                 callback('Unable fo find location. Try another search.');
             } else {
                 callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                });
             }
        });
    }
    ```

    Here we send `undefined` to the first parameter because we don't have an `error` then we choose the information that we will send to the user in this case the `longitude`; `latitude` and the `place name`

- Go to your terminal and run the `app.js` script again
- You should see the correct information of the `location`
- Now we will move the code that we just made to its own file. On the `weather` add directory create a new folder call `utils`
- On the newly created directory; create a new file call `geocode.js`
- In the new file; require `request`

    `const request = require('request');`

- Go to the `app.js` file and cut the `geocode` function(Do not remove the function call)
- Get to the `geocode.js` file and paste the function
- Bellow the function export it

    `module.exports = geocode;`

- Get back to the `app.js` file and `require` the `geocode` function

    `const geocode = require('./utils/geocode');`

- Now go to your terminal and run the `app.js` file
- You should see the correct output
- Remember to remove the old `geocode` block that you comment on at the beginning of this section

#### Callback abstraction (weatherstack function)

Now we are going to do the same abstraction that we did with the `geocode` functions. Let's begin with the process.

- On your editor; go to the `app.js` file on the` weather-app` directory
- Comment the `weatherstack` code
- Now on the `weather-app` directory create a new file call` forecast.js`
- On this newly created file; require the `request` module

    `const request = require ('request');`

- Then create a function call `forecast` that receive` latitude`, `longitude`, and` callback` as a parameter

    `const forecast = (latitude, longitude, callback) => {}`

- On the `forecast` function create a constant call` URL` and add the `weatherstack` URL that you use on the` app.js` file

    ```js
    const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number&query=37.8267,-122.4233';
    }
    ```

- Now we will need to add the `latitude` and` longitude` so we can have a dynamic `URL` for our function

    ```js
    const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number' + '& query =' + latitude + ',' + longitude + '& units = f';
    }
    ```

- Then we can use the `request` function sending the` callback` and the correct parameters

    `request ({url: url, json: true}, (error, response) => {});`

- Get the same conditions that are on the `app.js` file relate to the` weatherstack` code and add it to the `request` function

    ```js
    const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number' + '& query =' + latitude + ',' + longitude + '& units = f';

        request ({url: url, json: true}, (error, response) => {
            if (error) {
                callback ('Unable to connect to weather service!');
            } else if (response.body.error) {
                callback ('Unable to find location');
            } else {
                const currentWeather = response.body.current;
                callback (undefined, currentWeather.weather_descriptions [0] + '. Its is currently' + currentWeather.temperature + 'degrees out. Its feels like' + currentWeather.feelslike + 'degrees out.');
            }
        });
    }
    ```

- Export the `forecast` function

    `module.exports = forecast;`

- Go to the `app.js` file and import the` forecast` function

    `const forecast = require ('./ utils / forecast');`

- Add the following example call of the `forecast` function at the end of the file

    ```js
    forecast (44.1545, -75.7088, (error, data) => {
        console.log ('Error', error);
        console.log ('Data', data);
    });
    ```

- Test the different types of errors and if everything goes well as we did with the `geocode` function
- You should have the correct results
- Remove all code comment at the old `weatherstack` code and the` request` require at the top

### Callback chaining

Now we will use the `callback chaining` pattern to combine the 2 functions that operate independently from each other but we actually want to use the result of one of the functions in the other one. Let's begin with the process!!

- On your editor; go to the `app.js` file in the `weather-app` directory
- Take the `forecast` function and put it inside of the `callback` of the `geocode` function

    ```js
    geocode('Boston', (error, data) => {
        console.log('Error', error);
        console.log('Data', data);

        forecast(44.1545, -75.7088, (error, data) => {
            console.log('Error', error);
            console.log('Data', data);
        });
    });
    ```

    Here we will start calling `geocode` that start an `asynchronous I/O` operation and when its done the `event loop` will make sure that the `callback` is a call from there we are going to trigger another `asynchronous I/O` operation then we are going to wait for that `callback` to finish and inside of that last `callback` we will have access to the complete `data` and that is `callback changing`
- We need to make sure that the `data` that `geocode` sends to the `callback` is used by the `forecast` function. So remove the parameters of the `forecast` function and replace it with the `longitude` and `latitude` that is on the `data` object

    ```js
    geocode('Boston', (error, data) => {
        console.log('Error', error);
        console.log('Data', data);

        forecast(data.latitude, data.longitude, (error, data) => {
            console.log('Error', error);
            console.log('Data', data);
        });
    });
    ```

- Now on the terminal; get to the `weather-app` directory and run the `app.js` file
- You should see the `data` from the `geocode` function and the result of the `forecast` of `Boston`
- We need to still handle `errors` in case that `geocode` fails and does not run the `forecast` function. Remove the consoles that are before the `forecast` function and add a condition that checks if we got any `data` on the `error` parameter

    ```js
    geocode('Boston', (error, data) => {
        if(error) {}

        forecast(data.latitude, data.longitude, (error, data) => {
            console.log('Error', error);
            console.log('Data', data);
        });
    });
    ```
- Then we need to make sure that we don't run the `forecast` function so we will add a `return` inside of the `error` condition printing the `error`

    ```js
    geocode('Boston', (error, data) => {
        if(error) {
            return console.log(error);
        }

        forecast(data.latitude, data.longitude, (error, data) => {
            console.log('Error', error);
            console.log('Data', data);
        });
    });
    ```

- Now we need to do the same `error` handling on the `forecast` function

    ```js
    geocode('Boston', (error, data) => {
        if(error) {
            return console.log(error);
        }

        forecast(data.latitude, data.longitude, (error, data) => {
            if(error) {
                return console.log(error);
            }
        });
    });
    ```

- At this moment we need to do the code that will run when the `forecast` doesn't have an `error`. We will print de `name` of the place that we receive from `geocode` and the `forecast` that we get for that place but as you may notice we can't use the result from one function in the other because both of them place it on the `data` variable so we need to replace the name of one of than to do what we want. Change the `data` from the `callback` of the `forecast` function to `forecastData`

    ```js
    geocode('Boston', (error, data) => {
        if(error) {
            return console.log(error);
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return console.log(error);
            }
        });
    });
    ```

- Now print the `location` of the `data` parameter and the `forecastData`

    ```js
    geocode('Boston', (error, data) => {
        if(error) {
            return console.log(error);
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return console.log(error);
            }

            console.log(data.location);
            console.log(forecastData);
        });
    });
    ```

- Go to your terminal and run the `app.js` file
- You should see the `location` name and it `forecast`
- Finally, we will use the command line to change the static `location` that we use as a parameter of the `geocode` function. first, create a constant call `address` that contains one parameter of the `argv` array

    `const address = process.argv[2];`

- Now create a condition to check if the `address` exists

    ```js
    const address = process.argv[2];
    if(address) {}
    ```

- Inside of the condition add the functions

    ```js
    const address = process.argv[2];
    if(address) {
        geocode('Boston', (error, data) => {
            if(error) {...}

            forecast(data.latitude, data.longitude, (error, forecastData) => {...});
        });
    }
    ```

- Add the `address` as a parameter of `geocode`

    ```js
    const address = process.argv[2];
    if(address) {
        geocode(address, (error, data) => {
            if(error) {...}

            forecast(data.latitude, data.longitude, (error, forecastData) => {...});
        });
    }
    ```

- Add an `else` clause that prints a message when the user doesn't provide the `address`

    ```js
    const address = process.argv[2];
    if(address) {
        geocode(address, (error, data) => {
            if(error) {...}

            forecast(data.latitude, data.longitude, (error, forecastData) => {...});
        });
    } else {
        console.log('Please provide a location');
    }
    ```

- Test on the terminal; sending a location like `Boston` or `"New York"`(Need to use quotes when you have space)
- You should see the correct output

### ES6 Aside: Object property shorthand and destructuring

Here we are going to check some features of `es6` that will make us the life easy when we are using objects. Here we will see:

- The object property shorthand syntax: This will allow us to add values on to an object with a shorthand syntax in certain conditions
- Object destructuring:

#### Examples:

- On your editor; go to the `playground` directory
- Create a new file call `5-es6-object.js`
- Inside of this newly created file add 2 constants: `name` and `userAge`(with a `string` for the `name` and a number for `userAge`)

    ```js
    const name = 'test';
    const userAge = 27;
    ```

- Now define an `user` object with an `name` and `age` properties(Use the `name` and `userAge` to define the values of the properties)

    ```js
    const user = {
        name: name,
        age: userAge,
        location: 'Philadelphia'
    };
    ```

- Print the object using `console.log`
- On your terminal go to the `playground` directory and run the `5-es6-object.js` file
- You should see the object with the correct values on it properties
- Now we will use the `object property shorthand syntax`. Add the following changes to the `user` object

    ```js
    const user = {
        name,
        age: userAge,
        location: 'Philadelphia'
    };
    ```

    As you see we change from `name: name` to just `name` and this will have the same effect than before thanks to the `object property shorthand syntax` that came to play when we set a property that it value came from a variable from the same name(The name need to match exatcly)

- Go back to your terminal and run the `5-es6-object.js` file again
- You should see the correct values of the `user` object
- Now remove the `userAge` variable from the `user` object

    ```js
    const user = {
        name,
        age,
        location: 'Philadelphia'
    };
    ```

- Go to your terminal and re run the `5-es6-object.js` file
- You should see an error because we don't have an `age` variable that it can use to define the `age` property
- Now we are going to test the `object destructuring`. Remove the code on the `5-es6-object.js`
- Then create a new object call `product` with the following properties and values

    ```js
    const product = {
        label: 'Red notebook',
        price: 3,
        stock: 201,
        salePrice: undefined
    };
    ```

- If we need to have individual values of the properties of those objects like the following

    ```js
    const label = product.label;
    const stock = product.stock;
    ```

- Print the values of `label` and `stock` using `console.log`
- Go to your terminal and run the `5-es6-object.js` file
- You should see the correct values for the `label` and `stock` variables
- We can do it a different way to get variables of the `product` object property but first eliminate the `label` and `stock` variables
- Now add the following bellow the `product` object

    `const {} = product;`

    We are trying to pull properties of the `product` object and we are going to put it on the brackets
- Inside of the `brackets` add `label` and `stock`

    `const {label, stock} = product;`

    This will create 2 variable call `label` and `stock` variables with the value of the properties with the same name of the `product` object

- Print the `label` and `stock` property
- On your terminal run the `5-es6-object.js` file
- You should see the correct value of the `label` and `stock` properties
- You also can put variable of properties that doesn't exist on the object but it value will be `undefined`. Add a `rating` variable

    `const {label, stock, rating} = product;`

- Print the `rating` value
- On your terminal run the `5-es6-object.js` file
- You should see `undefined` for the `rating`
- We can also rename the variable if we need it. Add the following to change the `label` variable name

    `const {label:productLabel, stock, rating} = product;`

    Now you can use a variable call `productLabel` and have the same value that the `product.label` property
- Sustitude the `label` variable on the console with the `productLabel`
- On your terminal run the `5-es6-object.js` file
- You should see the correct value for the `productLabel` variable
- You can add default values in the case that we define a variable of a property that doesn't exist. Add the following to the `rating` variable

    `const {label:productLabel, stock, rating = 5} = product;`

- On your terminal run the `5-es6-object.js` file
- You should see the default values for the `rating`
- Also you can use destructuring on a function. Now create a function call `transaction` that recive `type` and `product` as it parameters

    `const transaction = (type, product) => {}`

- Add the `transaction` call bellow

    `transaction('order', product);`

- We can us destructuring like we see before but we are going to do it on the `parameters` in this case `product`

    `const transaction = (type, { label, stock }) => {}`

- Now print the variables

    ```js
    const transaction = (type, { label, stock }) => {
        console.log(type, label, stock);
    }
    ```

- On your terminal run the `5-es6-object.js` file

### Using destructuring and property shorthand on the weather-app

- On your editor go to the `app.js` on the `weather-app` directory
- First; we need to update the `data` variable that we receive on the `geocode` callback to use destructuring with the variables that we need

    `geocode(address, (error, { latitude, longitude, location }) => {...});`

- The previews update will not be enough because we can have an `error` return by the `geocode` request in other words the `callback` will be called with the `error` property and will try to destructure an `undefined` object that will break the app for this we will need to provide a default value for those variables

    `geocode(address, (error, { latitude, longitude, location } = {}}) => {...});`

- Now we can use the new variables on the `geocode` and `forecast` functions

    ```js
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {...}

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log(error)
            }

            console.log(location);
            console.log(forecastData);
        });
    });
    ```

- On your editor; go to the `geocode.js` file on the `weather-app` directory
- Since we have a `url` constant that we use on the `request` function; we can the `shorthand` syntax on the configuration object of `request`

    `request({ url, json: true }, (error, response) => {...}`

- Now we are using the `body` property on all the code of the `callback` function so we can use destructuring on the `response` object

    `request({ url, json: true }, (error, { body }) => {...}`

- Then we need to replace the `response` object and use `body`

    ```js
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location service!');
        } else if(body.features.length === 0) {
            callback('Unable fo find location. Try another search.');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
    ```

- On your editor; go to the `forecast.js` file
- This file is very similar to the `geocode` function so we will do the same as we see here

    ```js
    request({ url, json: true }, (error, { body }) =>  {
        if(error) {
            callback('Unable to connect to weather service!');
        } else if(body.error) {
            callback('Unable to find location');
        } else {
            const currentWeather = body.current;
            callback(undefined, currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out.');
        }
    });
    ```

- Finally on your terminal run the `app.js` file and test the `weather-app` application
- You should see the same output without any issue

### HTTP requests without a library

Like it mentioned before when we start to use the `request` library; we will check how to perform a request without an `npm` module. We see in this section that we can do the task that we need; like take commands from the terminal; without a library but the libraries make what you need easier to do. Let's get to it!!!

- On your editor; go to the `playground` directory and create a new file call `6-raw-http.js`
- Now get to the browser and get to the [node.js](https://nodejs.org/en/) page
- Click on the `docs` option at the top
- On the sidebar choose your `node` version(In the case of the example is the `16`)
- Scroll down until you see `HTTP` and `HTTPS`. As you see here we got 2 libraries for each protocol that you are using and where you'll see an advantage to use an `npm` module because it will make it easy to switch between protocols without using a separate library and behind the scenes
- Click on the [HTTP](https://nodejs.org/dist/latest-v16.x/docs/api/http.html) module. As you can see we can use this module to create a `server`(We gonna address this in a later section) and to do requests
- Scroll down until you see the `http.request` function and that is what we are going to use to make the `request`. If you see the `HTTPS` module will see the same type of function but for that protocol. Since the `weatherstack` API use the `HTTP` protocol on it the free version that is the protocol that we are going to use
- On your editor; go to the `6-raw-http.js` file
- Since `HTTP` module is from `node`; you can `require` without installing anything because is already there. On the first line `require` it

    `const http = require('http');`

- Then; go to the `forecast.js` file and copy the entire `url` constant
- Paste the `url` constant after the `HTTP` require

    ```js
    const http = require('http');
    const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number' + '& query =' + latitude + ',' + longitude + '& units = f'; 
    ```

- Since we don't have the `latitude` and `longitude`; remove those variables and replace them with a `40,-75`

    ```js
    const http = require('http');
    const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number' + '& query =40,-75& units = f'; 
    ```

- Now use the `request` function of the `HTTP` module sending `URL` and a `callback` that have a `response` parameter

    ```js
    http.request(url, (response) => {});
    ```

     On the `request` callback we don't have access to the complete `request` body instead we can catch the individual `chunks` that comes throw because the `HTTP` data could be `stream` on multiple parts so we will need to listen to the individual `chunks` to come in and we need to listen when all `chunk` has arrived that means the request is done

- Since we are using a `node` core module we will need to work something on a very low level so on the `callback` so add the following

    ```js
    http.request(url, (response) => {
        response.on();
    });
    ```

    The `on` is a function that allows us to `register` a handle for an `event`

- To register a handle we need to specify the `event` then add the `callback` that will trigger when the `event` happens. In this case, we will listen to the `data` event

    ```js
    http.request(url, (response) => {
        response.on('data', (chunk) => {});
    });
    ```

    The `callback` will be trigger when new `data` comes in and we access this `data` via the first argument of the `callback` commonly call `chunk` that will be a part of the complete response depending on how the `server` is setup

- The other thing that we need to do is know when the `response` finish and we will do this listening to the `end` event and as the `data` event will trigger a `callback`

    ```js
    http.request(url, (response) => {
        response.on('data', (chunk) => {});

        response.on('end', () => {});
    });
    ```

- As mentioned before the `data` event can be trigger multiple or one time so we will need to store it in a place to concatenate the different `chunks` of `data` or use it when only have a single `chunk` to create a `let` variable call `data` that have an empty `string` as it a default value

    ```js
    http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {});

        response.on('end', () => {});
    });
    ```

- Now on the `data` handler `console.log` the `chunk`

    ```js
    http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            console.log(chunk)
        });

        response.on('end', () => {});
    });
    ```

- On your terminal; go to the `playground` directory and run the `6-raw-http.js` file
- You will see that the program doesn't finish. This is because we to complete the `request`
- Get back to the `6-raw-http.js` file
- We need the value of the actual request so create a constant call `request` that its value will be the return value of the `http.request` function

    ```js
    const request = http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            console.log(chunk)
        });

        response.on('end', () => {});
    });
    ```

- Bellow of the `request` definition call the `end` function

    ```js
    const request = http.request(url, (response) => {...});

    request.end();
    ```

- Now get to the terminal and run the `6-raw-http.js` file
- You will see that multiple `chunks` of `data` are print on the terminal and all of them are `buffers`
- Get back to the `6-raw-http.js` on your editor
- We will need to store each `chunk` on the `data` variable and turn every `chunk buffer` into a `string`

    ```js
    const request = http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {});
    });

    request.end();
    ```

    Now we have the complete `body` of the `response` on the `data` variable

- Now we can access the `response` on the `end` handler. So print the `data` variable

    ```js
    const request = http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            console.log(data);
        });
    });

    request.end();
    ```

- Get back to your terminal and run the `6-raw-http.js` file
- You will see a large `string` print on the terminal
- Get back to the `6-raw-http.js` on your editor
- Now we will need to turn into a `json` data that we actually can use so on the `end` handle create a constant call `body` that its value will be the `JSON.parse` of `data` and print the result

    ```js
    const request = http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            console.log(body);
        });
    });

    request.end();
    ```

- Get back to your terminal and run the `6-raw-http.js` file
- You will see the actual object that you can pull values from
- We still need to handle the errors so get back to the `6-raw-http.js` file on your editor
- Bellow of the `request` definition create a new listener for the event `error` and print the result

    ```js
    const request = http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            console.log(body);
        });
    });

    request.on('error', (error) => {
        console.log('An error', error);
    });

    request.end();
    ```
- Now produce an `error` like turn off your wi-fi
- Get back to your terminal and run the `6-raw-http.js` file
- You should see an `error` object print

You may ask yourself; why does `node` make these `core` modules easier to use? The reason is that the `node core` modules are supposed to provide this low-level implementation and `node` comes bundled with `npm` because you are suppose to use these modules to build your application.

## Section 5: Web Servers(Weather App)

At this moment all the applications that we created are only accessible via the command line and that is not realistic for the common users it will be much better if the user types an `URL` on the browser to interact with our application. In this section we will see the `express` module that makes it extremely easy to create `web servers` with `node` and these `servers` will allow us to `serve` all the `assets` of our application(`html`, `css` and `js`) so we can set some features for user interactions also we will able to `serve` some `JSON` data that will allow us to get the `location` from the user; get the `forecast` then send the `forecast` back to the browser to render on the screen.

### Hello express!

In this section you will run your first `node.js` base `server`; this will give the user a new way to interact with your application because they won't need to interact with the terminal instead they will use the browser. With a `node server`, we can serve what our application needs like the `assets` will need to load; like the `HTML` documents, `css` files to style the page; client-side `js` or some images; or we can take the other approach that is to serve up an `HTTP JSON` based API similar to the `mapbox` or the `weatherstack` API that we exchange `JSON` data back and forward with the `server`. We are going to begin serving the `asset` that the browser needs.

The tool that we are going to use to create the `server` is one of the originals `npm` package call [express](http://expressjs.com/) that will help us to do easily a web `server` that functions as a `backend` of our applications.

Let's begin to create our first `server`!!!!

- On your editor; go to the root of the project and create a new directory call `web-server`
- In your terminal; go to this newly created directory
- Initialize the `package.json` using: `npm init -y`
- Now install `express` using: `npm install express`
- Go back to your editor and create a new folder call `src` on the `web-server` directory. As you see here we are going to begin to be more organized to we will have a new directory where we are going to put the files instead of put everything of the root directory to scale the application a little better as the application grows
- Inside of the newly created directory; create a new file call `app.js`. This file will be the starting point of the application
- On the `app.js` file; we will need to load the `express` function so create a constant call `express` and `require` the package

    `const express = require('express');`

    The `express` library exposes a single function and that is what we call to create a new `express` application

- Bellow the `require`; create a new constant call `app` that its value will be the returning object of the `express` function

    `const app = express();`

    The `express` function doesn't take any arguments instead we configure the `server` using the various methods provided on the `app` object itself

Now we need to tell what the `server` needs to do. Imagine that we have these `URLs`: 
- `app.com` 
- `app.com/help`
- `app.com/about`

Here we have a single domain that will be run on the `express server` with multiple `routes` in this case: '', '/help' and '/about'. We just need to set the `server` to set a `response` when it reaches one of the `routes` using one of the `apps` methods in this case `get`. The `get` method will help users to configure what the `server` will do when someone wants to get the resource of a specific `url`; like `html` or `JSON`.

- Bellow the `app` definition; call the `get` method

    `app.get();`

- The `get` method receives 2 arguments; the first one is the `route` or partial `URL` and the second is a `callback` that will run when the user reaches that `route`(In this case the `route` will be an empty `string` because we are trying to configure `app.com`)

    `app.get('', () => {});`

- The `callback` receive 2 parameters: `request`(Normally know as `req`) and `response`(Normally know as `res`)

    `app.get('', (req, res) => {});`

    - `req`: Object that has information of the incoming `request` to the `server`
    - `res`: Object that contains a lot of methods that will allow us to customize what we send back to the requester

- Now we will send a text message that will display on the browser

    ```js
    app.get('', (req, res) => {
        res.send('Hello express!!');
    });
    ```

    The `send` method will allow us to `send` something back to the requester. If the user is using something like the `request` or `Axios` library this text message is what it will get back or if they are using a browser this text message is what will be displayed on the window

- We will need to run our `server` and to do this we need to use the `listen` method(Bellow the `get` method):

    `app.listen();`

    The `listen` method will be using a single time on the application and this will start the `server` and listen on a specific `port`

- The `listen` method will receive 2 arguments: the `port` that the `server` will listen to and a `callback` function that will run when the `server` starts. We will use the `port` 3000 and put a message on the `callback` function

    ```js
    app.listen(3000, () => {
        console.log('Server is up on port 3000.'); 
    });
    ```

    The `port` 3000 is a common developer `port` and this is not a `port` that we use on real sites later we will see how to handle this for production sites. We put the message on the `callback` to let know the user that the `server` is running on the terminal

- On your terminal; go to the `web-server` directory
- Run the `app.js` script using: `node src/app.js`
- You should see immediately the message that we set on the `listen` method and will stay on that message because the `server` is running
- Get to your browser and go to `http://localhost:3000/`(This `URL` will only be accessible locally on your machine)
- You will see the `Hello express!!` message on the screen
- Let's do the `help` browser. Get back to the `src/app.js` file on the `web-server` directory
- Bellow the first `get` method that you define; add another one for the `/help` route with a message that represents the `help` page

    ```js
    app.get('/help', (req, res) => {
        res.send('Help page');
    });
    ```

- Go back to your terminal; we will need to restart the `server` for the changes to take effect so stop the `server` and restart it again(If you install `nodemon` use it and you will not need to restart the `server` every time you update something on the `server`)
- Get back to your browser and refresh the page
- Go to the `/help`: `http://localhost:3000/help`
- You should see the `help` page message
- Now if you go to a `route` that doesn't exist it will give you an `error` because we just set 2 `routes`(Late we will set a `404 route` for this kind of page)
- Get back to the `app.js` file on your editor and add `weather` and `about` routes

    ```js
    app.get('/about', (req, res) => {
        res.send('About page');
    });

    app.get('/weather', (req, res) => {
        res.send('Weather page');
    });
    ```

- Restart your `server` if you are not using `nodemon`
- Test the new `routes` on your browser and you should see the correct messages for each page

### Serving up HTML and JSON

At this moment we set our `express server` and `routes` and return a text message for each `route` but on a real application, we will return `HTML` design to render on the browser or `JSON` design to be consumed by an application. To do this we will need another functionality of the `send` function.

- On your editor; go to the `app.js` file on the `web-server/src` directory
- Update the first `route` like this:

    ```js
    app.get('', (req, res) => {
        res.send('<h1>Weather</h1>');
    });
    ```

    If we send valid `HTML` tags with the message; where `express` is going to detect that and send the `response` correctly

- Next, we can send `JSON`; on the `help route` update the value of the `send` function like this:

    ```js
    app.get('/help', (req, res) => {
        res.send({
            name: 'Test',
            age: 27
        });
    });
    ```

    If we send an object to the `send` function `express` will detect this; `stringify` de object and send a `JSON response` correctly

- On your terminal; get to the `weather-app` directory
- Run the `app.js` file: `nodemon src/app.js`
- On your browser; go to `http://localhost:3000/`
- You should see the `weather` message on the page(Use your browser inspector to see that it also is on an `h1` tag)
- Go to the `help` page and you should see the `JSON` on the page
- We can also send an `array` of objects to the `send` function that will send a `JSON response`

    ```js
    app.get('/help', (req, res) => {
        res.send([{
            name: 'Test',
            age: 27
        }, {
            name: 'Testing',
            age: 28
        }]);
    });
    ```

- Go to the `help` page and refresh the page
- You should see both objects on the `JSON`
- Now we will need to update the `about route` sending an `h1` tag with a message

    ```js
    app.get('/about', (req, res) => {
        res.send('<h1>About page</h1>');
    });
    ```

- Then change the `weather route` to return a `JSON` with 2 properties: `forecast` and `location`

    ```js
    app.get('/weather', (req, res) => {
        res.send({
            forecast: 'Is always sun in Philadelphia',
            location: 'Philadelphia'
        });
    });
    ```

- Refresh the page on your browser
- Go to the `about` page
- You should see the message that you put on the `about route`
- Go to the `weather` page
- You should see the object that you send on the `weather route`
