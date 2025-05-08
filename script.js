const todoform = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todolistul = document.getElementById('todo-list');

let alltodos = getTodos();
updateTodolist();

// Event listener for form submission
todoform.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
});

// Function to get todos from localStorage
function getTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(alltodos));
}

// Function to add a new todo
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };
        alltodos.push(todoObject);
        saveTodos();
        updateTodolist();
        todoInput.value = "";
    }
}

// Function to render the todo list
function updateTodolist() {
    todolistul.innerHTML = "";
    alltodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todolistul.append(todoItem);
    });
}

// Function to create a todo item <li>
function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";

    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? "checked" : ""}>
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">${todo.text}</label>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    `;

    // Handle checkbox toggle
    const checkbox = todoLI.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        alltodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });

    // Handle delete button
    const deleteBtn = todoLI.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        alltodos.splice(todoIndex, 1);
        saveTodos();
        updateTodolist();
    });

    return todoLI;
}
