export default class TodoListItem {

  constructor(todoList, todoListContainer, elem) {
    this.elem = elem;
    this.todoList = todoList;
    this.parentContainer = todoListContainer;
    this.itemCustomEvent();
    this.createEntry();
    this.removeItemEvent();
    this.inputUpdateEvent();
    this.checkboxUpdateEvent();
    this.isDone();
  }
  itemCustomEvent() {
    this.deleteItemEvent = new CustomEvent('deleteItem', {
      detail: { id: this.elem.id },
    });
    this.updateItemEvent = new CustomEvent('updateItem', {
      detail: {},
    });
  }

  createEntry() {
    this.createElemLi();
    this.createElemCheckbox();
    this.createElemDeleteButton();
    this.createElemInput();
    this.elemLi.appendChild(this.checkboxElem);
    this.elemLi.appendChild(this.inputElem);
    this.elemLi.appendChild(this.deleteButton);
    this.todoList.appendChild(this.elemLi);
  }

  createElemLi() {
    this.elemLi = document.createElement('li');
    this.elemLi.className = 'list-item ';
  }
  createElemCheckbox() {
    this.checkItem = document.createElement('div');
    this.checkItem.className = 'item-input';
    this.checkboxElem = document.createElement('input');
    this.checkboxElem.className = 'item-checkbox';
    this.checkboxElem.type = 'checkbox';
    this.checkItem.appendChild(this.checkboxElem);
    this.checkboxElem.id = `todo${this.elem.id}`;
    this.checkboxElem.checked = this.elem.done;
  }
  createElemDeleteButton() {
    this.deleteDiv = document.createElement('div');
    this.deleteDiv.className = 'item-buttonn';
    this.deleteButton = document.createElement('button');
    this.deleteButton.type = 'button';
    this.deleteButton.className = 'item-delete';
    this.deleteDiv.appendChild(this.deleteButton);
    this.deleteButton.innerHTML = ` <img src="icons/delete.svg" alt="delete icon">`;
  }
  createElemInput() {
    this.inputItem = document.createElement('div');
    this.inputItem.className = 'item-text';
    this.inputElem = document.createElement('input');
    this.inputElem.className = 'item-input--tag';
    this.inputElem.type = 'text';
    this.inputElem.value = this.elem.title;
  }
  deleteItem() {
    this.elemLi.remove();
  }
  inputUpdateEvent() {
    this.inputElem.addEventListener('change', () => {
      this.updateItemEvent.detail.elem = Object.assign({}, this.elem, { title: this.inputElem.value });
      this.parentContainer.dispatchEvent(this.updateItemEvent);
    });
  }
  checkboxUpdateEvent() {
    this.checkboxElem.addEventListener('change', () => {
      this.updateItemEvent.detail.elem = Object.assign({}, this.elem, { done: this.checkboxElem.checked });
      this.isDone();
      this.parentContainer.dispatchEvent(this.updateItemEvent);
    });
  }

  isDone() {
    if (this.checkboxElem.checked) {
      this.inputElem.classList.add('task-isDone');
    } else {
      this.inputElem.classList.remove('task-isDone');
    }
  }
  removeItemEvent() {
    this.deleteButton.addEventListener('click', () => {
      this.parentContainer.dispatchEvent(this.deleteItemEvent);
    });
  }
}
