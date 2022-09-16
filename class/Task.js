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
    this.checked = false;
  }

  createElement() {
    const priorityInToUpperCase = this.priority.toUpperCase();
    const checkDueData = this.dueDate ? this.dueDate : "No date";
    const colorPriority = Task.PRIORITY_COLOR[priorityInToUpperCase];
    const checkedCheck = this.checked ? "checked" : "";
    const strNameProjectWithBraskets = "(" + this.nameProject + ")";
    const checkProjectName = this.nameProject ? strNameProjectWithBraskets : "";
    const template = `<div class="list-tasks_task ${checkedCheck}" style="border-left: 3px solid ${colorPriority};">
    <label class="list-tasks_checkbox">
      <input type="checkbox" name="checkboxTask" class="list-tasks_task__checkboxTask" ${checkedCheck} />
      <span class="list-tasks_task__title">${this.title} ${checkProjectName}</span>
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
