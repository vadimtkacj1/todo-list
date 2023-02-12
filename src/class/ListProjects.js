import ListTasks from "./ListTasks.js";
import Project from "./Project.js";
import List from "./List.js";
import { buttonAddTask, countCompletedTasks } from "./listProject/template/listProject.js";
import parametersTasksTemplate from "./listTasks/template/listTasks.js";

class ListProjects extends List {
  get selectedProject() {
    return this.dataAboutList[this.#indexSelectedProject];
  }

  get nameProjects() {
    return this.dataAboutList.map((project) => project.name);
  }

  get indexSelectedProject() {
    return this.#indexSelectedProject;
  }

  #indexSelectedProject = 0;

  constructor(listElement, dataAboutList, methodsAuth, projectsWithoutButtonAdd = []) {
    super(listElement, dataAboutList);
    this.projectsWithoutButtonAdd = projectsWithoutButtonAdd;
    this.methodsAuth = methodsAuth;
    this.#addInProjectListTasks();
    this.fillProjectPreview();
    this.fillListByDataAboutList();
    this.fillProjectsWithoutButtonAdd();
    this.#addCountTasksInProjects();
  }

  #addInProjectListTasks() {
    this.dataAboutList.forEach((project) => {
      const getListTasks = document.querySelector(".list-tasks");

      project.__proto__ = Project.prototype;

      const listOfTasks = project.listOfTasks;
      const hasProjectButtonAddTask = project.hasProjectButtonAddTask;
      if (!listOfTasks) {
        project.listOfTasks = new ListTasks(getListTasks, hasProjectButtonAddTask);
      } else {
        project.listOfTasks = new ListTasks(getListTasks, hasProjectButtonAddTask, listOfTasks.dataAboutList);
      }
    });
  }

  fillProjectsWithoutButtonAdd() {
    this.projectsWithoutButtonAdd.forEach((project) => {
      this.#addTaskInStaticProjects(project.nameProject, project.callback);
    });
  }

  indexProject(project) {
    return this.dataAboutList.indexOf(project);
  }

  #addTaskInStaticProjects(nameProject, callback) {
    const project = this.findProjectInListProject(nameProject);

    project.listOfTasks.dataAboutList = this.dataAboutList.reduce(callback, []);
    this.addCountTasksInProject(project, this.indexProject(project));
  }

  updateOfDataUser() {
    const idUser = this.methodsAuth.auth.currentUser.uid;
    const pathByDatabase = `project-user-lists/${idUser}`;
    this.methodsAuth.editDataOfDatabase(pathByDatabase, this.dataAboutList);
  }

  addTaskInSelectedProject(task) {
    this.selectedProject.listOfTasks.addTaskInList(task);

    this.addCountTasksInProject(this.selectedProject, this.indexSelectedProject);
    this.updateOfDataUser();
  }

  #addCountTasksInProjects() {
    this.dataAboutList.forEach((project, indexProject) => {
      this.addCountTasksInProject(project, indexProject);
    });
  }

  addCountTasksInProject(project, indexProject) {
    const buttonsNav = document.querySelectorAll(".button-nav");
    const buttonNav = buttonsNav[indexProject];
    const listOfTasks = project.listOfTasks;
    const tasks = listOfTasks.dataAboutList;
    const completedTask = tasks.filter((task) => !task.isCompleted);
    const countTasks = completedTask.length;
    const getAmountProject = buttonNav.querySelector(".button-projects_amount-wrapper");

    const templateCountCompletedTasks = countCompletedTasks(countTasks);

    if (getAmountProject) {
      getAmountProject.remove();
    }

    if (!countTasks) return;

    buttonNav.insertAdjacentHTML("beforeend", templateCountCompletedTasks);
  }

  fillListByDataAboutList() {
    this.listElement.textContent = "";

    this.dataAboutList.forEach((project) => {
      if (project.isStaticProject) return;

      const template = project.createElement();
      this.listElement.insertAdjacentHTML("beforeend", template);
    });
  }

  isProjectExisting(project) {
    return this.nameProjects.includes(project.name);
  }

  addProjectInListProjects(project) {
    this.dataAboutList.push(project);

    const template = project.createElement();
    this.listElement.insertAdjacentHTML("beforeend", template);

    this.updateOfDataUser();
  }

  findProjectInListProject(nameProject) {
    return this.dataAboutList.find((project) => project.name === nameProject);
  }

  select(index) {
    this.#deselectAll();
    this.#indexSelectedProject = index;
    const project = document.querySelectorAll(".button-nav")[index];
    project.classList.add("active");
    this.fillProjectPreview();
  }

  fillProjectPreview() {
    const nameSelectedProject = this.selectedProject.name;
    const isStaticProject = this.selectedProject.isStaticProject;
    const previewHeader = document.querySelector(".project-preview_header__heading");
    const previewSetting = document.querySelector(".wrapper-list-projects_project__setting");
    const lisTasks = document.querySelector(".list-tasks");
    const addTask = document.querySelector(".task_button");
    const nameClass = isStaticProject ? "hide" : "";
    previewHeader.textContent = nameSelectedProject;
    lisTasks.textContent = "";
    previewSetting.className = "wrapper-list-projects_project__setting button-open-modal-window " + nameClass;

    if (addTask) {
      addTask.remove();
    }

    if (this.selectedProject.hasProjectButtonAddTask) {
      const templateButton = buttonAddTask();
      lisTasks.insertAdjacentHTML("beforebegin", templateButton);
    }

    const parametersTasks = document.querySelector(".parameters-tasks");
    parametersTasks.innerHTML = "";

    const listOfTasks = this.selectedProject.listOfTasks;
    listOfTasks.fillListByDataAboutList();

    if (!listOfTasks.parametersTasks) return;

    parametersTasks.innerHTML = parametersTasksTemplate(listOfTasks.parametersTasks.text);
  }

  #deselectAll() {
    const allButtons = document.querySelectorAll(".button-nav");
    allButtons.forEach((button) => button.classList.remove("active"));
  }

  deleteElementWithList() {
    this.dataAboutList.splice(this.#indexSelectedProject, 1);

    this.#deselectAll();
    this.updateOfDataUser();

    const buttonsNav = document.querySelectorAll(".button-nav");
    buttonsNav[this.#indexSelectedProject].remove();

    this.select(0);
  }
}

export default ListProjects;
