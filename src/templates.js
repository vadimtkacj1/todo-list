import starIcon from "./img/star.svg";
import calendarIcon from "./img/calendar.svg";

const modalWindowLogIn = () => {
  return `<div class="content-modal_element">
    <label for="email">Email:</label>
    <input type="email" name="email" placeholder="Enter your email address..." required />
    </div>
    <div class="content-modal_element">
    <label for="email">Password:</label>
    <input type="password" name="password" placeholder="Enter your password..." required />
    </div>
    <div class="content-modal_element content-modal-auth_error"></div>
    <input type="submit" name="buttonSubmit" class="button-submit" value="Log In" />
    <div class="modal-window_line">
    <div class="modal-window_line__line"></div>
    <div class="modal-window_line__text">or</div>
    <div class="modal-window_line__line"></div>
  </div>
  <div class="modal-window_buttons-sig-in">
    <button type="button" class="login-with-google-btn">Sign in with Google</button>
  </div>`;
};

const modalWindowSignUp = () => {
  return `<div class="content-modal_element">
    <label for="email">Email:</label>
    <input type="email" name="email" placeholder="Enter your email address..." required />
    </div>
    <div class="content-modal_element">
    <label for="password">Password:</label>
    <input type="password" name="password" placeholder="Enter your password..." required />
    </div>
    <div class="content-modal_element">
    <label for="confirmPassword">Confirm password:</label>
    <input type="password" name="confirmPassword" placeholder="Write down the password again..." required />
    </div>
    <div class="content-modal_element content-modal-auth_error"></div>
    <input type="submit" name="buttonSubmit" class="button-submit" value="Create an account" />
    <div class="modal-window_line">
    <div class="modal-window_line__line"></div>
    <div class="modal-window_line__text">or</div>
    <div class="modal-window_line__line"></div>
  </div>
  <div class="modal-window_buttons-sig-in">
    <button type="button" class="login-with-google-btn">Sign in with Google</button>
  </div>`;
};

const popUpMenuAccount = () => {
  return `<div class="pop-up-user pop-up-menu">
  <div class="pop-up-user_buttons">
  <div class="pop-up-user-buttons_button pop-up-user-account button-open-modal-window">
    <span class="material-symbols-outlined"> account_circle </span>
    <div class="pop-up-user_button__text">Account</div>
  </div>
  <div class="pop-up-user-buttons_button pop-up-user-sign-out button-open-modal-window">
    <span class="material-symbols-outlined"> logout </span>
    <div class="pop-up-user_button__text">Sign out</div>
  </div>
</div>
</div>`;
};

const popUpMenuSort = () => {
  return `<div class="pop-up-menu-tasks pop-up-menu"><div class="pop-up-menu-tasks_heading">The sort order</div>
  <div class="pop-up-menu-tasks_buttons sort-pop-up-menu-tasks_buttons">
    <div class="pop-up-menu-tasks_button sort-pop-up-menu-tasks_button" data-value="importanceSort">
    <img src="${starIcon}" alt="star">
      <div class="sort-pop-up-menu-tasks_button__text sort-pop-up-menu-tasks_button__text">Importance</div>
    </div>
    <div class="pop-up-menu-tasks_button sort-pop-up-menu-tasks_button" data-value="dateSort">
    <img src="${calendarIcon}" alt="calendar">
      <div class="sort-pop-up-menu-tasks_button__text sort-pop-up-menu-tasks_button__text">Due date</div>
    </div>
  </div>
  </div>`;
};

const popUpMenuFilter = () => {
  return `<div class="pop-up-menu-tasks pop-up-menu"><div class="pop-up-menu-tasks_heading">Filter</div>
  <div class="pop-up-menu-tasks_buttons filter-pop-up-menu-tasks_buttons">
    <div class="pop-up-menu-tasks_button filter-pop-up-menu-tasks_button" data-value="importanceFilter">
    <img src="${starIcon}" alt="star">
      <div class="sort-pop-up-menu-tasks_button__text filter-pop-up-menu-tasks_button__text">Importance</div>
    </div>
    <div class="pop-up-menu-tasks_button filter-pop-up-menu-tasks_button" data-value="dateFilter">
    <img src="${calendarIcon}" alt="calendar">
      <div class="sort-pop-up-menu-tasks_button__text filter-pop-up-menu-tasks_button__text">Due date</div>
    </div>
  </div>
  </div>`;
};

