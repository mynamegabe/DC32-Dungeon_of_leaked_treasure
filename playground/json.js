const fs = require('fs');

var originalNote = {
    title : 'some titile',
    body : 'some body'
};

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('scrolls.json',originalNoteString);

var noteString = fs.readFileSync('scrolls.json');
var note = JSON.parse(noteString);
console.log(typeof note);   
console.log(note.title);