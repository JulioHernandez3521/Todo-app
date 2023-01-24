import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './usecases';

const ElementIDs = {
    TodoList: '.todo-list',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {
    const displayTodo = ()=>{
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
    }
    //Cuando se mande llamra la funcion
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodo();
    })();
}