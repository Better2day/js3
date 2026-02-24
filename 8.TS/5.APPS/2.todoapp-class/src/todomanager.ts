import { Todo } from './todo';

export class TodoManager {
  private todos: Todo[] = [];

  toggleTodo(id: number): boolean {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) return false;
    todo.toggle();
    return true;
  }

  addTodo(title: string): Todo {
    const newTodo = new Todo(title);
    this.todos.push(newTodo);
    return newTodo;
  }

  removeTodo(id: number): boolean {
    // find 고차함수는 해당 객체를 반환, findIndex 함수는 해당 index 번호를 반환(없으면 -1)
    const index = this.todos.findIndex(t => t.id == id);
    if (index === -1) return false;
    this.todos.splice(index, 1); // index 위치에서부터 배열 요소 1개를 제거한 배열을 반환
    return true;
  }

  listTodo() {
    return this.todos;
  }
}
