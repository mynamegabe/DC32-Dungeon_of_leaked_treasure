// Imports
const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');
const readline = require('readline');

// Import from local file
const notes = require('./notes');

// Configure yargs
const titleOptions = {
    describe: 'Title of Note',
    demandOption: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demandOption: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'command> '
});

// Function to execute commands
const executeCommand = (input) => {
    const [command, ...args] = input.trim().split(' ');
    const parsedArgs = yargs.parse(args);

    if (command === 'exit') {
        console.log('Exiting...');
        rl.close();
        return;
    }

    if (command === 'add') {
        const note = notes.addNote(parsedArgs.title, parsedArgs.body);
        if (note) {
            console.log('Note created');
            notes.logNote(note);
        } else {
            console.log('Note title taken');
        }
    } else if (command === 'list') {
        const allNotes = notes.getAll();
        console.log(`Printing ${allNotes.length} note(s).`);
        allNotes.forEach((note) => notes.logNote(note));
    } else if (command === 'read') {
        const note = notes.getNote(parsedArgs.title);
        if (note) {
            console.log('Note found');
            notes.logNote(note);
        } else {
            console.log('Note not found');
        }
    } else if (command === 'remove') {
        const noteRemoved = notes.removeNote(parsedArgs.title);
        const message = noteRemoved ? 'Note was removed' : 'No such note found';
        console.log(message);
    } else {
        console.log('Command not found');
    }
};

// Initial prompt
rl.prompt();

// Handle line input
rl.on('line', (input) => {
    executeCommand(input);
    rl.prompt();
});

// Handle close event
rl.on('close', () => {
    console.log('CLI closed');
    process.exit(0);
});
