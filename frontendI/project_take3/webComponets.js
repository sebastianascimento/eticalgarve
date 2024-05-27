const taskTemplate = document.createElement("template");
taskTemplate.innerHTML = `
<style>
  .task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em;
    border-bottom: 1px solid #ccc;
  }
  .task-item.completed .task-name {
    text-decoration: line-through;
  }
  .task-name, .urgency {
    flex: 1;
  }
  .task-toggle, .remove-task, .change-task, .save-task {
    margin-left: 1em;
    padding: 10px 15px;
    background: #ff5945;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    border-radius: 40px;
    border: none;
    outline: none;
    flex-shrink: 0;
  }
  .edit-input {
    display: none;
    flex: 1;
    margin-right: 1em;
  }
  .task-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5em;
  }


  @media (max-width: 768px) {
    .task-item {
      flex-direction: column;
      align-items: center;
    }
    .task-name, .urgency {
      width: 100%;
      text-align: center;
      margin-bottom: 0.5em;
    }
    .task-buttons {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .task-buttons button {
      width: 60%;
      margin: 0.5em auto;
      padding: 8px 10px;
      font-size: 12px;
    }
  }
  @media (max-width: 480px) {
    .task-buttons button {
      width: 50%;
      margin: 0.5em auto;
      padding: 8px 10px;
      font-size: 12px;
    }
  }
</style>
<li class="task-item">
  <span class="task-name"></span>
  <span class="urgency"></span>
  <input type="text" class="edit-input" placeholder="Add new name">
  <div class="task-buttons">
    <button class="task-toggle">Complete</button>
    <button class="change-task">Change</button>
    <button class="remove-task">Remove</button>
    <button class="save-task" style="display: none;">Save</button>
  </div>
</li>
`;

const templateToDo = document.createElement("template");
templateToDo.innerHTML = `
<style>
* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
}

.container {
    width: 100%;
    min-height: 100vh;
    padding: 10px;
    background: linear-gradient(135deg, #153677, #4e085f);
    display: flex;
    justify-content: center;
    align-items: center;
}

.todo-app {
    width: 100%;
    max-width: 840px;
    background-color: #fff;
    margin: 100px auto 20px;
    padding: 40px 30px 70px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.todo-app h1,
.todo-app h2 {
    color: #002765;
    font-size: 24px;
}

.row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #edeef0;
    border-radius: 30px;
    padding-left: 10px;
}

input[type="text"],
select {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    padding: 15px 20px;
    font-size: 16px;
    border-radius: 40px;
    margin-right: 10px;
}

button {
    border: none;
    outline: none;
    padding: 15px 25px;
    background: #ff5945;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    border-radius: 40px;
}

select#urgency-select {
    width: 50%;
    margin: 0.5em auto;
    padding: 8px 20px;
    font-size: 16px;
    background-color: #4e085f; 
    color: #fff; 
    border: none;
    border-radius: 20px;
    appearance: none; 
    background-image: url('data:image/svg+xml;utf8,<svg fill="%23FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'); /* Adiciona uma seta como plano de fundo */
    background-repeat: no-repeat;
    background-position: right 10px center;
}

#view-tasks-button {
    background: #4e085f;
}

.task-list {
    list-style: none;
    padding: 0;
    width: 100%;
}

.task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em;
    border-bottom: 1px solid #ccc;
}

.task-item.completed .task-name {
    text-decoration: line-through;
}

.task-name,
.urgency {
    flex: 1;
}

.task-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5em;
}

.edit-input {
    display: none;
    flex: 1;
    margin-right: 1em;
}

@media (max-width: 768px) {
    .todo-app {
        padding: 20px;
    }

    .row {
        flex-direction: column;
        gap: 10px;
    }

    .task-item {
        flex-direction: column;
        align-items: center;
    }

    .task-name, .urgency {
        width: 100%;
        text-align: center;
        margin-bottom: 0.5em;
    }


    .task-buttons {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .task-buttons button {
      width: 60%;
      margin: 0.5em auto;
      padding: 8px 10px;
      font-size: 12px;
    }

    select#urgency-select {
        width: 50%;
        margin: 0.5em auto;
        padding: 8px 10px;
        font-size: 16px;
        background-color: #4e085f; 
        color: #fff; 
        border: none;
        border-radius: 5px;
        appearance: none;
        background-image: url('data:image/svg+xml;utf8,<svg fill="%23FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'); /* Adiciona uma seta como plano de fundo */
        background-repeat: no-repeat;
        background-position: right 10px center;
    }
}

@media (max-width: 480px) {
    .row {
        flex-direction: column;
        gap: 10px;
    }

    input[type="text"],
    select {
        width: 100%;
        margin-right: 0;
    }

    .task-item {
        flex-direction: column;
        align-items: center;
    }

    .task-buttons {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .task-buttons button {
      width: 50%;
      margin: 0.5em auto;
      padding: 8px 10px;
      font-size: 12px;
    }

    select#urgency-select {
        width: 50%;
        margin: 0.5em auto;
        padding: 8px 10px;
        font-size: 12px;
        background-color: #4e085f; /* Cor para o select */
        color: #fff; 
        border: none;
        border-radius: 5px;
        appearance: none; 
        background-image: url('data:image/svg+xml;utf8,<svg fill="%23FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'); /* Adiciona uma seta como plano de fundo */
        background-repeat: no-repeat;
        background-position: right 10px center;
    }
}
</style>
<div class="container">
  <div class="todo-app">
    <h1>To-Do List</h1>
    <div class="row">
      <input type="text" placeholder="Add new task" id="new-task-input">
      <select id="urgency-select">
        <option value="1">Alta</option>
        <option value="2">Média</option>
        <option value="3">Baixa</option>
      </select>
      <button id="add-task-button">Add</button>
      <button id="view-tasks-button">View</button>
    </div>
    <h2 id="pending-tasks-title" style="display:none;">Pending Tasks</h2>
    <ul id="pending-task-list" class="task-list" style="display:none;"></ul>
    <h2 id="completed-tasks-title" style="display:none;">Completed Tasks</h2>
    <ul id="completed-task-list" class="task-list" style="display:none;"></ul>
  </div>
</div>
`;