const modalWindowAddProject = () => {
  return `<div class="modal-window_header" id="modal-window_header-task__add" data-color="#008000" style="border-bottom: 5px solid #008000">
  <span class="header-modal_heading">New project</span>
  <span class="material-symbols-outlined projects_button__icon button-hiding-modal-window">add</span>
</div>
<form action="#" class="modal-window_content" id="modal-window_add-project">
  <div class="content-modal_element">
    <label for="nameProject">Name:</label>
    <input type="text" name="nameProject" placeholder="Project name" required />
  </div>
  <div class="content-modal_element">
    <label for="colorProject">Color:</label>
    <div class="content-modal_element__color">
      <input type="color" name="colorProject" class="colorProject" value="#008000" />
    </div>
  </div>
  <input type="submit" name="buttonSubmit" class="button-submit" value="Submit" />
</form>`;
};

const modalWindowDeleteProject = () => {
  return `<div class="modal-window_header">
  <span class="header-modal_heading">Delete project</span>
  <span class="material-symbols-outlined projects_button__icon button-hiding-modal-window">add</span>
</div>
<form action="#" class="modal-window_content" id="modal-window_delete-project">
  <div class="content-modal_element">
    <label>Are you sure you want to delete the project?</label>
  </div>
  <div class="buttons-project-submit">
    <input type="submit" name="buttonYes" class="button-submit button-project-submit" value="Yes" />
    <input type="submit" name="buttonNo" class="button-submit button-project-submit" value="No" />
  </div>
</form>`;
};

const modalWindowDeleteAccount = () => {
  return `<div class="modal-window_header">
  <span class="header-modal_heading">Delete account</span>
  <span class="material-symbols-outlined projects_button__icon button-hiding-modal-window">add</span>
</div>
<form action="#" class="modal-window_content" id="modal-window_delete-account">
  <div class="content-modal_element">
    <label>Are you sure you want to delete the account?</label>
  </div>
  <div class="buttons-project-submit">
    <input type="submit" name="buttonYes" class="button-submit button-project-submit" value="Yes" />
    <input type="submit" name="buttonNo" class="button-submit button-project-submit" value="No" />
  </div>
</form>`;
};

const modalWindowSignOut = () => {
  return `<div class="modal-window_header">
  <span class="header-modal_heading">Sign out</span>
  <span class="material-symbols-outlined projects_button__icon button-hiding-modal-window">add</span>
</div>
<form action="#" class="modal-window_content" id="modal-window_sign-out">
  <div class="content-modal_element">
    <label>Are you sure you want to sign out?</label>
  </div>
  <div class="buttons-project-submit">
    <input type="submit" name="buttonYes" class="button-submit button-project-submit" value="Yes" />
    <input type="submit" name="buttonNo" class="button-submit button-project-submit" value="No" />
  </div>
</form>`;
};

const modalWindowAddTask = () => {
  return `<div class="modal-window_header" style="border-bottom: 5px solid green;" data-color="green">
  <span class="header-modal_heading">New Task</span>
  <span class="material-symbols-outlined projects_button__icon button-hiding-modal-window">add</span>
</div>
<form action="#" class="modal-window_content" id="modal-window_add-task">
  <div class="content-modal_element">
    <label for="nameTask">Name task:</label>
    <input type="text" name="nameTask" placeholder="Task name" required />
  </div>
  <div class="content-modal_element">
    <label for="dueDate">Due date:</label>
    <input type="date" name="dueDate" />
  </div>
  <div class="content-modal_element">
    <label for="priority">Priority:</label>
    <select name="priority" class="priority">
      <option value="low" checked>Low</option>
      <option value="medium">Medium</option>
      <option value="hight">Hight</option>
    </select>
  </div>
  <div class="content-modal_element">
    <label for="priority">Description:</label>
    <textarea name="description" class="description" placeholder="Description"></textarea>
  </div>
  <input type="submit" name="buttonSubmit" class="button-submit button-project-submit" value="Submit" />
</form>`;
};

const modalWindowEditProject = (params) => {
  const { colorProject, name } = params;

  return `<div class="modal-window_header" id="modal-window_header-project__edit" data-color="#008000" style="border-bottom: 5px solid ${colorProject}">
<span class="header-modal_heading">Edit project</span>
<span class="material-symbols-outlined projects_button__icon button-hiding-modal-window">add</span>
</div>
<form action="#" class="modal-window_content" id="modal-window_edit-project">
<div class="content-modal_element">
  <label for="nameProject">Name:</label>
  <input type="text" name="nameProject" value="${name}" placeholder="Project name" required />
</div>
<div class="content-modal_element">
  <label for="colorProject">Color:</label>
  <div class="content-modal_element__color">
    <input type="color" name="colorProject" class="colorProject" value="#008000" />
  </div>
</div>
<div class="buttons-project-submit">
  <input type="submit" name="buttonEdit" class="button-submit button-project-submit" value="Edit" />
  <input type="submit" name="buttonDelete" class="button-submit button-project-submit" value="Delete" />
</div>
</form>`;
};

