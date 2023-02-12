const project = (params) => {
  const { name, colorProject } = params;
  return `<div class="list-projects_project button-nav" style="border-left: 3px solid ${colorProject};">
    <span class="list-projects_project__text">${name}</span>
  </div>`;
};

export { project };
