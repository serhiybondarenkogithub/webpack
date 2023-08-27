import { renderTodos, clearNewTodoInput, getTodoId } from './ui';
import { getAllTodos, addTodo, removeTodo, updateTodo } from './data';
import { Modal } from "bootstrap";

export function onLoadEventHandler() {
    renderTodos(getAllTodos())
}

export function newTodoEventHandler(event) {
    let text = event.target.value
    addTodo({
        id: Date.now(),
        text: text,
        completed: false
    })
    renderTodos(getAllTodos())
    clearNewTodoInput()
}

export function removeTodoEventHandler(event) {
    const id = getTodoId(event.target);
    document.querySelector("#modal-delete-button").setAttribute("todo-id", id);
    const deleteTodoModal = Modal.getOrCreateInstance(
        document.getElementById("modal-delete-todo")
    );
    deleteTodoModal.show();
}

export function confirmRemoveEventHandler(event) {
    const id = document.getElementById("modal-delete-button").getAttribute("todo-id");
    removeTodo(+id)
    renderTodos(getAllTodos())
    const deleteTodoModal = Modal.getOrCreateInstance(
        document.getElementById("modal-delete-todo")
    );
    deleteTodoModal.hide();
}

export function toggleTodoEventListener(event) {
    const id = getTodoId(event.target)
    const isCompleted = event.target.checked
    updateTodo(id, isCompleted)
    renderTodos(getAllTodos())
}
