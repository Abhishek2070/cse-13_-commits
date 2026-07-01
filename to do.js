// ===========================
// Select Elements
// ===========================

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";

// ===========================
// Load Tasks
// ===========================

window.onload = () => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }

    renderTasks();
};

// ===========================
// Save Tasks
// ===========================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===========================
// Add Task
// ===========================

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

// ===========================
// Render Tasks
// ===========================

function renderTasks() {

    taskList.innerHTML = "";

    let filtered = tasks;

    if (currentFilter === "pending") {
        filtered = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filtered = tasks.filter(task => task.completed);
    }

    filtered.forEach(task => {

        const li = document.createElement("li");

        li.className = task.completed ? "task completed" : "task";

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})">

                <span>${task.text}</span>
            </div>

            <div class="actions">

                <button class="edit-btn"
                    onclick="editTask(${task.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

    updateCounter();
}

// ===========================
// Toggle Complete
// ===========================

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    saveTasks();
    renderTasks();
}

// ===========================
// Delete Task
// ===========================

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();

}

// ===========================
// Edit Task
// ===========================

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    const updated = prompt("Edit Task", task.text);

    if (updated === null) return;

    if (updated.trim() === "") return;

    task.text = updated.trim();

    saveTasks();

    renderTasks();

}

// ===========================
// Clear Completed
// ===========================

clearCompleted.addEventListener("click", () => {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    renderTasks();

});

// ===========================
// Counter
// ===========================

function updateCounter() {

    const remaining = tasks.filter(task => !task.completed).length;

    taskCount.textContent =
        `${remaining} Task${remaining !== 1 ? "s" : ""} Remaining`;

}

// ===========================
// Filters
// ===========================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});