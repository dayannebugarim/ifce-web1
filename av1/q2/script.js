const input = document.querySelector("input[type=text]");
const tasksContainer = document.querySelector(".tasks-container");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-button");

if(!document.querySelector(".task-container")) {
    clearButton.disabled = true;
}

function isValidInput(str) {
    return str.replace(/\s/g, '').length ? true : false;
}

function createTask() {
    if(!isValidInput(input.value)) return;

    const taskContainer = document.createElement("div");
    const taskContent = document.createElement("div");
    const taskCheckbox = document.createElement("input");

    taskCheckbox.type = "checkbox";
    taskContent.innerText = input.value;

    taskContainer.classList.add("task-container");
    taskContent.classList.add("task-content");
    taskCheckbox.classList.add("task-checkbox");

    taskContainer.appendChild(taskCheckbox);
    taskContainer.appendChild(taskContent);
    tasksContainer.appendChild(taskContainer);

    taskCheckbox.onclick = function() {
        completeTask(taskCheckbox.checked, taskContent);
    };

    input.value = '';
    clearButton.disabled = false;
}

function completeTask(checked, taskContent) {
    if(checked) {
        taskContent.style.textDecoration = "line-through";
        taskContent.style.color = "gray";
    } else {
        taskContent.style.textDecoration = "none";
        taskContent.style.color = "black";
    }
}

function clearAllTasks() {
    const allTasks = document.querySelectorAll(".task-container");
    allTasks.forEach(task => task.remove());
    clearButton.disabled = true;
}