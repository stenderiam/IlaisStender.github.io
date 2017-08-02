import TodoList from './todolist.js';

export default class TodoBuilder {

  constructor() {
    this.builderLayout();
    this.ListStorage = JSON.parse(localStorage.getItem('allTodoStorage')) || [];
    this.allTodo = {};
    this.initBuilder();
  }

  initBuilder() {
    this.addTodoEvent();
    this.showList();
    this.deleteTodoList();
    this.headlineEvent();
  }

  builderLayout() {
    this.boardHeader = `
                <div class="toolbar ">
                  <div class="logo">
                    ToDo List
                  </div>
                </div>
                <div class="fab">
                  <button class="fab-button" type="button"><img src="icons/fab.svg" alt="fab icon"></button>
                </div>
                <div class="content"></div>
        `;
    this.boardContainer = document.createElement('div');
    this.boardContainer.className = 'app-content';
    this.boardContainer.innerHTML = this.boardHeader;
    this.container = document.querySelector('.board-wrapper');
    this.container.innerHTML = '';
    this.container.appendChild(this.boardContainer);
    this.container.appendChild(this.boardContainer);
    this.addLists = document.querySelector('.fab');
  }
  addTodoEvent() {
    this.addLists.addEventListener('click', (e) => {
      e.preventDefault();
      const maxListId = (this.ListStorage.length > 0 ? Math.max(...this.ListStorage.map(elem => elem.id)) : 0);
      const todoLIST = {
        id: maxListId + 1,
        todoListTitle: '',
      };
      this.ListStorage.push(todoLIST);
      this.saveTodoList();
      this.createTodoList(todoLIST);
    });
  }
  headlineEvent() {
    document.addEventListener('headlineChange', (e) => {
      const elId = e.detail.todoLIST.id;
      const index = this.ListStorage.findIndex(todoLIST => todoLIST.id === elId);
      this.ListStorage[index] = e.detail.todoLIST;
      this.saveTodoList();
    });
  }
  saveTodoList() {
    localStorage.setItem('allTodoStorage', JSON.stringify(this.ListStorage));
  }
  showList() {
    this.ListStorage.forEach((elemLIST) => {
      this.createTodoList(elemLIST);
    });
  }
  createTodoList(todoLIST) {
    const todoListObject = new TodoList(todoLIST);
    this.allTodo[todoLIST.id] = todoListObject;
  }
  deleteTodoList() {
    document.addEventListener('deleteLIST', (e) => {
      const elId = e.detail.id;
      const index = this.ListStorage.findIndex(elem => elem.id === elId);
      this.ListStorage.splice(index, 1);
      this.allTodo[elId].onDeleteList();
      delete this.allTodo[elId];
      this.saveTodoList();
    });
  }
}
