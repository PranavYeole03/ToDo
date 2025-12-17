// Load todos from localStorage or default list
let todoList = JSON.parse(localStorage.getItem("todos")) || [
  { item: "Buy Milk", duedate: "2025-07-09" },
  { item: "Reading Newspaper", duedate: "2025-07-09" }
];

displayItem();

function addTodo() {
  const inputElement = document.querySelector("#todo-input");
  const dateElement = document.querySelector("#todo-date");

  const todoItem = inputElement.value.trim();
  const todoDate = dateElement.value;

  // Validation
  if (todoItem === "" || todoDate === "") {
    alert("Please enter todo and date");
    return;
  }

  todoList.push({ item: todoItem, duedate: todoDate });

  saveAndRender();

  inputElement.value = "";
  dateElement.value = "";
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todoList));
  displayItem();
}

function displayItem() {
  const containerElement = document.querySelector(".todo-container");

  if (todoList.length === 0) {
    containerElement.innerHTML = "<p>No todos added</p>";
    return;
  }

  let newHtml = "";

  todoList.forEach((todo, index) => {
    newHtml += `
      <span>${todo.item}</span>
      <span>${formatDate(todo.duedate)}</span>
      <button class="btn-delete" onclick="deleteTodo(${index})">
        Delete
      </button>
    `;
  });

  containerElement.innerHTML = newHtml;
}

// Format date nicely
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
