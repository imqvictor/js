const students = JSON.parse(localStorage.getItem("students") || []);


let nameInput = document.getElementById('name');
let ageInput = document.getElementById('age');
let marksInput = document.getElementById('mks');
const f4m = document.getElementById('fm1');
const nameLable = document.getElementById('nlble');
const ageLable = document.getElementById('alble');
const markLable = document.getElementById('mlble');


function addStudent(id, name, age, marks) {
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
        id: students.length + 1,
        name: sName,
        age: sAge,
        marks: rawMarks
    };
    students.push(newStudent);

    localStorage.setItem("students", JSON.stringify(students));
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
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    students.forEach(student => {
        const studentItem = document.createElement('li');
        studentItem.textContent = `Name: ${student.name}, Age: ${student.age}, ID: ${student.id},
        Marks:${student.marks}`;
        studentList.appendChild(studentItem);
    });
}


function getAverage(marks) {

    if (marks.length === 0) {
        return 0;
    }

    const total = marks.reduce((sum, mark) => {
        return sum + mark;
    }, 0);

    return total / marks.length;
}

function studentsAverage() {
    const pel = document.getElementById('pele');

    students.forEach(student => {
        const average = getAverage(student.marks);
        const p = document.createElement('p');

        p.innerHTML = `${student.name} -Average:${average}`

        pel.appendChild(p);
    });

}

function removeStudent() {
    students.forEach(student => {

    })
}