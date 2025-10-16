import {
  AbstractTask,
  type TSubtask,
  type TTask,
  type TBug,
  type TStory,
  type TEpic,
} from "./task.types.js";

import { taskSchema, bugSchema, subtaskSchema, epicSchema, storySchema } from "./task.schemas.js";
import { TaskType } from "./task.constants.js";

export class Bug extends AbstractTask<TBug> {}

export class Task extends AbstractTask<TTask> {}

export class Epic extends AbstractTask<TEpic> {}

export class Story extends AbstractTask<TStory> {}

export class Subtask extends AbstractTask<TSubtask> {}

// Type guard functions
export function isAnyTask(task: unknown): task is { type: TaskType } {
  return taskSchema.safeParse(task).success;
}

export class TaskFactory {
  static createTask(task: unknown): AbstractTask<TTask | TEpic | TStory | TBug | TSubtask> {
    const anyTask = isAnyTask(task) ? (task as { type: TaskType }) : null;

    switch (anyTask?.type) {
      case TaskType.Task:
        const parsedTask = taskSchema.parse(task);
        return new Task(parsedTask);
      case TaskType.Epic:
        const parsedEpic = epicSchema.parse(task);
        return new Epic(parsedEpic);
      case TaskType.Story:
        const parsedStory = storySchema.parse(task);
        return new Story(parsedStory);
      case TaskType.Bug:
        const parsedBug = bugSchema.parse(task);
        return new Bug(parsedBug);
      case TaskType.Subtask:
        const parsed = subtaskSchema.parse(task);
        return new Subtask(parsed);
      default:
        throw new Error(`Unknown task type: ${task}`);
    }
  }
}
