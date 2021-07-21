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
