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
        return false;
    }

    if (priority === "") {
        alert("please enter a priority")
        return false;
    }

    if (category === "") {
        alert("please enter a category");
        return false;
    }


    const task = {
        id: tasks.length + 1,
        name: title,
        priority: priority,
        category: category,
        completed: false
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

addTaskbtn.addEventListener('click', addTask);

function displayTasks(tasksToDisplay = tasks) {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";

    tasksToDisplay.forEach((task) => {
        const tusker = document.createElement('li');
        tusker.textContent = `
           ${task.id}: ${task.name}
`
        const delet = document.createElement('button');
        delet.textContent = 'Delete';
        delet.addEventListener('click', () => deleteTask(task.id));

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskStatus(task.id));

        taskContainer.appendChild(tusker);
        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(delet);

    });
}
displayTasks();

function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}


const totalTasks = document.getElementById('totalTasks');
totalTasks.textContent = `${tasks.length}`;


const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', searchTasks);

function searchTasks() {
    const searchText = searchInput.value.trim().toLowerCase();

    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchText));
    displayTasks(filteredTasks);
}


const filter = document.getElementById('filter');
filter.addEventListener('change', filterTasks);

function filterTasks() {
    const filterValue = filter.value.toLowerCase();

    let filteredTasks;
    if (filterValue === "all") {
        filteredTasks = tasks;
    } else if (filterValue === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filterValue === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    displayTasks(filteredTasks);
}


function toggleTaskStatus(id) {
    const task = tasks.find(task => task.id === id);

    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

const completedTasks = document.getElementById('completeTasks');
completedTasks.textContent = `${tasks.filter(task => task.completed).length}`;
const pendingTasks = document.getElementById('pendingTasks');
pendingTasks.textContent = `${tasks.filter(task => !task.completed).length}`;
