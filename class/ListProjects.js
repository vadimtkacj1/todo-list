import ListTasks from "./ListTasks.js";
import Project from "./Project.js";
import List from "./List.js";

class ListProjects extends List {
  get selectProject() {
    return this.dataAboutList[this.#indexSelectProject];
  }

  get nameProjects() {
    return this.dataAboutList.map((project) => project.name);
  }

  #indexSelectProject = 0;

  constructor(listElement, dataAboutList) {
    super(listElement, dataAboutList);
    this.fillListByProjects();
    this.fillProjectPreview();
    this.addTasksInStaticProjectAndUpdateDataAndAddCountTasks();
  }

  #updataOfDataOfProjectsInLocalStorage() {
    const dataAboutListJson = JSON.stringify(this.dataAboutList);
    this.#updataInLocalStorage("list-projects", dataAboutListJson);
  }

  addTaskInSelectProject(task) {
    this.selectProject.listOfTasks.addTaskInListTasks(task);
    // this.selectProject.tasks.push(task);

    this.#updataOfDataOfProjectsInLocalStorage();
  }

  #addCountTasksInProject() {
    const buttonsNav = document.querySelectorAll(".button-nav");

    this.dataAboutList.forEach((project, indexProject) => {
      const tasks = project.tasks;
      const checkedTask = tasks.filter((task) => !task.checked);
      const lengthCheckedTasks = checkedTask.length;
      const getAmountProject = buttonsNav[indexProject].querySelector(".button-projects_amount-wrapper");

      if (getAmountProject) {
        getAmountProject.remove();
      }

      if (!lengthCheckedTasks) return;

      buttonsNav[indexProject].insertAdjacentHTML(
        "beforeend",
        `<span class="button-projects_amount-wrapper"><span class="button-projects_amount">${lengthCheckedTasks}</span></span>`
      );
    });
  }

  fillListByProjects() {
    this.listElement.textContent = "";
    this.dataAboutList.forEach((project) => {
      if (project.staticProject) return;

      project.__proto__ = Project.prototype;

      const template = project.createProject();

      this.listElement.insertAdjacentHTML("beforeend", template);
    });
  }

  addProjectInDataOfProjectsAndInListProject(project) {
    if (this.nameProjects.indexOf(project.name) !== -1) {
      alert("There is already such a project");
      return;
    }

    this.dataAboutList.push(project);

    project.__proto__ = Project.prototype;

    const template = project.createProject(project);
    this.listElement.insertAdjacentHTML("beforeend", template);

    this.#addCountTasksInProject();
    this.#updataOfDataOfProjectsInLocalStorage();
  }

  #updataInLocalStorage(name, data) {
    localStorage.setItem(name, data);
  }

  #addTaskInThisWeekProjectIfProject() {
    const todayProject = this.findProjectInListProject("This week");
    const tasksOfTodayProject = todayProject.tasks;

    tasksOfTodayProject.length = 0;

    this.dataAboutList.forEach((project) => {
      const tasksProject = Array.from(project.tasks);

      if (project.checkAddButton === "0") return;

      tasksProject.forEach((task) => {
        const dateNow = new Date();
        const editDateOfTaskInDate = Date.parse(task.dueDate);
        const dateTask = new Date(editDateOfTaskInDate);

        if (dateNow.getFullYear() !== dateTask.getFullYear()) return;

        if (dateNow.getMonth() !== dateTask.getMonth()) return;

        if (dateNow.getDate() > dateTask.getDate()) return;

        if (dateNow.getDate() + 6 < dateTask.getDate()) return;

        const taskSuitable = JSON.parse(JSON.stringify(task));
        taskSuitable.nameProject = project.name;
        tasksOfTodayProject.push(taskSuitable);
      });
    });
  }

  findProjectInListProject(nameProject) {
    return this.dataAboutList.find((project) => project.name === nameProject);
  }

  addTasksInStaticProjectAndUpdateDataAndAddCountTasks() {
    this.#addTaskInTodayProjectIfProject();
    this.#addTaskInThisWeekProjectIfProject();
    this.#updataOfDataOfProjectsInLocalStorage();
    this.#addCountTasksInProject();
  }

  #addTaskInTodayProjectIfProject() {
    const todayProject = this.findProjectInListProject("Today");
    const tasksOfTodayProject = todayProject.tasks;

    tasksOfTodayProject.length = 0;

    this.dataAboutList.forEach((project) => {
      const tasksProject = Array.from(project.tasks);

      if (project.checkAddButton === "0") return;

      tasksProject.forEach((task) => {
        const dateNow = new Date();
        const editDateOfTaskInDate = Date.parse(task.dueDate);
        const dateTask = new Date(editDateOfTaskInDate);

        if (dateNow.getFullYear() !== dateTask.getFullYear()) return;

        if (dateNow.getMonth() !== dateTask.getMonth()) return;

        if (dateNow.getDay() !== dateTask.getDay()) return;

        const taskSuitable = JSON.parse(JSON.stringify(task));
        taskSuitable.nameProject = project.name;
        tasksOfTodayProject.push(taskSuitable);
      });
    });
  }

  getDataSelectTask(selectElement) {
    const tasksSelectProject = this.selectProject.tasks;
    const selectTask = selectElement.closest(".list-tasks_task");
    const tasks = Array.from(document.querySelectorAll(".list-tasks_task"));
    const indexSelectTask = tasks.indexOf(selectTask);
    const dataSelectTask = tasksSelectProject[indexSelectTask];

    return {
      dataSelectTask,
      indexSelectTask,
    };
  }

  select(index, project) {
    this.#deselectAll();
    this.#indexSelectProject = index;
    project.classList.add("active");
    this.#addCountTasksInProject();

    this.fillProjectPreview(this.#indexSelectProject);
  }

  fillProjectPreview() {
    const preview = document.querySelector(".project-preview");

    if (!this.selectProject) return;

    const nameSelectProject = this.selectProject.name;
    const templateProejctPreview = `<div class="project-preview_heading">${nameSelectProject}</div>
    <div class="list-tasks"></div>`;
    const templateButton = `<div class="task_button button-nav button-add">
    <span class="material-symbols-outlined task_button__icon button-nav_icon">add</span>
    <span class="task_button__text">Add task</span>
    </div>`;

    preview.innerHTML = templateProejctPreview;

    if (this.selectProject.checkAddButton === "1") {
      preview.insertAdjacentHTML("beforeend", templateButton);
    }

    const elementListTasks = document.querySelector(".list-tasks");
    const tasks = this.selectProject.tasks;
    const getListTasks = new ListTasks(elementListTasks, tasks, this);
    getListTasks.fillListByTasks();
    this.selectProject.listOfTasks = getListTasks;
  }

  #clearProjectPreview() {
    const preview = document.querySelector(".project-preview");
    preview.textContent = "";
  }

  #deselectAll() {
    const allButtons = document.querySelectorAll(".button-nav");
    allButtons.forEach((button) => button.classList.remove("active"));
  }

  deleteProjectWithList(index) {
    this.dataAboutList.splice(index, 1);

    this.#deselectAll();
    this.#clearProjectPreview();
    this.#updataOfDataOfProjectsInLocalStorage();

    if (index === this.#indexSelectProject) return;

    const buttonsNav = document.querySelectorAll(".button-nav");
    const selectProjectInListProject = buttonsNav[this.#indexSelectProject];
    this.select(this.#indexSelectProject, selectProjectInListProject);
  }
}

export default ListProjects;
