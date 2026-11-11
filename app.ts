
import {
    type Task,
    type TaskStatus,
    addTask,
    completeTask,
    filterByStatus,
    deleteTask
} from "./model.js";

// 1. Get HTML elements with proper TypeScript types
const titleInput = document.getElementById("title") as HTMLInputElement;
const addButton = document.getElementById("add-btn") as HTMLButtonElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const taskCount = document.getElementById("task-count") as HTMLSpanElement;

const filterButtons =
    document.querySelectorAll<HTMLButtonElement>(".filter-btn");

// 2. Store tasks
let tasks: Task[] = [];

// 3. Store the currently selected filter
let currentFilter: "all" | TaskStatus = "all";

// 4. Render tasks on the page
function renderTasks(): void {
    taskList.innerHTML = "";

    const visibleTasks = currentFilter === "all"
        ? tasks
        : filterByStatus(tasks, currentFilter);

    taskCount.textContent = `${visibleTasks.length} tasks`;

    if (visibleTasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent =
            "No tasks here. Add one to get started!";

        taskList.appendChild(emptyMessage);
        return;
    }

    visibleTasks.forEach((task: Task) => {
        const listItem = document.createElement("li");
        listItem.className = "task-item";

        // Task information
        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const taskTitle = document.createElement("p");
        taskTitle.className = "task-title";
        taskTitle.textContent = task.title;

        const statusBadge = document.createElement("span");
        statusBadge.className = `task-status status-${task.status}`;
        statusBadge.textContent = task.status;

        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(statusBadge);

        // Action buttons
        const actions = document.createElement("div");
        actions.className = "task-actions";

        // Advance task button
        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";

        if (task.status === "todo") {
            completeButton.textContent = "Start";
        } else if (task.status === "in-progress") {
            completeButton.textContent = "Complete";
        } else {
            completeButton.textContent = "Completed";
        }

        completeButton.disabled = task.status === "done";

        completeButton.addEventListener("click", () => {
            tasks = completeTask(tasks, task.id);
            renderTasks();
        });

        // Delete task button
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            tasks = deleteTask(tasks, task.id);
            renderTasks();
        });

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        listItem.appendChild(taskInfo);
        listItem.appendChild(actions);

        taskList.appendChild(listItem);
    });
}

// 5. Add a task
function handleAddTask(): void {
    const title = titleInput.value.trim();

    if (title === "") {
        titleInput.focus();
        return;
    }

    tasks = addTask(tasks, title);
    titleInput.value = "";

    // Return to All so the newly added task is visible
    currentFilter = "all";

    filterButtons.forEach((button: HTMLButtonElement) => {
        button.classList.toggle("active", button.dataset.filter === "all");
    });

    renderTasks();
    titleInput.focus();
}

// Add button event
addButton.addEventListener("click", handleAddTask);

// Allow Enter key to add a task
titleInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        handleAddTask();
    }
});

// 6. Filter tasks
filterButtons.forEach((button: HTMLButtonElement) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        if (
            selectedFilter === "all" ||
            selectedFilter === "todo" ||
            selectedFilter === "in-progress" ||
            selectedFilter === "done"
        ) {
            currentFilter = selectedFilter;

            filterButtons.forEach((filterButton: HTMLButtonElement) => {
                filterButton.classList.remove("active");
            });

            button.classList.add("active");

            renderTasks();
        }
    });
});

// 7. Display initial page
renderTasks();
