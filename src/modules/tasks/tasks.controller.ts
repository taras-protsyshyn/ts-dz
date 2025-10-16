import { TaskService } from "./tasks.service.js";
import type { TAnyTask, TUpdateTask, TNewTask, Filters } from "../task/task.types.js";

const tasksFromSomewhere = [] as TAnyTask[]; // Replace with actual task data source

class TaskController {
  private taskService: TaskService;

  constructor(tasksJSON: unknown) {
    this.taskService = new TaskService(tasksFromSomewhere);
  }

  getAllTasks(): TAnyTask[] {
    return this.taskService.getAllTasks();
  }

  getTaskById(id: number | string): TAnyTask | undefined {
    return this.taskService.getTaskById(id);
  }

  addTask(task: TNewTask): TAnyTask {
    return this.taskService.addTask(task);
  }

  updateTask(id: number | string, updatedFields: TUpdateTask): TAnyTask[] {
    return this.taskService.updateTask(id, updatedFields);
  }

  deleteTask(id: number | string) {
    this.taskService.deleteTask(id);
  }

  filterByStatus(status: string): TAnyTask[] {
    return this.taskService.filterBuyStatus(status as any);
  }

  filterByPriority(priority: string): TAnyTask[] {
    return this.taskService.filterByPriority(priority as any);
  }

  filterByCreationDate(date: Date): TAnyTask[] {
    return this.taskService.filterByCreationDate(date);
  }

  filterTasks(filters: Filters): TAnyTask[] {
    return this.taskService.filterTasks(filters);
  }

  checkIsDoneToDeadline(id: number | string): boolean | undefined {
    return this.taskService.isDoneToDeadline(id);
  }
}
