document.addEventListener("DOMContentLoaded", function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const taskForm = document.getElementById("task-form");
  const todoList = document.getElementById("todo-list");
  const doneList = document.getElementById("done-list");

  renderTasks();

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskInput = document.getElementById("task-input");
    const priorityInput = document.getElementById("priority-input");

    const task = {
      id: Date.now(),
      task: taskInput.value,
      priority: priorityInput.value,
      done: false,
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskForm.reset();
  });

  function renderTasks() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";

    const sortedTasks = tasks.slice().sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    sortedTasks.forEach((task) => addTaskToDOM(task, task.done));
  }

  function addTaskToDOM(task, isDone) {
    const list = isDone ? doneList : todoList;
    const taskItem = document.createElement("li");

    const checkmarkContainer = document.createElement("div");
    checkmarkContainer.classList.add("checkmark-container");
    if (task.done) {
      checkmarkContainer.classList.add("checked");
    }

    checkmarkContainer.addEventListener("click", function () {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    taskItem.appendChild(checkmarkContainer);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    list.appendChild(taskItem);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
