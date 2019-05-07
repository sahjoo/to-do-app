function onReady() {
  let toDos = [];
  const ADD_TODO_FORM = document.getElementById('addToDoForm');
  let id = 0;

  function createNewToDo() {
    const NEW_TODO_TEXT = document.getElementById('newToDoText');
    // prevents user from entering empty toDos
    if (!newToDoText.value) {return;}
    toDos.push({
      title: NEW_TODO_TEXT.value,
      complete: false,
      id: id // sets id of first to 0
    });
    id++;
    NEW_TODO_TEXT.value = '';
    // calls renderTheUI function
    renderTheUI();
  }

  function renderTheUI() {
    const TODO_LIST = document.getElementById('toDoList');
    // prevent old li's from getting added to new ul
    TODO_LIST.textContent = '';
    // add these for each li
    toDos.forEach(function(toDoItem){
      const NEW_LI = document.createElement('li');
      const CHECKBOX = document.createElement('input');
      CHECKBOX.type = "checkbox";
      // create delete button for each li
      const DEL_BTN = document.createElement('button');
      DEL_BTN.textContent = 'Delete';
      // on click, filter todos and return items to toDos array that don't match deleted item
      DEL_BTN.addEventListener('click', event => {
        toDos = toDos.filter(function(item) {
          return item.id !== toDoItem.id;
        })

      window.localStorage.setItem('allToDos', JSON.stringify(toDos));
      JSON.parse(window.localStorage.getItem("allToDos"));

      renderTheUI();
    });

      NEW_LI.textContent = toDoItem.title;
      TODO_LIST.appendChild(NEW_LI);
      NEW_LI.appendChild(CHECKBOX);
      NEW_LI.appendChild(DEL_BTN);
    });
  }

  ADD_TODO_FORM.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
  });

  renderTheUI();
}

  window.onload = function() {
    onReady();
  };
