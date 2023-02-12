import { task } from "./task/templates/task.js";

class Task {
  static PRIORITY_COLOR = {
    LOW: "green",
    MEDIUM: "orange",
    HIGHT: "red",
  };

  constructor(title, priority, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.nameProject = null;
    this.isCompleted = false;
  }

  createElement(index, hasProjectButtonAddTask) {
    const params = {
      isCompleted: this.isCompleted,
      priority: this.priority,
      title: this.title,
      projectName: this.nameProject,
      dueDate: this.dueDate,
      description: this.description,
      hasProjectButtonAddTask,
      index,
    };
    const taskTemplate = task(params);

    return taskTemplate;
  }
}

export default Task;
