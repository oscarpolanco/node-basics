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

## What is Node.js?

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

These 2 methods are not part of the `js` language itself because they actually implemented by the `chrome` runtime when `chrome` run the `js` file that uses either of those some `C++` code gets executed behind the scenes which are responsible for taking care of that functionality in other words `chrome` will tail `v8` what to do when it finds these methods. The exact same thing happened with `node`.

### Practice example

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
