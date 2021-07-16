const yargs = require('yargs');
const notes = require('./notes');

// Customize yargs version
yargs.version('1.1.0');

// Challenge: Setup command option and function
//
// 1. Setup the remove command to take a require "--title" option
// 2. Create and export a removeNote function form note.js
// 3. Call removeNote in the remove command handler
// 4. Have removeNote log the title of the note to be remove
// 5. Test your work using: node app.js remove --title="Some title"

// Challenge: Wire up removeNote
// 1. Load existing notes
// 2. Use array filter method to remove the matching note (if any)
// 3. Save the newly created array
// 4. Test your work with a title that exists and a title that it doesn't exist

// Challenge: Use chalk to provide useful logs for the remove
// 1. If note is removed, print "Note removed!" with a green background
// 2. If no note is removed, print "No note found!" with red background

// Create add command
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
        notes.addNote(argv.title, argv.body);
    }
});

// Create remove command
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

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function() {
        console.log('Listing out all notes')
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function() {
        console.log('Reading a note')
    }
});

yargs.parse();
