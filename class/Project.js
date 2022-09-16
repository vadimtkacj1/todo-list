class Project {
  constructor(name, staticProject = false, checkAddButton = "1") {
    this.name = name;
    this.staticProject = staticProject;
    this.checkAddButton = checkAddButton;
    this.tasks = [];
    this.listOfTasks = null;
  }

  createElement() {
    const template = `<div class="list-projects_project button-nav">
          <span class="material-symbols-outlined list-projects_project__icon">format_list_bulleted</span>
          <span class="list-projects_project__text">${this.name}</span>
          <span class="wrapper-list-projects_project__close"> 
          <span class="material-symbols-outlined list-projects_project__close">close</span>
          </span>
        </div>`;

    return template;
  }

  static createStaticProjects = (staticProjects) => {
    const arrayStaticProjects = [];

    staticProjects.forEach((element) => {
      const valueElement = element.textContent;
      const buttonNav = element.closest(".button-nav");
      const valueAddButton = buttonNav.dataset.addButton;
      const createStaticProject = new Project(valueElement, true, valueAddButton);

      arrayStaticProjects.push(createStaticProject);
    });

    return arrayStaticProjects;
  };
}

export default Project;
