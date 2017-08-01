
* npm install

* npm run start

* npm run watch


** some comments, are posted here for awhile


** class TodoList

* createTodoItem() - create new todo item (entry) on click

    get input value as a title
    
    get max id of each item in itemsStorage
    
    add max id + 1 to each object item -> todo{}
    
    save this item
    
    create object item

    to spread the values of an array across the parameters of the function
    
    use example(...args);
    
    instead of example.apply(null, args); 

* showCurrentList()  

    if Local Storage has any entries/todo items
    method will loop through an array and show current results 

* deleteTodoItemEvent()

    customEvent to delete one (current/on click) entry/todo item

    get current (clicked) element id
    get index ( the findIndex() method returns the index of the first element in the array
    that satisfies the provided testing function )
    testing function is -> current element.id === clicked element id

    call deleteItem() (class TodoListItem) to delete todo item (DOM)
    the delete operator removes a property from an object
    in this case it will remove todoItem from todoItems{}
    which were choosen by id (on click)
    call saveTodoItem() to save current list

* updateTodoItemEvent()

    customEvent to update one (current/on click) entry/todo item

    get current (clicked) element id
    get index ( the findIndex() method returns the index of the first element in the array
    that satisfies the provided testing function )
    testing function is -> current element.id === clicked element id

    change current to clicked 
    it will attach two dispatchEvent methods in TodoListItem class
    on Check and on Input changes

    call saveTodoItem() to save current list;


** class TodoListItem

*  createEntry()

    calls all methods to create DOM elements for Entry/TodoItem
    and append them into one element of the todo list <li>

 
* inputUpdateEvent()

    listen to any changes on input and 
    calls dispatchEvent of updateItem

    The Object.assign() method is used to copy the values of all
    enumerable own properties from one or more source objects to a target object.
    It will return the target object.

    Object.assign(target, ...sources)

    this.inputElem.value = this.elem.title;
   

* checkboxUpdateEvent()
 
    listen to any changes on checkbox and 
    calls dispatchEvent of updateItem for checkbox

    The Object.assign() method is used to copy the values of all
    enumerable own properties from one or more source objects to a target object.
    It will return the target object.

    Object.assign(target, ...sources)

    raplace current 'done' property to done: this.checkboxElem.checked
   
