# Section 4: Debugging node.js(Notes App)

Is a good moment to explore how to debug an application using the `notes app` that we already build so here we will get the tools that we need to explore `errors` and fix them.

## Debugging using node.js

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

## Error messages

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
