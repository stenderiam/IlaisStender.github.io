(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _todoBuilder = require('./modules/todoBuilder.js');

var _todoBuilder2 = _interopRequireDefault(_todoBuilder);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var first = new _todoBuilder2.default();

},{"./modules/todoBuilder.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _todolist = require('./todolist.js');

var _todolist2 = _interopRequireDefault(_todolist);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var TodoBuilder = function () {
  function TodoBuilder() {
    _classCallCheck(this, TodoBuilder);

    this.builderLayout();
    this.ListStorage = JSON.parse(localStorage.getItem('allTodoStorage')) || [];
    this.allTodo = {};
    this.initBuilder();
  }

  _createClass(TodoBuilder, [{
    key: 'initBuilder',
    value: function initBuilder() {
      this.addTodoEvent();
      this.showList();
      this.deleteTodoList();
      this.headlineEvent();
    }
  }, {
    key: 'builderLayout',
    value: function builderLayout() {
      this.boardHeader = '\n                <div class="toolbar ">\n                  <div class="logo">\n                    ToDo List\n                  </div>\n                </div>\n                <div class="fab">\n                  <button class="fab-button" type="button"><img src="icons/fab.svg" alt="fab icon"></button>\n                </div>\n                <div class="content"></div>\n        ';
      this.boardContainer = document.createElement('div');
      this.boardContainer.className = 'app-content';
      this.boardContainer.innerHTML = this.boardHeader;
      this.container = document.querySelector('.board-wrapper');
      this.container.appendChild(this.boardContainer);
      this.addLists = document.querySelector('.fab');
    }
  }, {
    key: 'addTodoEvent',
    value: function addTodoEvent() {
      var _this = this;

      this.addLists.addEventListener('click', function (e) {
        e.preventDefault();
        var maxListId = _this.ListStorage.length > 0 ? Math.max.apply(Math, _toConsumableArray(_this.ListStorage.map(function (elem) {
          return elem.id;
        }))) : 0;
        var todoLIST = {
          id: maxListId + 1,
          todoListTitle: ''
        };
        _this.ListStorage.push(todoLIST);
        _this.saveTodoList();
        _this.createTodoList(todoLIST);
      });
    }
  }, {
    key: 'headlineEvent',
    value: function headlineEvent() {
      var _this2 = this;

      document.addEventListener('headlineChange', function (e) {
        var elId = e.detail.todoLIST.id;
        var index = _this2.ListStorage.findIndex(function (todoLIST) {
          return todoLIST.id === elId;
        });
        _this2.ListStorage[index] = e.detail.todoLIST;
        _this2.saveTodoList();
      });
    }
  }, {
    key: 'saveTodoList',
    value: function saveTodoList() {
      localStorage.setItem('allTodoStorage', JSON.stringify(this.ListStorage));
    }
  }, {
    key: 'showList',
    value: function showList() {
      var _this3 = this;

      this.ListStorage.forEach(function (elemLIST) {
        _this3.createTodoList(elemLIST);
      });
    }
  }, {
    key: 'createTodoList',
    value: function createTodoList(todoLIST) {
      var todoListObject = new _todolist2.default(todoLIST);
      this.allTodo[todoLIST.id] = todoListObject;
    }
  }, {
    key: 'deleteTodoList',
    value: function deleteTodoList() {
      var _this4 = this;

      document.addEventListener('deleteLIST', function (e) {
        var elId = e.detail.id;
        var index = _this4.ListStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this4.ListStorage.splice(index, 1);
        _this4.allTodo[elId].onDeleteList();
        delete _this4.allTodo[elId];
        _this4.saveTodoList();
      });
    }
  }]);

  return TodoBuilder;
}();

exports.default = TodoBuilder;

},{"./todolist.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}(); // TODO: later, to change current methods to pure fanctions


var _todolistitem = require('./todolistitem.js');

var _todolistitem2 = _interopRequireDefault(_todolistitem);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var TodoList = function () {
  function TodoList(todoLIST) {
    _classCallCheck(this, TodoList);

    this.todoLIST = todoLIST;
    this.todoItems = {};
    this.itemsStorage = JSON.parse(localStorage.getItem('todoListItem' + this.todoLIST.id)) || [];
    this.createLayout();
    this.initTodoList();
  }

  _createClass(TodoList, [{
    key: 'initTodoList',
    value: function initTodoList() {
      this.showItem();
      this.addItemEvent();
      this.todoCustomEvent();
      this.deleteItem();
      this.updateItem();
      this.clearListOnClick();
      this.clearTodoOnClick();
      this.deleteTodoList();
      this.headlineChange();
    }
  }, {
    key: 'createLayout',
    value: function createLayout() {
      this.layout = '\n        <form class="card-form" autocomplete="off">\n          <div class="headline">\n            <input class="headline-title" placeholder="Title" value="' + this.todoLIST.todoListTitle + '">\n          </div>\n          <ul class="todo-list">\n          </ul>\n          <div class="new-item">\n            <div class="item-input">\n              <input class="item-submit" type="submit" alt="Submit" value="+" />\n            </div>\n            <div class="item-text">\n              <input class="item-input--tag add-item" placeholder="Add new todo" value="">\n              <span class="highlight"></span>\n              <span class="bar"></span>\n            </div>\n          </div>\n        </form>\n        <div class="list-button">\n          <div class="clear-list">\n            <button class="delete-button clear " type="button">clear</button>\n          </div>\n          <div class="delete-list">\n            <button class="delete-button delete" type="button">delete</button>\n          </div>\n        </div>\n';
      this.todoListContainer = document.createElement('div');
      this.todoListContainer.className = 'card';
      this.todoListContainer.innerHTML = this.layout;
      this.todoFormcontainer = document.querySelector('.content');
      this.todoFormcontainer.appendChild(this.todoListContainer);
      this.headline = this.todoListContainer.querySelector('.headline-title');
      this.inputID = this.todoListContainer.querySelector('.add-item');
      this.buttonID = this.todoListContainer.querySelector('.item-submit');
      this.todoList = this.todoListContainer.querySelector('.todo-list');
      this.removeList = this.todoListContainer.querySelector('.clear');
      this.deleteTodo = this.todoListContainer.querySelector('.delete');
    }
  }, {
    key: 'todoCustomEvent',
    value: function todoCustomEvent() {
      this.deleteLISTEvent = new CustomEvent('deleteLIST', {
        detail: { id: this.todoLIST.id }
      });
      this.headlineEvent = new CustomEvent('headlineChange', {
        detail: {}
      });
    }
  }, {
    key: 'addItemEvent',
    value: function addItemEvent() {
      var _this = this;

      this.buttonID.addEventListener('click', function (e) {
        e.preventDefault();
        //  if (this.inputID.value.length === 0) return;
        var title = _this.inputID.value;
        var maxId = _this.itemsStorage.length > 0 ? Math.max.apply(Math, _toConsumableArray(_this.itemsStorage.map(function (elem) {
          return elem.id;
        }))) : 0;
        var todoItem = {
          title: title,
          done: false,
          id: maxId + 1
        };
        _this.itemsStorage.push(todoItem);
        _this.saveItem();
        _this.createItem(todoItem);
        _this.inputID.value = '';
      });
    }
  }, {
    key: 'saveItem',
    value: function saveItem() {
      localStorage.setItem('todoListItem' + this.todoLIST.id, JSON.stringify(this.itemsStorage));
    }
  }, {
    key: 'createItem',
    value: function createItem(todoItem) {
      var todoItemObject = new _todolistitem2.default(this.todoList, this.todoListContainer, todoItem);
      this.todoItems[todoItem.id] = todoItemObject;
      this.showDeleteButton();
    }
  }, {
    key: 'showItem',
    value: function showItem() {
      var _this2 = this;

      this.itemsStorage.forEach(function (elem) {
        _this2.createItem(elem);
      });
    }
  }, {
    key: 'deleteItem',
    value: function deleteItem() {
      var _this3 = this;

      this.todoListContainer.addEventListener('deleteItem', function (e) {
        var elId = e.detail.id;
        var index = _this3.itemsStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this3.itemsStorage.splice(index, 1);
        _this3.todoItems[elId].deleteItem();
        delete _this3.todoItems[elId];
        _this3.saveItem();
      });
    }
  }, {
    key: 'updateItem',
    value: function updateItem() {
      var _this4 = this;

      this.todoListContainer.addEventListener('updateItem', function (e) {
        var elId = e.detail.elem.id;
        var index = _this4.itemsStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this4.itemsStorage[index] = e.detail.elem;
        _this4.saveItem();
      });
    }
  }, {
    key: 'clearList',
    value: function clearList() {
      this.itemsStorage = [];
      this.todoItems = {};
      localStorage.removeItem('todoListItem' + this.todoLIST.id);
      this.todoList.innerHTML = '';
    }
  }, {
    key: 'clearListOnClick',
    value: function clearListOnClick() {
      var _this5 = this;

      this.removeList.addEventListener('click', function () {
        _this5.removeList.classList.remove('button-visible');
        _this5.clearList();
      });
    }
  }, {
    key: 'clearTodoOnClick',
    value: function clearTodoOnClick() {
      var _this6 = this;

      this.deleteTodo.addEventListener('click', function () {
        _this6.clearList();
      });
    }
  }, {
    key: 'headlineChange',
    value: function headlineChange() {
      var _this7 = this;

      this.headline.addEventListener('change', function () {
        _this7.headlineEvent.detail.todoLIST = Object.assign({}, _this7.todoLIST, { todoListTitle: _this7.headline.value });
        document.dispatchEvent(_this7.headlineEvent);
      });
    }
  }, {
    key: 'deleteTodoList',
    value: function deleteTodoList() {
      var _this8 = this;

      this.deleteTodo.addEventListener('click', function () {
        document.dispatchEvent(_this8.deleteLISTEvent);
      });
    }
  }, {
    key: 'onDeleteList',
    value: function onDeleteList() {
      this.todoListContainer.remove();
    }
  }, {
    key: 'showDeleteButton',
    value: function showDeleteButton() {
      if (this.itemsStorage.lenght !== null) {
        this.removeList.classList.add('button-visible');
      }
      console.log(this.itemsStorage);
    }
  }]);

  return TodoList;
}();

exports.default = TodoList;

},{"./todolistitem.js":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var TodoListItem = function () {
  function TodoListItem(todoList, todoListContainer, elem) {
    _classCallCheck(this, TodoListItem);

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

  _createClass(TodoListItem, [{
    key: 'itemCustomEvent',
    value: function itemCustomEvent() {
      this.deleteItemEvent = new CustomEvent('deleteItem', {
        detail: { id: this.elem.id }
      });
      this.updateItemEvent = new CustomEvent('updateItem', {
        detail: {}
      });
    }
  }, {
    key: 'createEntry',
    value: function createEntry() {
      this.createElemLi();
      this.createElemCheckbox();
      this.createElemDeleteButton();
      this.createElemInput();
      this.elemLi.appendChild(this.checkboxElem);
      this.elemLi.appendChild(this.inputElem);
      this.elemLi.appendChild(this.deleteButton);
      this.todoList.appendChild(this.elemLi);
    }
  }, {
    key: 'createElemLi',
    value: function createElemLi() {
      this.elemLi = document.createElement('li');
      this.elemLi.className = 'list-item ';
    }
  }, {
    key: 'createElemCheckbox',
    value: function createElemCheckbox() {
      this.checkItem = document.createElement('div');
      this.checkItem.className = 'item-input';
      this.checkboxElem = document.createElement('input');
      this.checkboxElem.className = 'item-checkbox';
      this.checkboxElem.type = 'checkbox';
      this.checkItem.appendChild(this.checkboxElem);
      this.checkboxElem.id = 'todo' + this.elem.id;
      this.checkboxElem.checked = this.elem.done;
    }
  }, {
    key: 'createElemDeleteButton',
    value: function createElemDeleteButton() {
      this.deleteDiv = document.createElement('div');
      this.deleteDiv.className = 'item-buttonn';
      this.deleteButton = document.createElement('button');
      this.deleteButton.type = 'button';
      this.deleteButton.className = 'item-delete';
      this.deleteDiv.appendChild(this.deleteButton);
      this.deleteButton.innerHTML = ' <img src="icons/delete.svg" alt="delete icon">';
    }
  }, {
    key: 'createElemInput',
    value: function createElemInput() {
      this.inputItem = document.createElement('div');
      this.inputItem.className = 'item-text';
      this.inputElem = document.createElement('input');
      this.inputElem.className = 'item-input--tag';
      this.inputElem.type = 'text';
      this.inputElem.value = this.elem.title;
    }
  }, {
    key: 'deleteItem',
    value: function deleteItem() {
      this.elemLi.remove();
    }
  }, {
    key: 'inputUpdateEvent',
    value: function inputUpdateEvent() {
      var _this = this;

      this.inputElem.addEventListener('change', function () {
        _this.updateItemEvent.detail.elem = Object.assign({}, _this.elem, { title: _this.inputElem.value });
        _this.parentContainer.dispatchEvent(_this.updateItemEvent);
      });
    }
  }, {
    key: 'checkboxUpdateEvent',
    value: function checkboxUpdateEvent() {
      var _this2 = this;

      this.checkboxElem.addEventListener('change', function () {
        _this2.updateItemEvent.detail.elem = Object.assign({}, _this2.elem, { done: _this2.checkboxElem.checked });
        _this2.isDone();
        _this2.parentContainer.dispatchEvent(_this2.updateItemEvent);
      });
    }
  }, {
    key: 'isDone',
    value: function isDone() {
      if (this.checkboxElem.checked) {
        this.inputElem.classList.add('task-isDone');
      } else {
        this.inputElem.classList.remove('task-isDone');
      }
    }
  }, {
    key: 'removeItemEvent',
    value: function removeItemEvent() {
      var _this3 = this;

      this.deleteButton.addEventListener('click', function () {
        _this3.parentContainer.dispatchEvent(_this3.deleteItemEvent);
      });
    }
  }]);

  return TodoListItem;
}();

exports.default = TodoListItem;

},{}]},{},[1]);
