import TodoModel from "./TodoModel.js";

window.onload = async () => {

    let currentTaskIndex;

    const model = new TodoModel();

    // O teu código aqui...
    const listsContainer = document.querySelector("#lists-container");
    const todoHeader = document.querySelector("todo-header");
    todoHeader.addEventListener("clicked", () => {
        listsContainer.style.transform = "translateX(0)";
        todoHeader.state = "tasks";
        buildTasksList(model.getTasks());
    });

    
    const buildTasksList = (tasks) => {
        const tasksList = document.querySelector("#tasks");
        tasksList.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            const taskItem = new TaskItem();
            taskItem.addEventListener("clicked", () => {
                listsContainer.style.transform = "translateX(-100%)";
                todoHeader.state = "items";
                todoHeader.taskName = task.title;
                buildItemsList(task.items);
                currentTaskIndex = index;
            });
            taskItem.addEventListener("delete", () => {
                model.deleteTask(index);
                buildTasksList(model.getTasks());
            });
            taskItem.title = task.title;

            li.append(taskItem);
            tasksList.append(li);
        });

    }

    const buildItemsList = (items) => {

        const checkItemsList = document.querySelector("#items");
        checkItemsList.innerHTML = "";
        items.forEach((item, index) => {
            const li = document.createElement("li");
            const checkItem = new CheckItem();
            checkItem.addEventListener("checked", (ev) => {
                model.updateItem(currentTaskIndex, index, ev.detail.checked);
            });
            checkItem.addEventListener("delete", () => {
                model.deleteItem(currentTaskIndex, index);
                buildItemsList(model.getItems(currentTaskIndex));
            })
            checkItem.title = item.title;
            checkItem.checked = item.checked;

            li.append(checkItem);
            checkItemsList.append(li);
            
        });
    }

    buildTasksList(model.getTasks());
}
