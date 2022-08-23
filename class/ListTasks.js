import Task from "./Task.js";

class ListTasks {
  #listOfTasksElement;
  #tasks;
  #listProjects;

  constructor(listOfTasksElement, tasks, listProjects) {
    this.#listOfTasksElement = listOfTasksElement;
    this.#tasks = tasks;
    this.#listProjects = listProjects;
  }

  fillListByTasks() {
    this.#tasks.forEach((task) => {
      task.__proto__ = Task.prototype;
      const template = task.createTask(task);

      this.#listOfTasksElement.insertAdjacentHTML("beforeend", template);
    });
  }

  deleteTask(indexSelectTask) {
    const selectTask = this.#tasks[indexSelectTask];

    const hasNameProjectInTask = selectTask.nameProject;
    if (hasNameProjectInTask) {
      const projectParent = this.#listProjects.findProjectInListProject(hasNameProjectInTask);
      const tasksParentProject = projectParent.tasks;

      tasksParentProject.splice(indexSelectTask, 1);
    }

    this.#tasks.splice(indexSelectTask, 1);
  }
}

export default ListTasks;
