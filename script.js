const addTodoBtn = document.getElementById('addTodoBtn');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

let todos = [];

function updateButtonState() {
    const text = todoInput.value.trim();
    addTodoBtn.disabled = text === '' || todos.includes(text.toLowerCase());
}

todoInput.addEventListener('input', updateButtonState);

function addTodo() {
    const text = todoInput.value.trim();
    const lowerText = text.toLowerCase();

    if (text === '' || todos.includes(lowerText)) return;

    todos.push(lowerText);

    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = text;

    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', () => {
        todoList.removeChild(li);
        todos = todos.filter(todo => todo !== lowerText);
        updateButtonState();
    });

    const textContainer = document.createElement('div');
    textContainer.className = 'todo-text';
    textContainer.appendChild(checkbox);
    textContainer.appendChild(span);

    li.appendChild(textContainer);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    todoInput.value = '';
    updateButtonState();
    enableDragAndDrop();
}

addTodoBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', e => {
    if (e.key === 'Enter' && !addTodoBtn.disabled) {
        addTodo();
    }
});

// Drag and Drop functionality
function enableDragAndDrop() {
    const items = document.querySelectorAll('#todoList li');
    let dragItem = null;

    items.forEach(item => {
        item.addEventListener('dragstart', () => {
            dragItem = item;
            setTimeout(() => item.style.display = 'none', 0);
        });

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                dragItem.style.display = 'flex';
                dragItem = null;
            }, 0);
        });

        item.addEventListener('dragover', e => {
            e.preventDefault();
        });

        item.addEventListener('drop', () => {
            if (dragItem !== item) {
                const allItems = Array.from(todoList.children);
                const dropIndex = allItems.indexOf(item);
                const dragIndex = allItems.indexOf(dragItem);

                if (dragIndex < dropIndex) {
                    item.after(dragItem);
                } else {
                    item.before(dragItem);
                }
            }
        });
    });
}
