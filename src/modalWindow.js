const hideModalWindow = (modalWindow) => {
  const wrapperModalWindow = modalWindow.parentElement;
  modalWindow.style.top = "-100%";
  wrapperModalWindow.style.visibility = "hidden";
};

const showModalWindow = (modalWindow) => {
  const wrapperModalWindow = modalWindow.parentElement;
  modalWindow.style.top = "0%";
  wrapperModalWindow.style.visibility = "visible";
};

export { hideModalWindow, showModalWindow };
