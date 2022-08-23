const hideModalWindow = (wrapperModalWindow, modalWindow) => {
  modalWindow.style.top = "-100%";
  wrapperModalWindow.style.visibility = "hidden";
};

const showModalWindows = (wrapperModalWindow, modalWindow) => {
  modalWindow.style.top = "10%";
  wrapperModalWindow.style.visibility = "visible";
};

const resetModalWindow = (formModalWindow) => {
  const elementsOfFormModalWindow = Array.from(formModalWindow.elements);
  elementsOfFormModalWindow.forEach((elementOfForm) => {
    const nameElementOfForm = elementOfForm.name;
    const typeElementOfForm = elementOfForm.type;

    if (nameElementOfForm === "priority") {
      elementOfForm.value = "low";
      return;
    }

    if (typeElementOfForm === "submit") return;

    elementOfForm.value = "";
  });
};

export { hideModalWindow, showModalWindows, resetModalWindow };
