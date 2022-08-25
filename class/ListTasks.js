import Task from "./Task.js";
import List from "./List.js";

class ListTasks extends List {
  #listProjects;

  constructor(listElement, dataAboutList, listProjects) {
    super(listElement, dataAboutList);
    this.#listProjects = listProjects;
  }

  addTaskInListTasks(task) {
    this.dataAboutList.push(task);
  }

  fillListByDataAboutList() {
    this.dataAboutList.forEach((task) => {
      task.__proto__ = Task.prototype;
      const template = task.createElement(task);

      this.listElement.insertAdjacentHTML("beforeend", template);
    });
  }

  deleteElementWithList(indexSelectTask) {
    const selectTask = this.dataAboutList[indexSelectTask];

    const hasNameProjectInTask = selectTask.nameProject;
    if (hasNameProjectInTask) {
      const projectParent = this.#listProjects.findProjectInListProject(hasNameProjectInTask);
      const dataAboutListParentProject = projectParent.tasks;

      dataAboutListParentProject.splice(indexSelectTask, 1);
    }

    this.dataAboutList.splice(indexSelectTask, 1);
  }
}

export default ListTasks;
