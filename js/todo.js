const toDoForm = document.getElementById('todo_form');
const toDoInput = document.querySelector('#todo_form input');
const toDoList = document.getElementById('todo_list');

const TODOS_KEYS = 'toDos';
const savedToDos = localStorage.getItem(TODOS_KEYS);
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEYS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.animate(
    [
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(100%)', opacity: 0 },
    ],
    { duration: 1000, easing: 'ease-out' }
  );
  setTimeout(() => {
    toDos = toDos.filter((item) => item.id !== parseInt(li.id));
    li.remove();
    saveToDos();
  }, 1000);
}

function paintToDo(newTodo) {
  const li = document.createElement('li');
  const span = document.createElement('span');

  li.id = newTodo.id;
  span.innerHTML = newTodo.text;
  const button = document.createElement('button');
  button.innerText = '❌';
  button.addEventListener('click', deleteToDo);
  toDoList.appendChild(li);
  li.appendChild(span);
  li.appendChild(button);

  span.style.color = newTodo.color;
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    color: toDos.length % 2 === 0 ? 'white' : '#20b2aa',
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener('submit', handleToDoSubmit);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
  toDoForm.classList.remove(HIDDEN_CLASSNAME);
}
