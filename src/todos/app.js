import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderPending } from './usecases';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel:'#pending-count',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodo = ()=>{

        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = ()=>{
        renderPending(ElementIDs.PendingCountLabel);
    }

    //Cuando se mande llamra la funcion
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodo();
    })();

    //Referencias Html
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const TodoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

    //Listeners
    newDescriptionInput.addEventListener('keyup', (e) =>{
        
        if(e.keyCode !== 13) return;
        if(e.target.value.trim().length === 0 ) return;

        //Crear el todo
        todoStore.addTodo(e.target.value);
        displayTodo();
        e.target.value = '';
        
    })


    TodoListUL.addEventListener('click', (e)=>{
        const parentNode = e.target.closest('[data-id]');
        todoStore.toggleTodo(parentNode.getAttribute('data-id'));
        displayTodo();
    })

    TodoListUL.addEventListener('click', (e)=>{
        const parentNode = e.target.closest('[data-id]');
        if(!parentNode || (e.target.className !== 'destroy')) return ;
        todoStore.deleteTodo(parentNode.getAttribute('data-id'));
        displayTodo();
    })

    clearCompletedButton.addEventListener('click', (e)=>{
        if( e.target.className !== 'clear-completed')return;
        todoStore.deleteCompleted();
        displayTodo();
    });

    filtersLIs.forEach(element =>{

        element.addEventListener('click', (e) =>{

            filtersLIs.forEach(elem => elem.classList.remove('selected'));
            e.target.classList.add('selected');
            //Puede ser la clase el id o href porque  si el text cambia y jode todo
            switch (e.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                    break;
            
                default:
                    break;
            }
            displayTodo();
        })
    })
}