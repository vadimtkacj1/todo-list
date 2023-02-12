const parametersTasksTemplate = (text) => {
  return `
    <span class="parameters-tasks_text">${text[0]} ${text[1]}</span>
    <span class="parameters-tasks_wrapper-remove">
      <span class="material-symbols-outlined parameters-tasks_remove">close</span>
    </span>`;
};

export default parametersTasksTemplate;
