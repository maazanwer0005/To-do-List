const input = document.getElementById('input');
const list = document.getElementById('list');
const form = document.querySelector('form');
const template = document.getElementById('template');
const searchInput = document.getElementById('search');

let editTodo = null;
let todos = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputValue = input.value.trim();
    if (inputValue === '') return;

    if (editTodo) {
        editTodo.querySelector('span').innerText = inputValue;
        editTodo = null;
    } else {
        const li = document.createElement('li');
        const content = template.cloneNode(true);
        content.style.display = '';
        content.id = '';
        content.querySelector('span').innerText = inputValue;
        li.appendChild(content);
        list.appendChild(li);
        todos.push(inputValue);
    }

    input.value = '';
    updateSearch();
});


list.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        const li = e.target.closest('li');
        const index = Array.from(list.children).indexOf(li);
        todos.splice(index, 1);
        li.remove();
    }

    if (e.target.classList.contains('edit')) {
        editTodo = e.target.closest('li');
        input.value = editTodo.querySelector('span').innerText;
    }
});


searchInput.addEventListener('input', updateSearch);

function updateSearch() {
    const searchText = searchInput.value.toLowerCase();
    const listItems = list.querySelectorAll('li');

    listItems.forEach((li, index) => {
        const todoText = li.querySelector('.todo-text').innerText.toLowerCase();
        if (todoText.includes(searchText)) {
            li.style.display = '';
        } else {
            li.style.display = 'none';
        }
    });
}