import Task from "./Task.js";
import List from "./List.js";
import parametersTasksTemplate from "./listTasks/template/listTasks.js";

class ListTasks extends List {
  static DIGITAL_PRIORITIES = {
    LOW: 1,
    MEDIUM: 2,
    HIGHT: 3,
  };

  get indexSelectedTask() {
    return this.#indexSelectedTask;
  }

  get parametersTasks() {
    return this.#parametersTasks;
  }

  set parametersTasks(value) {
    this.#parametersTasks = value;
  }

  get changedList() {
    return this.#changedList;
  }

  set indexSelectedTask(task) {
    this.#indexSelectedTask = Number(task.dataset.index);
  }

  get selectedTask() {
    return this.#changedList[this.#indexSelectedTask];
  }

  #indexSelectedTask = -1;
  #hasProjectButtonAddTask;
  #parametersTasks;
  #changedList;

  constructor(listElement, hasProjectButtonAddTask = true, dataAboutList = []) {
    super(listElement, dataAboutList);
    this.#hasProjectButtonAddTask = hasProjectButtonAddTask;
    this.#changedList = this.dataAboutList;
    this.#parametersTasks = null;
  }

  addTaskInList(task) {
    if (this.dataAboutList != this.#changedList) {
      this.#changedList.push(task);
    }

    this.dataAboutList.push(task);
  }

  fillListByDataAboutList() {
    this.listElement.textContent = "";

    if (!this.#parametersTasks) {
      this.#changedList = this.dataAboutList;
    }

    this.#changedList.forEach((task, index) => {
      task.__proto__ = Task.prototype;
      const template = task.createElement(index, this.#hasProjectButtonAddTask);

      this.listElement.insertAdjacentHTML("beforeend", template);
    });
  }

  indexTaskFind(task) {
    for (let i = 0; i < this.dataAboutList.length; i++) {
      if (this.dataAboutList[i].title != task.title) continue;

      if (this.dataAboutList[i].dueDate != task.dueDate) continue;

      if (this.dataAboutList[i].description != task.description) continue;

      if (this.dataAboutList[i].priority != task.priority) continue;

      return i;
    }

    return -1;
  }

  sortByImportance() {
    this.#parametersTasks = {
      text: ["Sort", "importance"],
      callback: this.sortByImportance.bind(this),
    };

    const tasks = [...this.dataAboutList];

    for (let i = 0; i < tasks.length - 1; i++) {
      for (let j = 0; j < tasks.length - 1; j++) {
        const task = tasks[j];
        const nextTask = tasks[j + 1];
        const digitalPriorityTask = ListTasks.DIGITAL_PRIORITIES[task.priority.toLocaleUpperCase()];
        const digitalPriorityNextTask = ListTasks.DIGITAL_PRIORITIES[nextTask.priority.toLocaleUpperCase()];

        if (digitalPriorityTask < digitalPriorityNextTask) {
          [tasks[j + 1], tasks[j]] = [tasks[j], tasks[j + 1]];
        }
      }
    }

    this.#changedList = tasks;

    this.fillListByDataAboutList();
    this.#addElementParametersTasks();
  }

  sortByDate() {
    this.#parametersTasks = {
      text: ["Sort", "date"],
      callback: this.sortByDate.bind(this),
    };

    const tasks = [...this.dataAboutList];

    for (let i = 0; i < tasks.length - 1; i++) {
      for (let j = 0; j < tasks.length - 1; j++) {
        let task = tasks[j];
        let nextTask = tasks[j + 1];
        const taskDueDateValue = task.dueDate;
        const nextTaskDueDateValue = nextTask.dueDate;

        if (taskDueDateValue < nextTaskDueDateValue) {
          [tasks[j + 1], tasks[j]] = [tasks[j], tasks[j + 1]];
        }
      }
    }

    this.#changedList = tasks;

    this.fillListByDataAboutList();
    this.#addElementParametersTasks();
  }

  #searchForHighestPriority(tasks) {
    return tasks.reduce((maxPriorityTask, task) => {
      const taskPriority = task.priority;
      const priorityTaskUpper = taskPriority.toLocaleUpperCase();
      const maxPriorityTaskUpper = maxPriorityTask.toLocaleUpperCase();
      const digitalMaxPriorityTask = ListTasks.DIGITAL_PRIORITIES[maxPriorityTaskUpper];
      const digitalPriorityTask = ListTasks.DIGITAL_PRIORITIES[priorityTaskUpper];

      if (digitalPriorityTask > digitalMaxPriorityTask) {
        maxPriorityTask = taskPriority;
      }

      return maxPriorityTask;
    }, "low");
  }

  #addElementParametersTasks() {
    const buttonModifications = document.querySelector(".parameters-tasks");
    buttonModifications.innerHTML = parametersTasksTemplate(this.#parametersTasks.text);
  }

  filterByImportance() {
    this.#parametersTasks = {
      text: ["Filter", "importance"],
      callback: this.filterByImportance.bind(this),
    };

    this.listElement.textContent = "";

    const tasks = this.dataAboutList;
    const priorityForTask = this.#searchForHighestPriority(tasks);

    this.#changedList = [];

    let index = 0;

    Array.from(tasks).forEach((task) => {
      if (task.priority != priorityForTask) return;

      this.#changedList.push(task);

      const template = task.createElement(index, this.#hasProjectButtonAddTask);
      this.listElement.insertAdjacentHTML("beforeend", template);
      index++;
    });

    this.#addElementParametersTasks();
  }

  filterByDate() {
    this.#parametersTasks = {
      text: ["Filter", "date"],
      callback: this.filterByDate.bind(this),
    };

    this.listElement.textContent = "";

    const tasks = this.dataAboutList;

    this.#changedList = [];

    let index = 0;

    Array.from(tasks).forEach((task) => {
      const taskDueDateValue = task.dueDate;

      if (!taskDueDateValue) return;

      this.#changedList.push(task);

      const template = task.createElement(index, this.#hasProjectButtonAddTask);
      this.listElement.insertAdjacentHTML("beforeend", template);
      index++;
    });

    this.#addElementParametersTasks();
  }

  deleteElementWithList() {
    if (this.#changedList != this.dataAboutList) {
      const index = this.dataAboutList.indexOf(this.#changedList[this.#indexSelectedTask]);
      this.dataAboutList.splice(index, 1);
      this.#changedList.splice(this.#indexSelectedTask, 1);
    } else {
      this.dataAboutList.splice(this.#indexSelectedTask, 1);
    }

    const listTask = Array.from(this.listElement.children);
    listTask[this.#indexSelectedTask].remove();
    this.fillListByDataAboutList();
  }
}

export default ListTasks;
