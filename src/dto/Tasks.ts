import { z } from "zod";

export enum Status {
  Todo = "todo",
  InProgress = "in_progress",
  Done = "done",
}

export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export type Filters = { status?: Status; priority?: Priority; createdAt?: Date };

export const taskSchema = z.object({
  id: z.union([z.number(), z.string()]),
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().optional(),
  createdAt: z.coerce.date(),
  deadline: z.coerce.date(),
  status: z.enum(Status).default(Status.Todo).optional(),
  priority: z.enum(Priority).default(Priority.Low).optional(),
});

export type Task = z.infer<typeof taskSchema>;
export type NewTask = Omit<Task, "id" | "createdAt">;
export type UpdateTask = Partial<NewTask>;
