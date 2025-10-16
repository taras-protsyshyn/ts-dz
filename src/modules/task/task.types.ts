import { z } from "zod";

import { Status, Priority } from "./task.constants.js";
import { taskSchema, epicSchema, storySchema, subtaskSchema, bugSchema } from "./task.schemas.js";

export type Filters = { status?: Status; priority?: Priority; createdAt?: Date };

export type TEpic = z.infer<typeof epicSchema>;
export type TStory = z.infer<typeof storySchema>;
export type TBug = z.infer<typeof bugSchema>;
export type TTask = z.infer<typeof taskSchema>;
export type TSubtask = z.infer<typeof subtaskSchema>;

export type TNewTask = Omit<TTask, "id" | "createdAt">;
export type TUpdateTask = Partial<TNewTask>;

export type TAnyTask = TEpic | TStory | TBug | TTask | TSubtask;

export abstract class AbstractTask<T extends TAnyTask> {
  protected task: T;

  constructor(protected data: T) {
    this.task = data;
  }

  getTaskInfo(): string {
    return `${this.task.title} ${this.task.description || ""}`;
  }

  isDoneToDeadline(): boolean {
    return this.task.status === Status.Done && this.task.deadline >= new Date();
  }
}