const modalWindowAccount = (email) => {
  return `<div class="modal-window_header">
  <span class="header-modal_heading">Account</span>
  <span class="material-symbols-outlined projects_button__icon button-hiding-modal-window">add</span>
</div>
<form class="modal-window_content" id="modal-window_account">
  <div class="content-modal_element">
    <div class="content-modal-account_element__heading">Email:</div>
    <div class="content-modal-account_element__value">${email}</div>
  </div>
  <input type="submit" name="buttonDelete" class="button-submit button-project-submit" value="Delete account" />
</form>`;
};

const modalWindowExistProject = () => {
  return `<div class="modal-window_header">
  <span class="header-modal_heading">The project exists
  </span>
  <span class="material-symbols-outlined projects_button__icon button-hiding-modal-window">add</span>
</div>
<form action="#" class="modal-window_content" id="modal-window_delete-project">
  <div class="content-modal_element content-modal_element__message">
    <label>There is already such a project</label>
  </div>
</form>`;
};

const modalWindowInfoTask = (params) => {
  const { title, dueDate, priority, description } = params;

  return `<div class="modal-window_header">
  <span class="header-modal_heading">Info Task</span>
  <span class="material-symbols-outlined projects_button__icon button-hiding-modal-window">add</span>
</div>
<div class="modal-window_content" id="modal-window_info-task">
  <div class="content-modal_element content-modal-info_element">
    <span class="content-modal-info_element__heading">Name task:</span>
    <span class="content-modal-info_element__value" id="content-modal-info_nameTask">${title}</span>
  </div>
  <div class="content-modal_element content-modal-info_element">
    <span class="content-modal-info_element__heading">Due date:</span>
    <span class="content-modal-info_element__value" id="content-modal-info_dueDate">${dueDate}</span>
  </div>
  <div class="content-modal_element content-modal-info_element">
    <span class="content-modal-info_element__heading">Priority:</span>
    <span class="content-modal-info_element__value" id="content-modal-info_priority">${priority}</span>
  </div>
  <div class="content-modal_element content-modal-info_element">
    <span class="content-modal-info_element__heading">Description:</span>
    <span class="content-modal-info_element__value" id="content-modal-info_description">${description}</span>
  </div>
</div>`;
};

const modalWindowEditTask = (params) => {
  const { title, dueDate, priority, description, color } = params;

  const prioritySelected = (namePriority) => (priority === namePriority ? "selected" : "");

  return `<div class="modal-window_header" id="modal-window_header-task__edit" style="border-bottom: 5px solid ${color}">
  <span class="header-modal_heading">Edit Task</span>
  <span class="material-symbols-outlined projects_button__icon button-hiding-modal-window">add</span>
</div>
<form action="#" class="modal-window_content" id="modal-window_edit-task">
  <div class="content-modal_element">
    <label for="nameTask">Name task:</label> <input type="text" value="${title}" required name="nameTask" placeholder="Task name" />
  </div>
  <div class="content-modal_element">
    <label for="dueDate">Due date:</label> <input type="date" value="${dueDate}" name="dueDate" />
  </div>
  <div class="content-modal_element">
    <label for="priority">Priority:</label>
    <select name="priority" name="${priority}" class="priority">
      <option value="low" ${prioritySelected("low")}>Low</option>
      <option value="medium" ${prioritySelected("medium")}>Medium</option>
      <option value="hight" ${prioritySelected("hight")}>Hight</option>
    </select>
  </div>
  <div class="content-modal_element">
    <label for="priority">Description:</label><textarea name="description" class="description" placeholder="Description">${description}</textarea>
  </div>
  <input type="submit" name="buttonEdit" class="button-submit button-project-submit" value="Edit" />
</form>`;
};

export {
  modalWindowLogIn,
  modalWindowSignUp,
  popUpMenuSort,
  popUpMenuFilter,
  modalWindowAddProject,
  modalWindowAddTask,
  modalWindowEditProject,
  modalWindowDeleteProject,
  modalWindowInfoTask,
  modalWindowEditTask,
  modalWindowSignOut,
  modalWindowAccount,
  modalWindowDeleteAccount,
  popUpMenuAccount,
  modalWindowExistProject,
};
