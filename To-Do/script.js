const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('priority');
const categorySelect = document.getElementById('category');
const addTaskbtn = document.getElementById('addTask');

function addTask() {
    const title = taskInput.value.trim();
    const priority = prioritySelect.value.trim();
    const category = categorySelect.value.trim();


    if (title === "") {
        alert('please enter task');
    }

    if (priority === "") {
        alert("please enter a priority")
    }

    if (category === "") {
        alert("please enter a category");
    }


    const task = {
        id: tasks.length + 1,
        name: taskInput,
        priority: priority,
        category: category
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

addTaskbtn.addEventListener('click', addTask);

function displayTasks() {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";

    const tusker = document.createElement('li');
    tusker.textContent = `
    Task id: ${tasks.id},
    Task name:${tasks.name},
    Task priority:${tasks.priority},
    Task Category:${tasks.category}
    `
    taskContainer.appendChild(tusker);
}

displayTasks();

console.log(tasks.length);


const totalTasks = document.getElementById('totalTasks');
totalTasks.textContent = `${tasks.length}`;
