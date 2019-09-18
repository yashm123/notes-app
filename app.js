const chalk = require('chalk');  //npm package to color the console
const yarg = require('yargs');  //npm package to parse command line agrv
const notesUtility = require('./notes.js');

//add note
yarg.command({
    command: "add",
    describe: "This is a add command",
    builder: {
        title: {
            describe: "this is note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "this is note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notesUtility.addNotes(argv.title, argv.body)
    }
})

//remove note
yarg.command({
    command: "remove",
    describe: "This is a remove command",
    builder: {
        title: {
            describe: "this is note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notesUtility.removeNotes(argv.title);
    }
})

//read note
yarg.command({
    command: "read",
    describe: "This is a read command",
    builder: {
        title: {
            describe: "this is note title",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        notesUtility.readNote(argv.title);
    }
})

//list notes
yarg.command({
    command: "list",
    describe: "this is a list command",
    handler: () => {
        notesUtility.getNotes();
    }
})

yarg.parse();  //to enable yarg parsing