class ToDoList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.pendingTasks = [];
        this.completedTasks = [];
        this.shadowRoot.appendChild(templateToDo.content.cloneNode(true));
        this.shadowRoot.querySelector('#add-task-button').onclick = () => this.addTask();
        this.shadowRoot.querySelector('#view-tasks-button').onclick = () => this.toggleViewTasks();
        this.loadTasks();
    }

    getPendingTasks() {
        return this.pendingTasks;
    }
    
    setPendingTasks(tasks) {
        this.pendingTasks = tasks;
        this.saveTasks();
        this.renderTasks();
    }
    
    getCompletedTasks() {
        return this.completedTasks;
    }
    
    setCompletedTasks(tasks) {
        this.completedTasks = tasks;
        this.saveTasks();
        this.renderTasks();
    }
    
    async loadTasks() {
        try {
            const storedData = localStorage.getItem('tasksData');
            if (storedData) {
                const data = JSON.parse(storedData);
                this.pendingTasks = data.pendingTasks || [];
                this.completedTasks = data.completedTasks || [];
            }
            this.renderTasks();
        } catch (error) {
            console.error('Erro ao carregar as tarefas:', error);
            this.pendingTasks = [];
            this.completedTasks = [];
            this.renderTasks();
        }
    }
    
    async saveTasks() {
        const data = {
            pendingTasks: this.pendingTasks,
            completedTasks: this.completedTasks
        };
        try {
            localStorage.setItem('tasksData', JSON.stringify(data));
        } catch (error) {
            console.error('Erro ao salvar as tarefas:', error);
        }
    }

    addTask() {
        const input = this.shadowRoot.querySelector('#new-task-input');
        const taskName = input.value.trim();
        const urgencySelect = this.shadowRoot.querySelector('#urgency-select');
        const urgency = parseInt(urgencySelect.value);

        if (taskName) {
            this.pendingTasks.push({ name: taskName, completed: false, urgency: urgency });
            this.pendingTasks.sort((a, b) => a.urgency - b.urgency);
            this.saveTasks();
            this.renderTasks();
            input.value = '';
        }

        this.showTaskSections();
    }

    toggleViewTasks() {
        const pendingTasksTitle = this.shadowRoot.querySelector('#pending-tasks-title');
        const pendingTaskList = this.shadowRoot.querySelector('#pending-task-list');
        const completedTasksTitle = this.shadowRoot.querySelector('#completed-tasks-title');
        const completedTaskList = this.shadowRoot.querySelector('#completed-task-list');
        
        const isPendingVisible = pendingTaskList.style.display === 'block';
        const isCompletedVisible = completedTaskList.style.display === 'block';

        if (isPendingVisible || isCompletedVisible) {
            pendingTasksTitle.style.display = 'none';
            pendingTaskList.style.display = 'none';
            completedTasksTitle.style.display = 'none';
            completedTaskList.style.display = 'none';
        } else {
            this.showTaskSections();
        }
    }

    showTaskSections() {
        const pendingTasksTitle = this.shadowRoot.querySelector('#pending-tasks-title');
        const pendingTaskList = this.shadowRoot.querySelector('#pending-task-list');
        const completedTasksTitle = this.shadowRoot.querySelector('#completed-tasks-title');
        const completedTaskList = this.shadowRoot.querySelector('#completed-task-list');

        if (this.pendingTasks.length > 0) {
            pendingTasksTitle.style.display = 'block';
            pendingTaskList.style.display = 'block';
        } else {
            pendingTasksTitle.style.display = 'none';
            pendingTaskList.style.display = 'none';
        }

        if (this.completedTasks.length > 0) {
            completedTasksTitle.style.display = 'block';
            completedTaskList.style.display = 'block';
        } else {
            completedTasksTitle.style.display = 'none';
            completedTaskList.style.display = 'none';
        }
    }

    removeTask(index, list) {
        list.splice(index, 1);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskCompletion(index, list, targetList) {
        const task = list.splice(index, 1)[0];
        task.completed = !task.completed;
        targetList.push(task);
        targetList.sort((a, b) => a.urgency - b.urgency);
        this.saveTasks();
        this.renderTasks();
    }

    changeTask(index, list) {
        const taskItems = this.shadowRoot.querySelectorAll('.task-item');
        const taskItem = taskItems[index];
        const taskNameSpan = taskItem.querySelector('.task-name');
        const editInput = taskItem.querySelector('.edit-input');
        const saveButton = taskItem.querySelector('.save-task');
        const changeButton = taskItem.querySelector('.change-task');

        taskNameSpan.style.display = 'none';
        editInput.style.display = 'block';
        saveButton.style.display = 'inline-block';
        changeButton.style.display = 'none';

        editInput.value = '';

        saveButton.onclick = () => {
            const newTaskName = editInput.value.trim();
            if (newTaskName) {
                list[index].name = newTaskName;
                this.saveTasks();
                this.renderTasks();
            }
        };
    }

    renderTasks() {
        const pendingTaskList = this.shadowRoot.querySelector('#pending-task-list');
        const completedTaskList = this.shadowRoot.querySelector('#completed-task-list');
        pendingTaskList.innerHTML = '';
        completedTaskList.innerHTML = '';

        this.pendingTasks.forEach((task, index) => {
            const clone = taskTemplate.content.cloneNode(true);

            const taskItem = clone.querySelector('.task-item');

            const taskName = clone.querySelector('.task-name');
            taskName.textContent = task.name;

            const editInput = clone.querySelector('.edit-input');
            const saveButton = clone.querySelector('.save-task');

            const urgency = clone.querySelector('.urgency');
            urgency.textContent = `Urgência: ${task.urgency}`;

            const taskToggle = clone.querySelector('.task-toggle');
            taskToggle.textContent = 'Completar';
            taskToggle.onclick = () => this.toggleTaskCompletion(index, this.pendingTasks, this.completedTasks);

            const removeButton = clone.querySelector('.remove-task');
            removeButton.onclick = (e) => {
                e.stopPropagation();
                this.removeTask(index, this.pendingTasks);
            };

            const changeButton = clone.querySelector('.change-task');
            changeButton.onclick = () => this.changeTask(index, this.pendingTasks);

            pendingTaskList.appendChild(clone);
        });

        this.completedTasks.forEach((task, index) => {
            const clone = taskTemplate.content.cloneNode(true);

            const taskItem = clone.querySelector('.task-item');
            taskItem.classList.add('completed');

            const taskName = clone.querySelector('.task-name');
            taskName.textContent = task.name;

            const editInput = clone.querySelector('.edit-input');
            const saveButton = clone.querySelector('.save-task');

            const urgency = clone.querySelector('.urgency');
            urgency.textContent = `Urgência: ${task.urgency}`;

            const taskToggle = clone.querySelector('.task-toggle');
            taskToggle.textContent = 'Desmarcar';
            taskToggle.onclick = () => this.toggleTaskCompletion(index, this.completedTasks, this.pendingTasks);

            const removeButton = clone.querySelector('.remove-task');
            removeButton.onclick = (e) => {
                e.stopPropagation();
                this.removeTask(index, this.completedTasks);
            };

            const changeButton = clone.querySelector('.change-task');
            changeButton.onclick = () => this.changeTask(index, this.completedTasks);

            completedTaskList.appendChild(clone);
        });
    }
}
customElements.define('to-do-list', ToDoList);
