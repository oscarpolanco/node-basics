# Section 3: File system and command line Args(Notes App)

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
