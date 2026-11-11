
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}

export function addTask(tasks: Task[], title: string): Task[] {
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

export function completeTask(tasks: Task[], id: number): Task[] {
    return tasks.map(task => {
        if (task.id !== id) {
            return task;
        }

        let nextStatus: TaskStatus = task.status;

        if (task.status === "todo") {
            nextStatus = "in-progress";
        } else if (task.status === "in-progress") {
            nextStatus = "done";
        }

        return {
            ...task,
            status: nextStatus
        };
    });
}

export function filterByStatus(
    tasks: Task[],
    status: TaskStatus
): Task[] {
    return tasks.filter(task => task.status === status);
}

export function deleteTask(tasks: Task[], id: number): Task[] {
    return tasks.filter(task => task.id !== id);
}
