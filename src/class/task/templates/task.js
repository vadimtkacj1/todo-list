const task = (params) => {
  const { isCompleted, priority, title, projectName, dueDate, description, hasProjectButtonAddTask, index } = params;
  const completedClassName = isCompleted ? "checked" : "";
  const resultProjectName = projectName ? `( ${projectName} )` : "";
  const dueDateValue = dueDate || "No date";
  const priorityClassName = `list-tasks_task__${priority}`;
  const hideButton = hasProjectButtonAddTask ? "flex" : "none";

  return `<div class="cl-ms-12 list-tasks_task ${completedClassName} ${priorityClassName}" data-index="${index}">
  <div class="list-tasks_task__main-content">
    <label class="list-tasks_checkbox">
      <input type="checkbox" name="checkboxTask" class="list-tasks_task__checkboxTask" ${completedClassName} />
      <span class="list-tasks_task__title">${title} ${resultProjectName}</span>
    </label>
    <div class="list-tasks_task__dueDate" data-value="${dueDate}">${dueDateValue}</div>
    <span class="material-symbols-outlined list-tasks_task__info list-tasks_task__button button-open-modal-window">info</span>
    <span class="material-symbols-outlined list-tasks_task__edit list-tasks_task__button button-open-modal-window" style="display: ${hideButton};">edit</span>
    <span class="wrapper-list-tasks_task__close list-tasks_task__button" style="display: ${hideButton};">
      <span class="material-symbols-outlined list-tasks_task__close">close</span>
    </span>
    </div>
    <span class="list-tasks_task__description">${description}</span>
    </div>`;
};

export { task };
