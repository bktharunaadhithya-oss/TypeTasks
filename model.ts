
// 1. Define allowed task statuses
type TaskStatus = "todo" | "in-progress" | "done";

// 2. Define Task interface
interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}

// 3. Add a new task
function addTask(tasks: Task[], title: string): Task[] {
    const newId = tasks.length > 0
        ? Math.max(...tasks.map(task => task.id)) + 1
        : 1;

    const newTask: Task = {
        id: newId,
        title: title,
        status: "todo"
    };

    return [...tasks, newTask];
}

// 4. Complete a task
function completeTask(tasks: Task[], id: number): Task[] {
    return tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                status: "done"
            };
        }

        return task;
    });
}

// 5. Filter tasks by status
function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
    return tasks.filter(task => task.status === status);
}

// 6. Delete a task using its ID
function deleteTask(tasks: Task[], id: number): Task[] {
    return tasks.filter(task => task.id !== id);
}

// 7. Sample tasks for testing
const tasks: Task[] = [
    { id: 1, title: "Learn HTML", status: "todo" },
    { id: 2, title: "Learn CSS", status: "in-progress" },
    { id: 3, title: "Learn JavaScript", status: "todo" }
];

// 8. Test addTask()
const updatedTasks = addTask(tasks, "Learn TypeScript");
console.log("After adding:", updatedTasks);

// 9. Test completeTask()
const completedTasks = completeTask(updatedTasks, 2);
console.log("After completing:", completedTasks);

// 10. Test filterByStatus()
const doneTasks = filterByStatus(completedTasks, "done");
console.log("Completed tasks:", doneTasks);

// 11. Test deleteTask()
const remainingTasks = deleteTask(completedTasks, 1);
console.log("After deleting:", remainingTasks);
