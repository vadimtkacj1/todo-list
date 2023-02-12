const staticProjectToday = (tasksOfProject, project) => {
  const listOfTasks = project.listOfTasks;
  const tasksProject = Array.from(listOfTasks.dataAboutList);

  if (!project.hasProjectButtonAddTask) return tasksOfProject;

  tasksProject.forEach((task) => {
    const dateNow = new Date();
    const editDateOfTaskInDate = Date.parse(task.dueDate);
    const dateTask = new Date(editDateOfTaskInDate);

    if (dateNow.getFullYear() !== dateTask.getFullYear()) return;

    if (dateNow.getMonth() !== dateTask.getMonth()) return;

    if (dateNow.getDate() !== dateTask.getDate()) return;

    const taskSuitable = JSON.parse(JSON.stringify(task));
    taskSuitable.nameProject = project.name;
    tasksOfProject.push(taskSuitable);
  });
  return tasksOfProject;
};

const staticProjectThisWeek = (tasksOfProject, project) => {
  const listOfTasks = project.listOfTasks;
  const tasksProject = Array.from(listOfTasks.dataAboutList);

  if (!project.hasProjectButtonAddTask) return tasksOfProject;

  tasksProject.forEach((task) => {
    const dateNow = new Date();
    const editDateOfTaskInDate = Date.parse(task.dueDate);
    const dateTask = new Date(editDateOfTaskInDate);

    dateNow.setHours(0, 0, 0, 0);
    dateTask.setHours(0, 0, 0, 0);

    if (dateNow.getFullYear() !== dateTask.getFullYear()) return;

    const dayNow = dateNow.getDay() === 0 ? 7 : dateNow.getDay();
    if (dateTask - dateNow > 604800000 - dayNow * 86400000 || dateTask - dateNow < 0) return;

    const taskSuitable = JSON.parse(JSON.stringify(task));
    taskSuitable.nameProject = project.name;
    tasksOfProject.push(taskSuitable);
  });
  return tasksOfProject;
};

const projectsWithoutButtonAdd = [
  { nameProject: "Today", callback: staticProjectToday },
  { nameProject: "This week", callback: staticProjectThisWeek },
];

export default projectsWithoutButtonAdd;
