const template = document.createElement('template');
template.innerHTML = `
    <style>
    * {
        font-family: system-ui, sans-serif;
    }
    button {
        border: none;
        outline: none;
        padding: 16px 50px;
        background: #ff5945;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        border-radius: 40px;
    }
    input {
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 50px;
        margin-right: 10px;
    }
    </style>
    <div class= "list">
        <div class="todo-container">
            <h2> To-Do List </h2>
            <div id="controls">
                <input type="text" id="input-box" placeholder="Add your task">
                <select id ="urgency-select">
                    <option value="1">Alta</option>
                    <option value="2">Média</option>
                    <option value="3">Baixa</option>
                </select>
                <button id="add">add</button>
                <h2> Tarefas Pendentes </h2>
                <ul id="pending-task-list" class="task-list"></ul>
                <h2>Tarefas Concluídas</h2>
                <ul id="completed-task-list" class="task-list"></ul>
                <button id="change">change</button>
                <button id="delete">delete</button>
            </div>
            <ul id="list-container"></ul>
        </div>
    </div>
`;

class WebToDoList extends HTMLElement {

    shadowRoot = null;
    #todoContainer = null;
    #inputBox = null;
    #listContainer = null;
    #selectedTask = null;

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({mode: 'closed'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#inputBox = this.shadowRoot.querySelector('#input-box');
        this.#listContainer = this.shadowRoot.querySelector('#list-container');

        this.shadowRoot.querySelector('#add').addEventListener('click' ,() => this.addTask());
        this.shadowRoot.querySelector('#change').addEventListener('clic' , () => this.changeTask());
        this.shadowRoot.querySelector('#delete').addEventListener('click' , () => this.deleteTask());

        this.#listContainer.addEventListener('click' , (e) => this.selectTask(e));
    }

    addTask() {
        const taskText = this.#inputBox.value.trim();
        if(taskText) {
            const li = document.createElement('li');
            li.textContent = taskText;
            this.#listContainer.appendChild(li);
            this.#inputBox.value = '';
        }
    }

    changeTask() {
        if(this.#selectedTask) {
            const taskText = this.#inputBox.value.trim();
            if(taskText) {
                this.#selectedTask.textContent = taskText;
                this.#inputBox.value = '';
                this.#selectedTask.classList.remove('selected');
                this.#selectedTask = null;
            }
        }
    }

    deleteTask() {
        if(this.#selectedTask) {
            this.#selectedTask.remove();
            this.#inputBox.value = '';
            this.#selectedTask = null;
        }
    }

    selectTask(event) {
        if (event.target.tagName === 'LI') {
            if (this.#selectedTask) {
                this.#selectedTask.classList.remove('selected');
            }
            this.#selectedTask = event.target;
            this.#selectedTask.classList.add('selected');
            this.#inputBox.value = this.#selectedTask.textContent;
        }
    }

}

customElements.define('web-todolist' , WebToDoList);