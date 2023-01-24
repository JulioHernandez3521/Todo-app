import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending',
}


const  state ={
    todos: [],
    filter: Filters.All,

}


const initStore = () =>{
    loadStroe();
    console.log('InitStore')
}


const loadStroe = () => {
    if(!localStorage.getItem('state')) return;

    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos  = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () =>{
    const stringState = JSON.stringify(state); 
    localStorage.setItem('state', stringState);
}

const getTodos = (filter = Filters.All)=>{
    switch (filter) {
        case Filters.All:
            return [...state.todos]
        case Filters.Completed:
            return state.todos.filter( todo => todo.done)
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done)
        default:
            throw new Error(`Option ${filter} isn't valid`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) =>{
    if(!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
} 

/**
 * 
 * @param {String} todoId 
 */
//TODO: Optimizar con find slice e indexOf
const toggleTodo = (todoId)=>{
    state.todos = state.todos.map( todo =>{
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId)=>{    
    state.todos = state.todos.filter( todo => todo.id !== todoId);
    saveStateToLocalStorage();
}
const deleteCompleted = ()=>{
    state.todos = state.todos.filter( todo => !todo.done);
    saveStateToLocalStorage();
}
/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All) =>{

    if(!Object.keys(Filters).includes(newFilter)) throw new Error(`The filter ${newFilter} is not valid`);
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = ()=>{
    return state.filter.toString();
}


export default { 
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStroe,
    setFilter,
    toggleTodo,
}
