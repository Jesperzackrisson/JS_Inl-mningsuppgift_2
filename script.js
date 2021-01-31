const form = document.querySelector('#myForm');
const input = document.querySelector('.form-control');
const output = document.querySelector('#outputTodo');
const addBtn = document.querySelector('#addBtn');

const todo = document.getElementById('inputTodo')


let todos = [];

addBtn.addEventListener('click', event => {
    event.preventDefault();

    checkInput();
    
    if (todo.value !== '') {
        createTodo(todo.value);
        todo.value = '';
    }
})

function checkInput() {

    if ( todo.value === '') {
        // Error msg
        invalidMsg(todo, 'Det får ej vara tomt!');
    } else {
        // valid msg
        validMsg(todo);
    }
} 

function invalidMsg(input, message) {

    // parent-element = field-input
    const formInput = input.parentElement;

    // Lägger till error class
    formInput.classList.add('error');

    // Gör så att error msg blir synligt
    const error = formInput.querySelector('span');
    error.textContent = message;
}

function validMsg(input) {
    
    // get the form-field element
    const fieldInput = input.parentElement;

    // remove the error class
    fieldInput.classList.remove('error');

    // // // hide the error message
    const error = fieldInput.querySelector('span');
    error.textContent = '';
}

function fetchTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(data => {
        todos = data;
        console.log(todos);
        // outputUsers();
        listTodos()
    })
}

fetchTodos();

function clear() {
    document.getElementById('outputTodo').innerHTML = '';
}

function createTodo (title) {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title,
            completed: false
        })
    }) 
    
    .then(res => res.json())
    .then(data => {
        console.log(data);
        todos.unshift(data);
        listTodos()
    })
}

function listTodos() {
    output.innerHTML = '';

    todos.forEach(todo => {
        output.innerHTML += `<div class="border p-4 d-flex justify-content-between align-items-center mb-2"> ${todo.title} <div class="border p-3 rounded"> ${todo.id} </div> </div>`
    })
}








    

    


