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

