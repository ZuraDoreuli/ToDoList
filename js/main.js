const addTextButton = document.querySelector('.creater__button');
const input = document.querySelector('.creater__input');
const toDoLists = document.querySelector('.toDo_list');
const allClearButton = document.querySelector('.toDo__clear');

let toDoListsArray = [];

if(localStorage.getItem('toDo')) {
   toDoListsArray = JSON.parse(localStorage.getItem('toDo'));
   showOnDisplay();
}

function creatNewToDoList () {
   let newToDoList = {
      listText: input.value,
      checked: false,
   };
   toDoListsArray.push(newToDoList);
};

const toDoListDone = index => {
   toDoListsArray[index].checked = !toDoListsArray[index].checked;
   saveToLocalStorage();
   console.log(index);
}

function showOnDisplay() {
   let toDoList = '';
   if(toDoListsArray.length === 0) toDoLists.innerHTML = '';
   toDoListsArray.forEach((list, index) => {
      toDoList += `
      <div class="${list.checked ? "list checked" : "list"}">
         <button onclick="toDoListDelete(${index})" class="list__delete"><span class="list__delete-hover">&#128204;</span></button>
         <div class="list__text">${list.listText}</div>
         <div onclick="toDoListDone(${index})" class="list__done"><span class="list__done-unchecked">&#10004;</span><span class="list__done-checked">&#10007;</span></div>
      </div>
      `;
      toDoLists.innerHTML = toDoList;
   });
};

const toDoListDelete = index => {  
   toDoListsArray.splice(index, 1);
   saveToLocalStorage();
   showOnDisplay();
}

function saveToLocalStorage() {
   localStorage.setItem('toDo', JSON.stringify(toDoListsArray));
};

addTextButton.addEventListener('click', () => {
   if(!input.value) return;
   creatNewToDoList ();
   showOnDisplay ();
   input.value = '';
   saveToLocalStorage()
});

allClearButton.addEventListener('click', () => {
   toDoLists.innerHTML = '';
   toDoListsArray = [];
   saveToLocalStorage();
});

toDoLists.addEventListener('click', (e) => {
   toDoListsArray.forEach( list => {
      let listDone = e.target.parentElement;
      if(list.checked == true) {
         listDone.classList.add('checked');
      }else
      if(list.checked == false) {
         listDone.classList.remove('checked');
      }
   })
   showOnDisplay ();
   saveToLocalStorage()
})