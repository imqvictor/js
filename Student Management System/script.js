const students = JSON.parse(localStorage.getItem("students")) || [];



let nameInput = document.getElementById('name');
let ageInput = document.getElementById('age');
let marksInput = document.getElementById('mks');
const f4m = document.getElementById('fm1');
const nameLable = document.getElementById('nlble');
const ageLable = document.getElementById('alble');
const markLable = document.getElementById('mlble');
const addStudentBtn = document.getElementById('addStudentBtn');
addStudentBtn.addEventListener('click', addStudent);

let studentId = null;

function addStudent() {
    let sName = nameInput.value.trim();
    if (sName === "") {
        txtnError.textContent = "Name must be filled out";
        return false;
    }

    const sAge = ageInput.value.trim();
    if (sAge === "") {
        txtaError.textContent = "age is required";
        return false;
    }

    let sMarks = marksInput.value.trim();
    if (sMarks === "") {
        txtmError.textContent = "students marks required";
        return false;
    }

    const rawMarks = sMarks.split(",").map(mark => Number(mark.trim()));
    if (rawMarks.some(Number.isNaN)) {
        txtmError.textContent = "Please enter only numbers separated by commas.";
        return false;
    }


    const newStudent = {
        id: Date.now(),
        name: sName,
        age: sAge,
        marks: rawMarks
    };

    if (studentId === null) {
        students.push(newStudent);
    } else if (studentId !== null) {
        const student = students.find(student => student.id === studentId);
        if (student) {
            student.name = sName;
            student.age = sAge;
            student.marks = rawMarks;

        }

        studentId = null;

        addStudentBtn.textContent = "Add Student";
    }

    localStorage.setItem("students", JSON.stringify(students));
    nameInput.value = "";
    ageInput.value = "";
    marksInput.value = "";

    displayStudents();
}



let nError = document.createElement('p');
let txtnError = document.createTextNode('');
nError.appendChild(txtnError);
f4m.insertBefore(nError, ageLable);

let aError = document.createElement('p');
let txtaError = document.createTextNode('');
aError.appendChild(txtaError);
f4m.insertBefore(aError, markLable);

let mError = document.createElement('p');
let txtmError = document.createTextNode('');
mError.appendChild(txtmError);
f4m.appendChild(mError);


function displayStudents() {
    const display = document.getElementById('display');
    display.innerHTML = '';

    students.forEach((student, index) => {
        const average = getAverage(student.marks);
        const row = document.createElement('tr');
        row.innerHTML = `
           <td>${index + 1}</td>
           <td>${student.name}</td>
           <td>${student.age}</td>
           <td>${student.marks}</td>
           <td>${average}</td>
        `
        const editBtn = document.createElement('button');
        editBtn.textContent = "EDIT";
        editBtn.id = "editBtn";
        editBtn.addEventListener('click', () => editStudent(student.id));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "DELETE";
        deleteButton.id = 'deleteButton';
        deleteButton.addEventListener('click', () => deleteStudent(student.id));

        const buttonCell = document.createElement('span');
        buttonCell.id = "buttonSpan";
        buttonCell.appendChild(editBtn);
        buttonCell.appendChild(deleteButton);


        row.appendChild(buttonCell);
        display.appendChild(row);

    });
}

displayStudents();

function getAverage(marks) {

    if (marks.length === 0) {
        return 0;
    }

    const total = marks.reduce((sum, mark) => {
        return sum + mark;
    }, 0);

    return total / marks.length;
}


function deleteStudent(id) {
    const index = students.findIndex(student => student.id === id);
    if (index !== -1) {
        students.splice(index, 1);

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();

    }
}


function editStudent(id) {
    const student = students.find(student => student.id === id);

    if (!student) return;

    nameInput.value = student.name;
    ageInput.value = student.age;
    marksInput.value = student.marks;

    studentId = student.id;
    addStudentBtn.textContent = "Update Student";
}



