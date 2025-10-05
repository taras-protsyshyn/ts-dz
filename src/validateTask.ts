import { z } from "zod";

import { taskSchema } from "./dto/Tasks.js";
import type { Task } from "./dto/Tasks.js";

export function validateTasks(tasks: unknown): Task[] {
  const result = z.array(taskSchema).safeParse(tasks);

  if (!result.success) {
    console.error("Validation errors:", result.error);
    throw new Error("Invalid task data");
  }

  return result.data;
}
