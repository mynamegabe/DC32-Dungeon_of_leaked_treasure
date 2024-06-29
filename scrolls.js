const fs = require('fs');//import

var fetchNotes = () => {
    try{ //use try and catch to get error and deal according to it. 
        var notesString = fs.readFileSync('scrolls-data.json');//to read the value from JSON file.
        return JSON.parse(notesString);
       }catch(e){
           return [];
       }
};

var saveNotes = (notes) => {
    fs.writeFileSync('scrolls-data.json', JSON.stringify(notes));
    /*to add new file if the file is not present
   and pass the data along with in string format*/
};

//made a function and added an empty array
var addNote = (title, body) => {
 var notes = fetchNotes();
 var note = {//passes the values for a single note.
     title,
     body
 };


//to match the title of single note in notes array for less redundancy.
var duplicateNotes = notes.filter((note) => note.title === title);

if(duplicateNotes.length === 0){
     notes.push(note);
    saveNotes(notes);
    return note; 
}
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
   var notes = fetchNotes();
   var readFilteredNotes = notes.filter((note) => note.title === title);
   return readFilteredNotes[0];
}

var removeNote = (title) => {
   var notes = fetchNotes();
   var filteredNotes = notes.filter((note) => note.title !== title);
   saveNotes(filteredNotes);
};

var logNote = (note) => {
    debugger;
    console.log('----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};