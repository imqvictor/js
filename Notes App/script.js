
const notes = JSON.parse(localStorage.getItem('note')) || [];

const noteContainer = document.querySelector('.noteContainer');
const addNoteBtn = document.getElementById('addNoteBtn');
const displayDiv = document.querySelector('.displayDiv');

addNoteBtn.addEventListener('click', () => {

    displayDiv.hidden = true;
    noteContainer.hidden = false;
    createNotes();
});

function createNotes() {
    noteContainer.innerHTML = "";

    const noteDiv = document.createElement('div');
    noteDiv.id = 'noteDiv';
    const textArea = document.createElement('textarea');
    const delBtn = document.createElement('button');
    delBtn.textContent = "DELETE";
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'SAVE';

    noteDiv.appendChild(textArea);
    noteDiv.appendChild(document.createElement('br'));
    noteDiv.appendChild(saveBtn);

    noteDiv.appendChild(delBtn);
    delBtn.addEventListener('click', () => {
        noteDiv.remove();
    })

    noteContainer.appendChild(noteDiv);

    saveBtn.addEventListener('click', () => saveNote(textArea.value));

}

function saveNote(note) {
    const noted = note;
    const text = {
        id: Date.now(),
        note: noted,
        date: new Date().toLocaleDateString(),
    };
    notes.push(text);
    localStorage.setItem('note', JSON.stringify(notes));

    console.log(notes.length);
    console.log(notes[0].note);
    console.log(notes[0].date);

    displayDiv.hidden = false;
    noteContainer.hidden = true;
    displayNotes();
}

function displayNotes() {
    displayDiv.innerHTML = "";

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.dataset.id = note.id;

        noteElement.innerHTML = `
            <p>${note.date}</p>
            <p class="noteText" contenteditable="true">${note.note}</p>
            `

        const noteText = noteElement.querySelector('.noteText');

        noteText.addEventListener('blur', () => {
            const editedNote = noteElement.querySelector('.noteText').textContent;
            upDateNote(note.id, editedNote);
        });

        const deleteNoteBtn = document.createElement('button');
        deleteNoteBtn.textContent = "DELETE";
        deleteNoteBtn.addEventListener('click', () => deleteNote(note.id));

        noteElement.appendChild(deleteNoteBtn);
        displayDiv.appendChild(noteElement);
    });
}

displayNotes();

function upDateNote(id, newText) {
    const note = notes.find(note => note.id === id);

    if (note) {
        note.note = newText;
        localStorage.setItem('note', JSON.stringify(notes));
    }
}

function deleteNote(id) {
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);

        localStorage.setItem('note', JSON.stringify(notes));
        displayNotes();
    }
    console.log(notes.length);
}