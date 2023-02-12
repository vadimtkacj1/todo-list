import ListTasks from "./ListTasks.js";
import { project } from "./project/template/project.js";

class Project {
  constructor(name, colorProject, isStaticProject = false, hasProjectButtonAddTask = true) {
    this.name = name;
    this.colorProject = colorProject;
    this.isStaticProject = isStaticProject;
    this.hasProjectButtonAddTask = hasProjectButtonAddTask;
    this.listOfTasks = new ListTasks(document.querySelector(".list-tasks"));
  }

  createElement() {
    const params = {
      name: this.name,
      colorProject: this.colorProject,
    };

    const projectTemplate = project(params);
    return projectTemplate;
  }

  static createStaticProjects = (staticProjects) => {
    const arrayStaticProjects = [];

    staticProjects.forEach((element) => {
      const valueElement = element.textContent;
      const buttonNav = element.closest(".button-nav");
      const hasProjectButtonAddTask = buttonNav.dataset.buttonAddTask;
      const createStaticProject = new Project(valueElement, "", true, Boolean(hasProjectButtonAddTask));

      arrayStaticProjects.push(createStaticProject);
    });

    return arrayStaticProjects;
  };
}

export default Project;
