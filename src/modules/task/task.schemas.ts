import { z } from "zod";

import { Status, Priority, TaskType, Severity } from "./task.constants.js";

const commonTaskProps = {
  id: z.union([z.number(), z.string()]),
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().optional(),
  createdAt: z.coerce.date(),
  deadline: z.coerce.date(),
  status: z.enum(Status).default(Status.Todo).optional(),
  priority: z.enum(Priority).default(Priority.Low).optional(),
};

export const epicSchema = z.object({
  ...commonTaskProps,
  type: TaskType.Epic,
  targetVersion: z.string(),
  stories: z.array(z.union([z.number(), z.string()])).optional(),
});

export const storySchema = z.object({
  ...commonTaskProps,
  type: TaskType.Story,
  acceptanceCriteria: z.array(z.string()).optional(),
  assignedTo: z.string().optional(),
  epicId: z.union([z.number(), z.string()]),
  storyPoints: z.number().min(0).optional(),
  tasksIds: z.array(z.union([z.number(), z.string()])).optional(),
  bugIds: z.array(z.union([z.number(), z.string()])).optional(),
});

export const taskSchema = z.object({
  ...commonTaskProps,
  type: TaskType.Task,
  assignedTo: z.string().optional(),
  storyId: z.union([z.number(), z.string()]).optional(),
  subtaskIds: z.array(z.union([z.number(), z.string()])).optional(),
});

export const bugSchema = z.object({
  ...commonTaskProps,
  type: TaskType.Bug,
  assignedTo: z.string().optional(),
  storyId: z.union([z.number(), z.string()]).optional(),
  severity: z.enum(Severity).default(Severity.Low).optional(),
});

export const subtaskSchema = z.object({
  ...commonTaskProps,
  type: TaskType.Subtask,
  assignedTo: z.string().optional(),
  parentId: z.union([z.number(), z.string()]),
});
