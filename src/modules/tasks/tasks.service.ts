import type { TTask, TNewTask, TUpdateTask, Filters } from "../task/task.types.js";
import { Status, Priority } from "../task/task.constants.js";
import { isSameDay } from "../../utils.js";

export class TaskService {
  private tasks: TTask[] = [];
  constructor(initialTasks: TTask[] = []) {
    this.tasks = initialTasks;
  }

  getAllTasks(): TTask[] {
    return this.tasks;
  }

  getTaskById(id: number | string): TTask | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  addTask(task: TNewTask): TTask {
    const newTask: TTask = {
      id: (this.tasks.length + 1).toString(),
      title: task.title,
      type: task.type,
      description: task.description,
      createdAt: new Date(),
      deadline: task.deadline,
      status: task.status ?? Status.Todo,
      priority: task.priority ?? Priority.Low,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number | string, updatedFields: TUpdateTask): TTask[] {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index]!, ...updatedFields };
    }

    return this.tasks;
  }

  deleteTask(id: number | string) {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  filterBuyStatus(status: Status): TTask[] {
    return this.tasks.filter((task) => task.status === status);
  }

  filterByPriority(priority: Priority): TTask[] {
    return this.tasks.filter((task) => task.priority === priority);
  }

  filterByCreationDate(date: Date): TTask[] {
    return this.tasks.filter((task) => isSameDay(task.createdAt, date));
  }

  filterTasks(filters: Filters): TTask[] {
    return this.tasks
      .filter((task) => (filters?.status ? task.status === filters.status : true))
      .filter((task) => (filters?.priority ? task.priority === filters.priority : true))
      .filter((task) => (filters?.createdAt ? isSameDay(task.createdAt, filters.createdAt) : true));
  }

  isDoneToDeadline(id: number | string): boolean | undefined {
    const task = this.getTaskById(id);

    if (task) {
      return task.status === Status.Done && task.deadline >= new Date();
    }
  }
}
