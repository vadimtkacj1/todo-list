import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { resetModalWindow } from "./modalWindow.js";
import ListProjects from "./class/ListProjects.js";
import Project from "./class/Project.js";
import preloader from "./preloader.js";
import { enterInApp, selectButtonSigUpOrLogIn } from "./authentication.js";

const formSignUpOrLoginIn = document.querySelector(".modal-window_log-in-or-sign-up");
const textError = document.querySelector(".log-in-or-sign-up_element__error");
const elementsOfStaticProjects = document.querySelectorAll(".static-projects_element");
const modalHeaders = document.querySelector(".modal-window_headers-modal");

formSignUpOrLoginIn.addEventListener("submit", (event) => {
  event.preventDefault();

  const auth = getAuth();
  const styleSubmit = formSignUpOrLoginIn.dataset.styleSubmit;
  const email = formSignUpOrLoginIn.email.value;
  const password = formSignUpOrLoginIn.password.value;
  const submitButton = formSignUpOrLoginIn.buttonSubmit;
  const messageAboutMinLengthPassword = "Password length at least 6 characters";
  const messageAboutWrongPasswordOrEmail = "Your email and password does not match. Please try again.";
  const messageAboutExistingUser = "Already have an account with this email address";

  textError.textContent = "";

  if (password.length < 6) {
    textError.textContent = messageAboutMinLengthPassword;
    return;
  }

  if (styleSubmit === "logIn") {
    submitButton.disabled = true;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (data) => {
        const idUser = data.user.uid;
        const projects = await ListProjects.findProjectUser(idUser);
        const projectsValue = await projects.json();
        enterInApp(projectsValue, idUser);
      })
      .catch(() => {
        textError.textContent = messageAboutWrongPasswordOrEmail;
        submitButton.disabled = false;
      });
  }

  if (styleSubmit === "signUp") {
    submitButton.disabled = true;

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        const idUser = data.user.uid;
        const arrayListProjetcs = Project.createStaticProjects(elementsOfStaticProjects);
        enterInApp(arrayListProjetcs, idUser);
      })
      .catch(() => {
        textError.textContent = messageAboutExistingUser;
        submitButton.disabled = false;
      });
  }
});

modalHeaders.addEventListener("click", function (event) {
  const target = event.target;
  const valueTarget = target.dataset.value;
  const buttonLogIn = document.querySelector('.header-modal_heading__button[data-value="logIn"]');
  const buttonSignUp = document.querySelector('.header-modal_heading__button[data-value="signUp"]');
  const logIn = "logIn";
  const signUp = "signUp";

  if (valueTarget === logIn) {
    selectButtonSigUpOrLogIn(target, buttonSignUp, "Log In");
    resetModalWindow(formSignUpOrLoginIn);
    formSignUpOrLoginIn.dataset.styleSubmit = logIn;
     textError.textContent = "";
  }

  if (valueTarget === signUp) {
    selectButtonSigUpOrLogIn(target, buttonLogIn, "Create an account");
    resetModalWindow(formSignUpOrLoginIn);
    formSignUpOrLoginIn.dataset.styleSubmit = signUp;
     textError.textContent = "";
  }
});

preloader().then(() => {
  const preloaderElement = document.querySelector(".preloader");
  preloaderElement.style.opacity = "0";
  setTimeout(() => preloaderElement.remove(), 600);
});
