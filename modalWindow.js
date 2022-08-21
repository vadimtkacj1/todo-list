const hideModalWindow = (wrapperModalWindow, modalWindow) => {
  modalWindow.style.top = "-100%";
  wrapperModalWindow.style.visibility = "hidden";
};

const showModalWindows = (wrapperModalWindow, modalWindow) => {
  modalWindow.style.top = "10%";
  wrapperModalWindow.style.visibility = "visible";
};

export { hideModalWindow, showModalWindows };
