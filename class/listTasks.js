import Task from "./Task.js";

class listTasks {
  constructor(listElements, tasks) {
    this.listElements = listElements;
    this.tasks = tasks;
  }

  fillListByTasks() {
    this.tasks.forEach((task) => {
      const template = Task.createTask(task);

      this.listElements.insertAdjacentHTML("beforeend", template);
    });
  }

  static deleteTask(listProjects, selectTask) {
    const tasksSelectProject = listProjects.selectProject.tasks;
    const tasks = Array.from(document.querySelectorAll(".list-tasks_task"));
    const indexSelectTask = tasks.indexOf(selectTask);
    const hasNameProjectInTask = tasksSelectProject[indexSelectTask].nameProject
    if (hasNameProjectInTask) {
      const projectParent = listProjects.findProjectInListProject(hasNameProjectInTask);
      const tasksParentProject = projectParent.tasks;

      tasksParentProject.splice(indexSelectTask, 1);
    }

    tasksSelectProject.splice(indexSelectTask, 1);
    selectTask.remove();
  }
}

export default listTasks;
