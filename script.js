import listProjects from "./class/listProjects.js";
import { showModalWindows, hideModalWindow } from "./modalWindow.js";
import Project from "./class/Project.js";
import Task from "./class/Task.js";
import listTasks from "./class/listTasks.js";
import preloader from "./preloader.js";

const wrapperMain = document.querySelector(".wrapper-main");
const addProjectModal = document.querySelector(".add-project-modal");
const addTaskModal = document.querySelector(".add-task-modal");
const editModal = document.querySelector(".edit-modal");
const listProjectsElement = document.querySelector(".projects_list-projects");
const wrapperNav = document.querySelector(".wrapper-nav");
const elementsOfStaticProjects = document.querySelectorAll(".static-projects_element");
const formAddProject = document.querySelector(".modal-window_data-about-project");
const formAddTask = document.querySelector(".modal-window_data-about-task");
const fromEdit = document.querySelector(".modal-window_data-about-edit");
const infoModal = document.querySelector(".info-modal");
const buttonShowHumburgerMenu = document.querySelector(".button-burger-menu");

const arrayListProjetcs = Project.createStaticProjects(elementsOfStaticProjects);
const dataWithLocalStorage = JSON.parse(localStorage.getItem("list-projects"));

const dataOfProjects = dataWithLocalStorage ? dataWithLocalStorage : arrayListProjetcs;
const getListProjects = new listProjects(listProjectsElement, dataOfProjects);

