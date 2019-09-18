const fs = require("fs");
const chalk = require("chalk");
console.log("util.js");


const getNotes = () => {
    const notesList = loadNotes();
    console.log("Your Notes", notesList);
    notesList.forEach(element => {
        console.log(element.title);
    });
}

const addNotes = (title, body) => {
    const notesList = loadNotes();
    const checkDuplicates = notesList.filter((note) => note.title === title);
    if (checkDuplicates.length == 0) {
        let note = {
            title: title,
            body: body
        }
        notesList.push(note);
        saveNotes(notesList);
    } else {
        console.log(`title ${title} already exists`);
    }

}

const removeNotes = (title) => {
    try {
        const notesList = loadNotes();
        let titleIndex = notesList.findIndex(item => item.title == title);
        if (titleIndex >= 0) {
            notesList.splice(titleIndex, 1);
            saveNotes(notesList);
            console.log(`title ${title} is deleted`);
        } else {
            console.log(`title ${title} is not present`);
        }
    } catch (error) {
        console.log(error);
    }
}

const readNote = (title) => {
    try {
        const notesList = loadNotes();

        //filter loops over whole array where find terminates if the first matched object is found
        let note = notesList.find(note => note.title == title)
        if (note)
            console.log(chalk.green(note.title));
        else
            console.log(chalk.red(`${title} not present`));
    } catch (error) {
        console.log(error);
    }
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("./notes.json")
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (error) {
        return [];
    }
}

const saveNotes = (notesList) => {
    try {
        fs.writeFileSync('notes.json', JSON.stringify(notesList))
    } catch (error) {
        console.log(error);
    }
}

//exporting multiple functions
module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    readNote: readNote
};