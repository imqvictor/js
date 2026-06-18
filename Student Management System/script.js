const students = [];

let nameInput = document.getElementById('name');
let ageInput = document.getElementById('age');
let marksInput = document.getElementById('mks');
const f4m = document.getElementById('fm1');
const nameLable = document.getElementById('nlble');
const ageLable = document.getElementById('alble');
const markLable = document.getElementById('mlble');

function addStudent(id, name, age, marks) {
    let sName = nameInput.value.trim();
    const sAge = ageInput.value.trim();
    let sMarks = marksInput.value.split(",").map(mark => Number(mark));
    sMarks = marksInput.value.trim();

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

    if (sName === "") {
        txtnError.textContent = "Name must be filled out";
        txtnError.style.color = red;
        return false;
    }

    if (sAge === "") {
        txtaError.textContent = "age is required";
        return false;
    }

    if (sMarks === "") {
        txtmError.textContent = "students marks required";
        txtmError.style.color = red;
        return false;
    }

    const newStudent = {
        id: students.length + 1,
        name: sName,
        age: sAge,
        marks: sMarks
    };
    students.push(newStudent);

}



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