wrapperMain.addEventListener("click", (event) => {
  const target = event.target;
  const projectsButton = target.closest(".projects_button");
  const taskButton = target.closest(".task_button");
  const taskEdit = target.closest(".list-tasks_task__edit");
  const infoButton = target.closest(".list-tasks_task__info");

  if (projectsButton) {
    const modalWindow = addProjectModal.lastElementChild;
    showModalWindows(addProjectModal, modalWindow);
  }

  if (taskButton) {
    const modalWindow = addTaskModal.lastElementChild;
    showModalWindows(addTaskModal, modalWindow);
  }

  if (infoButton) {
    const modalWindow = infoModal.lastElementChild;
    showModalWindows(infoModal, modalWindow);

    const nameTask = document.querySelector("#data-about-info_nameTask");
    const dueDate = document.querySelector("#data-about-info_dueDate");
    const description = document.querySelector("#data-about-info_description");
    const priority = document.querySelector("#data-about-info_priority");

    const { dataSelectTask } = getListProjects.getDataSelectTask(target);

    nameTask.textContent = dataSelectTask.title;
    dueDate.textContent = dataSelectTask.dueDate;
    description.textContent = dataSelectTask.description;
    priority.textContent = dataSelectTask.priority;
  }

  if (taskEdit) {
    const modalWindow = editModal.lastElementChild;
    showModalWindows(editModal, modalWindow);

    const { dataSelectTask, indexSelectTask } = getListProjects.getDataSelectTask(target);

    fromEdit.dataset.indexSelectTask = indexSelectTask;
    fromEdit.nameTask.value = dataSelectTask.title;
    fromEdit.dueDate.value = dataSelectTask.dueDate;
    fromEdit.description.value = dataSelectTask.description;
    fromEdit.priority.value = dataSelectTask.priority;
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;
  const hasWrapperModalWindow = target.closest(".wrapper-modal-window");
  const hasModalWindow = target.closest(".modal-window");
  const hasButtonHidingModalWindow = target.closest(".button-hiding-modal-window");

  if (!hasWrapperModalWindow) return;

  if (hasModalWindow && !hasButtonHidingModalWindow) return;

  const modalWindow = hasWrapperModalWindow.lastElementChild;

  hideModalWindow(hasWrapperModalWindow, modalWindow);
});

formAddProject.addEventListener("submit", function (event) {
  event.preventDefault();

  const modalWindow = this.parentElement;
  const wrapperModalWindow = modalWindow.parentElement;
  const nameProject = formAddProject.nameProject;
  const nameProjectValue = nameProject.value.trim();
  const project = new Project(nameProjectValue);

  getListProjects.addProjectInDataOfProjectsAndInListProject(project);

  hideModalWindow(wrapperModalWindow, modalWindow);
  nameProject.blur();
  nameProject.value = "";
});

formAddTask.addEventListener("submit", function (event) {
  event.preventDefault();

  const modalWindow = this.parentElement;
  const wrapperModalWindow = modalWindow.parentElement;
  const nameTask = this.nameTask;
  const dueDate = this.dueDate;
  const priority = this.priority;
  const description = this.description;
  const nameTaskValue = nameTask.value.trim();
  const dueDateValue = dueDate.value.trim();
  const priorityValue = priority.value.trim();
  const descriptionValue = description.value.trim();
  const task = new Task(nameTaskValue, priorityValue, descriptionValue, dueDateValue);
  getListProjects.addTaskInSelectProject(task);

  getListProjects.fillProjectPreview();
  hideModalWindow(wrapperModalWindow, modalWindow);
  getListProjects.addTasksInStaticProjectAndUpdateDataAndAddCountTasks();

  this.blur();
  nameTask.value = "";
  dueDate.value = "";
  description.value = "";
});

fromEdit.addEventListener("submit", (event) => {
  event.preventDefault();

  const target = event.target;
  const wrapperModalWindow = target.closest(".wrapper-modal-window");
  const modalWindow = wrapperModalWindow.lastElementChild;

  hideModalWindow(wrapperModalWindow, modalWindow);

  const tasksSelectProject = getListProjects.selectProject.tasks;
  const indexSelectTaskInForm = fromEdit.dataset.indexSelectTask;
  const dataSelectTask = tasksSelectProject[indexSelectTaskInForm];
  dataSelectTask.title = fromEdit.nameTask.value;
  dataSelectTask.dueDate = fromEdit.dueDate.value;
  dataSelectTask.description = fromEdit.description.value;
  dataSelectTask.priority = fromEdit.priority.value;

  const hasNameProjectInTask = dataSelectTask.nameProject;
  if (hasNameProjectInTask) {
    const projectParent = getListProjects.findProjectInListProject(hasNameProjectInTask);
    const tasksParentProject = projectParent.tasks;
    const selectTaskParentProject = tasksParentProject[indexSelectTaskInForm];
    selectTaskParentProject.title = fromEdit.nameTask.value;
    selectTaskParentProject.dueDate = fromEdit.dueDate.value;
    selectTaskParentProject.description = fromEdit.description.value;
    selectTaskParentProject.priority = fromEdit.priority.value;
  }

  getListProjects.fillProjectPreview();
  getListProjects.addTasksInStaticProjectAndUpdateDataAndAddCountTasks();
});

listProjectsElement.addEventListener("click", (event) => {
  const target = event.target;

  const buttonClose = target.closest(".wrapper-list-projects_project__close");
  if (!buttonClose) return;

  const buttonsNav = Array.from(document.querySelectorAll(".button-nav"));
  const parentTarget = target.closest(".button-nav");
  const indexButtonNav = buttonsNav.indexOf(parentTarget);

  getListProjects.deleteProjectWithList(indexButtonNav);
  parentTarget.remove();
  getListProjects.addTasksInStaticProjectAndUpdateDataAndAddCountTasks();
});

wrapperNav.addEventListener("click", (event) => {
  const target = event.target;

  const buttonClose = target.closest(".wrapper-list-projects_project__close");
  if (buttonClose) return;

  const buttonAdd = target.closest(".button-add");
  if (buttonAdd) return;

  const buttonNav = target.closest(".button-nav");
  if (!buttonNav) return;

  const buttonsNav = Array.from(document.querySelectorAll(".button-nav"));
  const parentTarget = target.closest(".button-nav");
  const indexButtonNav = buttonsNav.indexOf(parentTarget);
  getListProjects.select(indexButtonNav, parentTarget);
});

wrapperMain.addEventListener("click", (event) => {
  const target = event.target;
  const closeTaskButton = target.closest(".list-tasks_task__close");

  if (!closeTaskButton) return;

  const selectTask = closeTaskButton.closest(".list-tasks_task");
  listTasks.deleteTask(getListProjects, selectTask);
  getListProjects.addTasksInStaticProjectAndUpdateDataAndAddCountTasks();
});

wrapperMain.addEventListener("change", (event) => {
  const target = event.target;
  const checkboxTask = target.closest(".list-tasks_task__checkboxTask");

  if (!checkboxTask) return;

  const task = checkboxTask.closest(".list-tasks_task");
  const tasks = Array.from(document.querySelectorAll(".list-tasks_task"));
  const indexSelectTask = tasks.indexOf(task);
  const selectProject = getListProjects.selectProject;
  const selectTask = selectProject.tasks[indexSelectTask];
  selectTask.checked = !selectTask.checked;
  task.classList.toggle("checked");

  const hasNameProjectInTask = selectTask.nameProject;
  if (hasNameProjectInTask) {
    const projectParent = getListProjects.findProjectInListProject(hasNameProjectInTask);
    const tasksParentProject = projectParent.tasks;
    const selectTaskParentProject = tasksParentProject[indexSelectTask];
    selectTaskParentProject.checked = !selectTaskParentProject.checked;
  }

  getListProjects.addTasksInStaticProjectAndUpdateDataAndAddCountTasks();
});

buttonShowHumburgerMenu.addEventListener("click", () => {
  buttonShowHumburgerMenu.classList.add("button-burger-menu_active");
  wrapperNav.style.left = "0";
});

wrapperNav.addEventListener("click", (event) => {
  const target = event.target;

  const hasClassInButtonShowHumburgerMenu = buttonShowHumburgerMenu.classList.contains("button-burger-menu_active");
  if (!hasClassInButtonShowHumburgerMenu) return;

  const buttonClose = target.closest(".list-projects_project__close");
  if (buttonClose) return;
  
  const buttonAdd = target.closest(".button-add");
  if (buttonAdd) return;

  const buttonNav = target.closest(".button-nav");
  const hasNavProjects = target.closest(".nav-projects");
  const buttonCloseWrapperNav = target.closest(".button-close-wrapper-nav");
  if (hasNavProjects && !buttonCloseWrapperNav && !buttonNav) return;

  buttonShowHumburgerMenu.classList.remove("button-burger-menu_active");
  wrapperNav.style.left = "-100%";
});

preloader().then(() => {
  const preloaderElement = document.querySelector('.preloader');
  preloaderElement.style.opacity = '0';
  setTimeout(() => preloaderElement.remove(), 600);
})

// taskEdit.addEventListener('click', (event) => {
//   const target = event.target;
//   const tasksSelectProject = getListProjects.selectProject.tasks;
//   const selectTask = target.closest('.list-tasks_task')
//   const tasks = Array.from(document.querySelectorAll('.list-tasks_task'));
//   const indexSelectTask = tasks.indexOf(selectTask);
//   const dataSelectTask = tasksSelectProject[indexSelectTask];

//   showModalWindows(editModal);

//   const form = editModal.lastElementChild.lastElementChild
//   form.nameTask.value = dataSelectTask.title;
//   form.dueData.value = dataSelectTask.dueData;
//   form.description.value = dataSelectTask.description;
//   form.priority.value = dataSelectTask.priority;
// })

// [
//   {
//     name: "Inbox",
//     task: [],
//     staticProject: true,
//   },
//   {
//     name: "Today",
//     task: [],
//     staticProject: true,
//   },
//   {
//     name: "This week",
//     task: [],
//     staticProject: true,
//   },
// ];
