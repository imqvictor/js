
const notes = JSON.parse(localStorage.getItem('note')) || [];

const noteContainer = document.querySelector('.noteContainer');
const addNoteBtn = document.getElementById('addNoteBtn');

addNoteBtn.addEventListener('click', createNotes);

function createNotes() {

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

    noteContainer.hidden = true;

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

    noteContainer.hidden = false;

}

function displayNotes() {
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.setAttribute('contenteditable', 'true');
        noteElement.innerHTML = `
            <p>${note.date}</p>
            <p>${note.note}</p>
            `

        noteContainer.appendChild(noteElement);
    });
}

displayNotes();