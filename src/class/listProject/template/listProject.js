const countCompletedTasks = (countTasks) => {
  return `<span class="button-projects_amount-wrapper"><span class="button-projects_amount">${countTasks}</span></span>`;
};

const buttonAddTask = () => {
  return `<div class="task_button button-nav button-add button-open-modal-window">
    <span class="material-symbols-outlined task_button__icon button-nav_icon">add</span>
    <span class="task_button__text">Add task</span>
    </div>`;
};

export { countCompletedTasks, buttonAddTask };
