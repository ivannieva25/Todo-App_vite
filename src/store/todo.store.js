import { Todo } from "../todos/models/todo.model";

export const Filters= {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state ={
    todos: [
        new Todo('Revisar correos importantes'),
        new Todo('Enviar reporte semanal'),
        new Todo('LLamar al cliente para confirmar la reunión'),
        new Todo('Actualizar la documentación del proyecto'),
        new Todo('Planificar la agenda para la proxima semana'),
    ],
    filter: Filters.All,
}

const initStore = ()=> {
    loadStore();
    console.log('InitStore 🥑');
}

const loadStore = () =>{
    if( !localStorage.getItem('state') ) return;

    const {todos = [] , filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    state.todos= todos;
    state.filter= filter;
}

const saveStateToLocalStorage = () =>{
    localStorage.setItem('state', JSON.stringify(state) );
}
const getTodos = (filter = Filters.All) =>{
    
    switch( filter) {
        case Filters.All:
            return[...state.todos];
        
        case Filters.Completed: 
            return state.todos.filter( todo => todo.done);
        
        case Filters.Pending: 
            return state.todos.filter( todo => !todo.done);
        
        default:
            throw new Error(`Òption ${filter} is not valid`);
    }
}

const addTodo = (description) =>{
    if(!description) throw new Error('Description is required');
    state.todos.push( new Todo(description));

    saveStateToLocalStorage();
}

const toggleTodo = (todoId) =>{
    state.todos = state.todos.map( todo =>{
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();

}
const deleteTodo = (todoId) =>{
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();

}

const deleteCompleted= () =>{
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();

}
/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All) =>{
    state.filter= newFilter;
    saveStateToLocalStorage();

}

const getCurrentFilter = ()=>{
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}