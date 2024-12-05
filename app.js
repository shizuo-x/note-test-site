let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const dueDate = dueDateInput.value || new Date().toISOString().split('T')[0]; // Default to today's date if not set
    let status = "not started";

    tasks.push({ text: taskText, date: dueDate, status: status });
    renderTasks();
    taskInput.value = "";
    dueDateInput.value = "";
}

function renderTasks() {
    const taskContainer = document.getElementById('tasks');
    taskContainer.innerHTML = "";

    tasks.sort((a, b) => {
        if (a.status === "completed") return 1;
        if (b.status === "completed") return -1;
        if (a.status === "in progress") return -1;
        if (b.status === "in progress") return 1;
        return 0;
    });

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = "task";
        taskDiv.innerHTML = `
            <div class="text">${task.text}</div>
            <div class="status">
                <span class="date">Due: ${task.date}</span>
                <div class="spacer"></div>
                <span class="dot" style="background-color: ${getStatusColor(task.status)}"></span>
                ${task.status}
                <button onclick="updateStatus(${index})">Toggle Status</button>
                <input type="checkbox" onchange="markCompleted(${index})">
            </div>
        `;
        taskContainer.appendChild(taskDiv);
    });
}

function getStatusColor(status) {
    if (status === "in progress") return "yellow";
    if (status === "completed") return "green";
    return "gray";
}

function updateStatus(index) {
    tasks[index].status = tasks[index].status === "not started" ? "in progress" : "not started";
    renderTasks();
}

function markCompleted(index) {
    tasks[index].status = "completed";
    renderTasks();
}

renderTasks(); // Initial rendering of tasks
