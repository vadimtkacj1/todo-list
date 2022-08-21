class Task {
  static priorityColor = {
    low: "green",
    medium: "orange",
    hight: "red",
  };
  
  constructor(title, priority, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.nameProject = null;
    this.checked = false;
  }

  static createTask(task) {
    const checkDueData = task.dueDate ? task.dueDate : "No date";
    const colorPriority = Task.priorityColor[task.priority];
    const checkedCheck = task.checked ? "checked" : "";
    const checkProjectName = task.nameProject ? '(' + task.nameProject + ')' : "";
    const template = `<div class="list-tasks_task ${checkedCheck}" style="border-left: 3px solid ${colorPriority};">
    <label class="list-tasks_checkbox">
      <input type="checkbox" name="checkboxTask" class="list-tasks_task__checkboxTask" ${checkedCheck} />
      <span class="list-tasks_task__title">${task.title} ${checkProjectName}</span>
    </label>
    <div class="list-tasks_task__dueDate">${checkDueData}</div>
    <span class="material-symbols-outlined list-tasks_task__info list-tasks_task__button">info</span>
    <span class="material-symbols-outlined list-tasks_task__edit list-tasks_task__button">edit</span>
    <span class="wrapper-list-tasks_task__close list-tasks_task__button">
      <span class="material-symbols-outlined list-tasks_task__close">close</span>
    </span>
  </div>`;

    return template;
  }
}

export default Task;
