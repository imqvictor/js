const students = [];

let nameInput = document.getElementById('name');
let ageInput = document.getElementById('age');
let marksInput = document.getElementById('mks');


function addStudent(id, name, age, marks) {
    const sName = nameInput.value;
    const sAge = ageInput.value;
    const sMarks = marksInput.value.split(",").map(mark => Number(mark));

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


console.log(students.length);
