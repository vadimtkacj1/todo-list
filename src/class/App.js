import { showModalWindow, hideModalWindow } from "../modalWindow.js";
import Task from "./Task.js";
import Project from "./Project.js";
import {
  popUpMenuSort,
  popUpMenuFilter,
  modalWindowAddProject,
  modalWindowAddTask,
  modalWindowEditProject,
  modalWindowDeleteProject,
  modalWindowInfoTask,
  modalWindowEditTask,
  modalWindowSignOut,
  modalWindowDeleteAccount,
  modalWindowAccount,
  popUpMenuAccount,
  modalWindowExistProject,
} from "../templates.js";
import { modalWindowLogIn, modalWindowSignUp } from "../templates.js";
import { getDataOfDatabase, googleSignIn } from "../firebase.js";
import ListProjects from "./ListProjects.js";
import projectsWithoutButtonAdd from "../staticProjects.js";

class App {
  constructor(methodsAuth) {
    this.methodsAuth = methodsAuth;
  }

  #showPopUpMenu(elem, template) {
    elem.insertAdjacentHTML("beforeend", template());
    document.addEventListener("click", this.#listenerHidePopUpMenu, true);
  }

  #selectButtonSigUpOrLogIn(selectElement, prevSelectElement, valueForm) {
    const formModalWindow = document.querySelector(".modal-window_log-in-or-sign-up");
    formModalWindow.innerHTML = valueForm;
    selectElement.classList.add("header-modal_heading__button-active");
    prevSelectElement.classList.remove("header-modal_heading__button-active");
  }

  #listenerPopUpMenuTasks(event, listProjects) {
    const target = event.target;
    const buttonPopUpMenu = target.closest(".pop-up-menu-tasks_button");

    if (!buttonPopUpMenu) return;

    const buttonPopUpMenuValue = buttonPopUpMenu.dataset.value;
    const selectedProject = listProjects.selectedProject;
    const tasks = selectedProject.listOfTasks;
    const popUpMenu = target.closest(".pop-up-menu");

    if (buttonPopUpMenuValue === "importanceSort") {
      tasks.sortByImportance();
    }

    if (buttonPopUpMenuValue === "dateSort") {
      tasks.sortByDate();
    }

    if (buttonPopUpMenuValue === "importanceFilter") {
      tasks.filterByImportance();
    }

    if (buttonPopUpMenuValue === "dateFilter") {
      tasks.filterByDate();
    }

    popUpMenu.remove();
  }

  #listenerHidePopUpMenu() {
    const popUpMenu = document.querySelector(".pop-up-menu");

    if (!popUpMenu) return;

    popUpMenu.remove();
  }

  #descriptionMoreShowOrHide(taskDescription) {
    const listTasks = Array.from(document.querySelector(".list-tasks").children);
    listTasks.forEach((task) => {
      const taskDescriptionOfListTasks = task.lastElementChild;
      if (taskDescriptionOfListTasks === taskDescription) return;

      taskDescriptionOfListTasks.classList.remove("continuation-text");
    });

    taskDescription.classList.toggle("continuation-text");
  }

  #submitAddProject(listProjects) {
    const modalWindow = document.querySelector(".modal-window");
    const formModalWindow = modalWindow.querySelector("form");
    const nameProject = formModalWindow.nameProject;
    const nameProjectValue = nameProject.value.trim();
    const headerModalWindow = formModalWindow.previousElementSibling;
    const colorProject = headerModalWindow.dataset.color;
    const project = new Project(nameProjectValue, colorProject);

    const isProjectForExistence = listProjects.isProjectExisting(project);
    if (isProjectForExistence) {
      modalWindow.innerHTML = modalWindowExistProject();
      return;
    }

    listProjects.addProjectInListProjects(project);
    hideModalWindow(modalWindow);
    formModalWindow.buttonSubmit.disabled = true;
  }

  #submitAddTask(listProjects) {
    const modalWindow = document.querySelector(".modal-window");
    const formModalWindow = modalWindow.querySelector("form");
    const nameTask = formModalWindow.nameTask;
    const dueDate = formModalWindow.dueDate;
    const priority = formModalWindow.priority;
    const description = formModalWindow.description;
    const nameTaskValue = nameTask.value.trim();
    const dueDateValue = dueDate.value.trim();
    const priorityValue = priority.value.trim();
    const descriptionValue = description.value.trim();
    const task = new Task(nameTaskValue, priorityValue, descriptionValue, dueDateValue);

    listProjects.addTaskInSelectedProject(task);

    const selectedProject = listProjects.selectedProject;
    const parametersTasks = selectedProject.listOfTasks.parametersTasks;

    if (parametersTasks) {
      parametersTasks.callback();
    }

    listProjects.fillProjectPreview();
    hideModalWindow(modalWindow);
    listProjects.fillProjectsWithoutButtonAdd();
    listProjects.updateOfDataUser();
    formModalWindow.buttonSubmit.disabled = true;
  }

  #submitEditProject(listProjects, button) {
    const modalWindow = document.querySelector(".modal-window");
    const formModalWindow = modalWindow.querySelector("form");

    const nameButton = button.name;
    if (nameButton === "buttonDelete") {
      modalWindow.innerHTML = modalWindowDeleteProject();
    }

    if (nameButton === "buttonEdit") {
      const selectedProject = listProjects.selectedProject;
      const nameProject = formModalWindow.nameProject.value;
      const selectedProjectWithNewName = JSON.parse(JSON.stringify(listProjects.selectedProject));
      selectedProjectWithNewName.name = nameProject;

      if (selectedProject.name !== selectedProjectWithNewName.name) {
        const isProjectForExistence = listProjects.isProjectExisting(selectedProjectWithNewName);

        if (isProjectForExistence) {
          modalWindow.innerHTML = modalWindowExistProject();
          return;
        }
      }

      hideModalWindow(modalWindow);

      const headerModalWindow = formModalWindow.previousElementSibling;
      const colorProject = headerModalWindow.dataset.color;

      selectedProject.name = nameProject;
      selectedProject.colorProject = colorProject;

      const projects = document.querySelectorAll(".button-nav");
      const selectedProjectElement = projects[listProjects.indexSelectedProject];
      selectedProjectElement.firstElementChild.textContent = nameProject;
      selectedProjectElement.style.borderLeft = `3px solid ${colorProject}`;
      listProjects.fillProjectPreview();
      listProjects.updateOfDataUser();
      formModalWindow.buttonEdit.disabled = true;
    }
  }

  #submitEditTask(listProjects) {
    const modalWindow = document.querySelector(".modal-window");
    const formModalWindow = modalWindow.querySelector("form");
    const listOfTasks = listProjects.selectedProject.listOfTasks;
    const indexSelectedTask = listOfTasks.indexSelectedTask;
    const dataSelectTask = listOfTasks.changedList[indexSelectedTask];

    dataSelectTask.title = formModalWindow.nameTask.value;
    dataSelectTask.dueDate = formModalWindow.dueDate.value;
    dataSelectTask.description = formModalWindow.description.value;
    dataSelectTask.priority = formModalWindow.priority.value;
    hideModalWindow(modalWindow);

    const selectedProject = listProjects.selectedProject;
    const parametersTasks = selectedProject.listOfTasks.parametersTasks;

    if (parametersTasks) {
      parametersTasks.callback();
    }

    listProjects.fillProjectsWithoutButtonAdd();
    listProjects.fillProjectPreview();
    listProjects.updateOfDataUser();
    formModalWindow.buttonEdit.disabled = true;
  }

  #submitDeleteProject(listProjects, button) {
    const modalWindow = document.querySelector(".modal-window");
    const nameButton = button.name;

    if (nameButton === "buttonYes") {
      listProjects.deleteElementWithList();
      listProjects.fillProjectsWithoutButtonAdd();

      hideModalWindow(modalWindow);
    }

    if (nameButton === "buttonNo") {
      hideModalWindow(modalWindow);
    }
  }

  async #submitDeleteAccount(button, auth, deleteUser) {
    const modalWindow = document.querySelector(".modal-window");
    const form = modalWindow.querySelector("form");
    const nameButton = button.name;

    if (nameButton === "buttonYes") {
      form.buttonYes.disabled = true;
      const currentUser = auth.currentUser;
      const pathByDatabase = `project-user-lists/${currentUser.uid}`;
      await this.methodsAuth.deleteDataOfDatabase(pathByDatabase);
      await deleteUser(currentUser);
      location.reload();
    }

    if (nameButton === "buttonNo") {
      hideModalWindow(modalWindow);
    }
  }

  #submitAccount(button) {
    const modalWindow = document.querySelector(".modal-window");

    const nameButton = button.name;
    if (nameButton === "buttonDelete") {
      modalWindow.innerHTML = modalWindowDeleteAccount();
    }
  }

  #submitSignOut(button, signOut, auth) {
    const modalWindow = document.querySelector(".modal-window");
    const nameButton = button.name;

    if (nameButton === "buttonYes") {
      signOut(auth);
      location.reload();

      hideModalWindow(modalWindow);
    }

    if (nameButton === "buttonNo") {
      hideModalWindow(modalWindow);
    }
  }

  #enterInApp(listProjects, methodsAuth) {
    const buttonShowHamburgerMenu = document.querySelector(".button-burger-menu");
    const iconUserButton = document.querySelector(".button-user-email");
    const projectPreviewButtons = document.querySelector(".project-preview_header__button");
    const wrapperModalWindow = document.querySelector(".wrapper-modal-window");
    const listTasksElement = document.querySelector(".list-tasks");
    const modalWindow = document.querySelector(".modal-window");
    const navProjects = document.querySelector(".nav-projects");
    const parametersTasks = document.querySelector(".parameters-tasks");

    modalWindow.addEventListener("submit", (event) => {
      const target = event.target;

      event.preventDefault();

      const buttonSubmit = event.submitter;
      const addProject = target.closest("#modal-window_add-project");
      const editProject = target.closest("#modal-window_edit-project");
      const addTask = target.closest("#modal-window_add-task");
      const editTask = target.closest("#modal-window_edit-task");
      const deleteProject = target.closest("#modal-window_delete-project");
      const buttonSignOut = target.closest("#modal-window_sign-out");
      const account = target.closest("#modal-window_account");
      const deleteAccount = target.closest("#modal-window_delete-account");

      if (deleteAccount) {
        this.#submitDeleteAccount(buttonSubmit, methodsAuth.auth, methodsAuth.deleteUser);
      }

      if (addProject) {
        this.#submitAddProject(listProjects);
      }

      if (account) {
        this.#submitAccount(buttonSubmit);
      }

      if (buttonSignOut) {
        this.#submitSignOut(buttonSubmit, methodsAuth.signOut, methodsAuth.auth);
      }

      if (addTask) {
        this.#submitAddTask(listProjects);
      }

      if (editProject) {
        this.#submitEditProject(listProjects, buttonSubmit);
      }

      if (editTask) {
        this.#submitEditTask(listProjects);
      }

      if (deleteProject) {
        this.#submitDeleteProject(listProjects, buttonSubmit);
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      const buttonOpenModalWindow = target.closest(".button-open-modal-window");
      const taskDescription = target.closest(".list-tasks_task__description");

      if (!buttonOpenModalWindow && !taskDescription) return;

      const projectsButton = target.closest(".projects_button");
      const addTask = target.closest(".task_button");
      const taskEdit = target.closest(".list-tasks_task__edit");
      const infoButton = target.closest(".list-tasks_task__info");
      const editProject = target.closest(".wrapper-list-projects_project__setting");
      const task = target.closest(".list-tasks_task");
      const buttonSignOut = target.closest(".pop-up-user-sign-out");
      const buttonAccount = target.closest(".pop-up-user-account");
      const selectedProject = listProjects.selectedProject;
      const listTasks = selectedProject.listOfTasks;
      const modalWindow = document.querySelector(".modal-window");

      if (taskDescription) {
        this.#descriptionMoreShowOrHide(taskDescription);
      }

      if (buttonAccount) {
        const emailUser = methodsAuth.auth.currentUser.email;
        modalWindow.innerHTML = modalWindowAccount(emailUser);
        showModalWindow(modalWindow);
        const popUpMenu = document.querySelector(".pop-up-menu");
        popUpMenu.remove();
      }

      if (buttonSignOut) {
        modalWindow.innerHTML = modalWindowSignOut();
        showModalWindow(modalWindow);
        const popUpMenu = document.querySelector(".pop-up-menu");
        popUpMenu.remove();
      }

      if (projectsButton) {
        modalWindow.innerHTML = modalWindowAddProject();
        showModalWindow(modalWindow);
      }

      if (editProject) {
        modalWindow.innerHTML = modalWindowEditProject(selectedProject);
        showModalWindow(modalWindow);
      }

      if (addTask) {
        modalWindow.innerHTML = modalWindowAddTask();
        showModalWindow(modalWindow);
      }

      if (infoButton) {
        listTasks.indexSelectedTask = task;
        const params = listTasks.selectedTask;
        modalWindow.innerHTML = modalWindowInfoTask(params);
        showModalWindow(modalWindow);
      }

      if (taskEdit) {
        listTasks.indexSelectedTask = task;
        const priorityValue = listTasks.selectedTask.priority.toUpperCase();
        const color = Task.PRIORITY_COLOR[priorityValue];
        const params = {
          ...listTasks.selectedTask,
          color,
        };
        modalWindow.innerHTML = modalWindowEditTask(params);
        showModalWindow(modalWindow);
      }
    });

    iconUserButton.addEventListener("click", () => {
      this.#showPopUpMenu(iconUserButton, popUpMenuAccount);
    });

    parametersTasks.addEventListener("click", (event) => {
      const target = event.target;
      const buttonRemove = target.closest(".parameters-tasks_wrapper-remove");

      if (!buttonRemove) return;

      parametersTasks.innerHTML = "";
      listProjects.selectedProject.listOfTasks.parametersTasks = null;
      listProjects.fillProjectPreview();
    });

    projectPreviewButtons.addEventListener("click", (event) => {
      const target = event.target;
      const filterButton = target.closest(".wrapper_button-filter-wrapper-nav");
      const sortButton = target.closest(".wrapper_button-sort-wrapper-nav");

      if (sortButton) {
        this.#showPopUpMenu(sortButton, popUpMenuSort);
        document.addEventListener("click", (event) => this.#listenerPopUpMenuTasks(event, listProjects), true);
      }

      if (filterButton) {
        this.#showPopUpMenu(filterButton, popUpMenuFilter);
        document.addEventListener("click", (event) => this.#listenerPopUpMenuTasks(event, listProjects), true);
      }
    });

    wrapperModalWindow.addEventListener("click", (event) => {
      const target = event.target;
      const buttonHideModalWindow = target.closest(".button-hiding-modal-window");

      if (!target.classList.contains("wrapper-modal-window") && !buttonHideModalWindow) return;

      const modalWindow = document.querySelector(".modal-window");
      hideModalWindow(modalWindow);
    });

    wrapperModalWindow.addEventListener("change", (event) => {
      const target = event.target;
      const priority = target.closest(".priority");

      if (!priority) return;

      const priorityValue = priority.value;
      const color = Task.PRIORITY_COLOR[priorityValue.toUpperCase()];
      const headerModalWindow = target.closest(".modal-window").firstElementChild;
      headerModalWindow.style.borderBottom = `5px solid ${color}`;
      headerModalWindow.dataset.color = color;
    });

    wrapperModalWindow.addEventListener("input", (event) => {
      const target = event.target;
      const colorProject = target.closest(".colorProject");

      if (!colorProject) return;

      const color = colorProject.value;
      const headerModalWindow = target.closest(".modal-window").firstElementChild;
      headerModalWindow.style.borderBottom = `5px solid ${color}`;
      headerModalWindow.dataset.color = color;
    });

    navProjects.addEventListener("click", (event) => {
      const target = event.target;

      const buttonNav = target.closest(".button-nav");
      if (!buttonNav) return;

      const buttonsNav = Array.from(document.querySelectorAll(".button-nav"));
      const indexButtonNav = buttonsNav.indexOf(buttonNav);
      listProjects.select(indexButtonNav);
    });

    listTasksElement.addEventListener("click", (event) => {
      const target = event.target;
      const closeTaskButton = target.closest(".list-tasks_task__close");

      if (!closeTaskButton) return;

      const selectedTask = closeTaskButton.closest(".list-tasks_task");
      listProjects.selectedProject.listOfTasks.indexSelectedTask = selectedTask;
      const selectedProject = listProjects.selectedProject;
      const tasksSelectedProject = selectedProject.listOfTasks;
      tasksSelectedProject.deleteElementWithList();
      listProjects.addCountTasksInProject(selectedProject, listProjects.indexSelectedProject);
      listProjects.fillProjectsWithoutButtonAdd();
      listProjects.updateOfDataUser();
    });

    listTasksElement.addEventListener("change", (event) => {
      const target = event.target;
      const checkboxTask = target.closest(".list-tasks_task__checkboxTask");

      if (!checkboxTask) return;

      const task = checkboxTask.closest(".list-tasks_task");
      const selectedProject = listProjects.selectedProject;
      const listOfTasks = selectedProject.listOfTasks;
      listOfTasks.indexSelectedTask = task;
      const indexSelectedTask = listOfTasks.indexSelectedTask;
      const selectedTask = listOfTasks.changedList[indexSelectedTask];
      selectedTask.isCompleted = !selectedTask.isCompleted;
      task.classList.toggle("checked");

      const nameProjectOfTask = selectedTask.nameProject;
      if (nameProjectOfTask) {
        const projectParent = listProjects.findProjectInListProject(nameProjectOfTask);
        const listOfTasksParent = projectParent.listOfTasks;
        const indexTaskParent = listOfTasksParent.indexTaskFind(selectedTask);
        const taskParent = listOfTasksParent.dataAboutList[indexTaskParent];
        taskParent.isCompleted = !taskParent.isCompleted;
        listProjects.addCountTasksInProject(projectParent, listProjects.indexProject(projectParent));
      } else {
        listProjects.addCountTasksInProject(selectedProject, listProjects.indexSelectedProject);
      }

      listProjects.fillProjectsWithoutButtonAdd();
      listProjects.updateOfDataUser();
    });

    window.addEventListener("resize", () => {
      const width = document.body.clientWidth;

      if (width < 767) {
        const wrapperNav = document.querySelector(".wrapper-nav");

        buttonShowHamburgerMenu.addEventListener("click", () => {
          wrapperNav.classList.add("button-menu-show");
        });

        wrapperNav.addEventListener("click", (event) => {
          const target = event.target;
          const navProjects = target.closest(".nav-projects");
          const buttonCloseBurgerMenu = target.closest(".button-close-wrapper-nav");
          const buttonNav = target.closest(".button-nav");

          if (navProjects && !buttonCloseBurgerMenu && !buttonNav) return;

          wrapperNav.classList.remove("button-menu-show");
        });
      }
    });

    const eventResize = new Event("resize");
    window.dispatchEvent(eventResize);
  }

  #changeWindowEnterInApp(formModalWindow, nameStyle) {
    formModalWindow.dataset.styleSubmit = nameStyle;
  }

  #showPreloader() {
    const preloaderElement = document.querySelector(".preloader");
    preloaderElement.style.opacity = "1";
    preloaderElement.style.visibility = "visible";
  }

  #hidePreloader() {
    const preloaderElement = document.querySelector(".preloader");
    preloaderElement.style.opacity = "0";
    preloaderElement.style.visibility = "hidden";
  }

  start() {
    const formModalWindow = document.querySelector(".modal-window_log-in-or-sign-up");
    const modalHeaders = document.querySelector(".modal-window_headers");
    const buttonUserEmail = document.querySelector(".button-user-email");
    const elementsOfStaticProjects = document.querySelectorAll(".static-projects_element");

    this.methodsAuth.onAuthStateChanged(this.methodsAuth.auth, async (currentUser) => {
      if (!currentUser) {
        this.#hidePreloader();
        return;
      }

      const idUser = currentUser.uid;
      const pathByDatabase = `project-user-lists/${idUser}`;

      const listProjectsElement = document.querySelector(".projects_list-projects");

      const modalWindow = document.querySelector(".modal-window");
      const wrapperModalWindow = modalWindow.parentElement;
      wrapperModalWindow.classList.remove("wrapper-modal-window-auth");
      modalWindow.classList.remove("modal-window-auth");

      hideModalWindow(modalWindow);

      let dataAboutList = Project.createStaticProjects(elementsOfStaticProjects);

      const dataUser = await getDataOfDatabase(pathByDatabase);
      if (dataUser.exists()) {
        dataAboutList = dataUser.val();
      }

      const email = currentUser.email;
      buttonUserEmail.textContent = email;
      buttonUserEmail.title = email;

      const listProjects = new ListProjects(listProjectsElement, dataAboutList, this.methodsAuth, projectsWithoutButtonAdd);

      this.#enterInApp(listProjects, this.methodsAuth);
      setTimeout(() => this.#hidePreloader(), 400);
    });

    if (this.methodsAuth.signInWithPopup) {
      formModalWindow.addEventListener("click", (event) => {
        const target = event.target;
        const googleBtn = target.closest(".login-with-google-btn");

        if (!googleBtn) return;

        this.#showPreloader();

        this.methodsAuth.signInWithPopup(this.methodsAuth.auth, googleSignIn);
      });
    }

    formModalWindow.addEventListener("submit", (event) => {
      event.preventDefault();

      const textError = document.querySelector(".content-modal-auth_error");
      const styleSubmit = formModalWindow.dataset.styleSubmit;
      const email = formModalWindow.email.value;
      const password = formModalWindow.password.value;
      const confirmPassword = formModalWindow.confirmPassword?.value;
      const submitButton = formModalWindow.buttonSubmit;
      const minLengthPassword = 6;
      const messageWithError = {
        minLengthPassword: "Password length at least 6 characters",
        wrongPasswordOrEmail: "Your email and password does not match. Please try again.",
        existingUser: "Already have an account with this email address",
        confirmOfPassword: "Passwords do not match",
      };

      textError.textContent = "";

      if (password !== confirmPassword && styleSubmit === "signUp") {
        textError.textContent = messageWithError.confirmOfPassword;
        return;
      }

      if (password.length < minLengthPassword) {
        textError.textContent = messageWithError.minLengthPassword;
        return;
      }

      if (styleSubmit === "logIn") {
        submitButton.disabled = true;

        this.#showPreloader();

        this.methodsAuth.signInWithEmailAndPassword(this.methodsAuth.auth, email, password).catch(() => {
          textError.textContent = messageWithError.wrongPasswordOrEmail;
          submitButton.disabled = false;
          this.#hidePreloader();
        });
      }

      if (styleSubmit === "signUp") {
        submitButton.disabled = true;

        this.#showPreloader();

        this.methodsAuth.createUserWithEmailAndPassword(this.methodsAuth.auth, email, password).catch(() => {
          textError.textContent = messageWithError.existingUser;
          submitButton.disabled = false;
          this.#hidePreloader();
        });
      }
    });

    modalHeaders.addEventListener("click", (event) => {
      const target = event.target;
      const valueTarget = target.dataset.value;
      const buttonLogIn = document.querySelector('.header-modal_heading__button[data-value="logIn"]');
      const buttonSignUp = document.querySelector('.header-modal_heading__button[data-value="signUp"]');

      if (valueTarget === "logIn") {
        this.#selectButtonSigUpOrLogIn(target, buttonSignUp, modalWindowLogIn());
        this.#changeWindowEnterInApp(formModalWindow, "logIn");
      }

      if (valueTarget === "signUp") {
        this.#selectButtonSigUpOrLogIn(target, buttonLogIn, modalWindowSignUp());
        this.#changeWindowEnterInApp(formModalWindow, "signUp");
      }
    });
  }
}

export default App;
