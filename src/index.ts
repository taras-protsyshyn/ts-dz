import type { Task, NewTask, UpdateTask } from "./dto/Tasks.js";
import { Status, Priority } from "./dto/Tasks.js";
import tasksJSON from "./tasks.json" with { type: "json" };
import { validateTasks } from "./validateTask.js";
import { isSameDay } from "./utils.js";

const tasks = validateTasks(tasksJSON);


const getTaskById = (id: number | string) => {
  return tasks.find((task) => task.id === id);
}

// отримання завдання з id "1"
console.log(getTaskById("1"));

const addTask = (task:  NewTask):Task[] =>  {
  const newTask: Task = {
    id: (tasks.length + 1).toString(),
    title: task.title,
    description: task.description,
    createdAt: new Date(),
    deadline: task.deadline,
    status: task.status ?? Status.Todo,
    priority: task.priority ?? Priority.Low,   
  } 

  tasks.push(newTask);

  return tasks;
}

// додавання кількох нових завданнь
addTask({
  title: "Нове важливе завдання",
  deadline: new Date("2023-12-31"),
  priority: Priority.High,
  status: Status.InProgress,
})
addTask({
  title: "Ще одне нове важливе завдання",
  deadline: new Date("2023-12-31"),
  priority: Priority.High,
  status: Status.InProgress,
})
addTask({
  title: "Нове завдання",
  deadline: new Date("2023-12-31"),
})
console.log(tasks[tasks.length - 1]);


const updateTask = (id: number | string, updatedFields: UpdateTask): Task[] => {  
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index]!, ...updatedFields };
  }

  return tasks;
}

// оновлення останнього завдання
updateTask((tasks.length).toString(), { description: "важливі зміни", status: Status.Done, priority: Priority.High });
console.log(tasks[tasks.length - 1]);
  
  
const deleteTask = (id: number | string) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

// видалення останнього завдання
deleteTask(tasks.length.toString());
console.log(tasks[tasks.length - 1]);

const filterBuyStatus = (status: Status): Task[] => {
  return tasks.filter((task) => task.status === status);
}

// всі завдання з статусом todo
console.log(filterBuyStatus(Status.Todo));

const filterByPriority = (priority: Priority): Task[] => {
  return tasks.filter((task) => task.priority === priority);
}

// всі завдання з пріоритетом high
console.log(filterByPriority(Priority.High));

// повертає всі завдання що були створені в певний день
const filterByCreationDate = (date: Date): Task[] => {
  return tasks.filter((task) => isSameDay(task.createdAt, date));
}

// всі завдання створені сьогодні
console.log(filterByCreationDate(new Date()));


const filterTasks =  (filters: {status?: Status, priority?: Priority, createdAt?: Date}):Task[] => 
   tasks.filter(task => filters?.status ? task.status === filters.status : true)
                      .filter(task => filters?.priority ? task.priority === filters.priority : true)
                      .filter(task => filters?.createdAt ? isSameDay(task.createdAt, filters.createdAt) : true)

  


// всі завдання створені сьогодні
console.log("всі завдання створені сьогодні, з статусом in_progres, і високим пріорітетом", filterTasks({status: Status.InProgress, priority: Priority.High, createdAt: new Date()}));


const isDoneToDeadline = (id: number | string): boolean | undefined => {
  const task = getTaskById(id);
  
  if (task) {
    return task.status === Status.Done && task.deadline >= new Date();
  }
}

// чи виконане завдання з id "1" до дедлайну
console.log(isDoneToDeadline("1"));

