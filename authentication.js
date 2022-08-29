import { hideModalWindow } from "./modalWindow.js";
import ListProjects from "./class/ListProjects.js";
import startApp from "./startApp.js";

const formSignUpOrLoginIn = document.querySelector(".modal-window_log-in-or-sign-up");
const wrapperModalLogInOrSignUp = document.querySelector(".log-in-or-sign-up-modal");
const listProjectsElement = document.querySelector(".projects_list-projects");
const modalLogInOrSignUp = wrapperModalLogInOrSignUp.lastElementChild;

const selectButtonSigUpOrLogIn = (selectElement, prevSelectElement, valueButton) => {
  const buttonFormSignUpOrLoginIn = formSignUpOrLoginIn.buttonSubmit;
  selectElement.classList.add("header-modal_heading__button-active");
  prevSelectElement.classList.remove("header-modal_heading__button-active");
  buttonFormSignUpOrLoginIn.outerHTML = `<input type="submit" name="buttonSubmit" class="button-submit" value="${valueButton}" />`;
};

const enterInApp = (projectsValue, idUser) => {
  localStorage.setItem("id", idUser);
  const getListProjects = new ListProjects(listProjectsElement, projectsValue);
  startApp(getListProjects);
  hideModalWindow(wrapperModalLogInOrSignUp, modalLogInOrSignUp);
};

export { selectButtonSigUpOrLogIn, enterInApp };
