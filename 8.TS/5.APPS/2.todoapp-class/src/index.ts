import { TodoManager } from './todomanager';

const mytodo = new TodoManager();

const todo1 = mytodo.addTodo('TS 학습하기');
const todo2 = mytodo.addTodo('프로젝트 완성하기');

console.log('--- 할 일 추가 후 ---');
console.log('할 일:', mytodo.listTodo());

mytodo.toggleTodo(todo1.id);
console.log('--- 토글 실행 후 ---');
console.log('할 일:', mytodo.listTodo());

mytodo.removeTodo(todo1.id);
console.log('--- todo1 삭제 후 ---');
console.log('할 일:', mytodo.listTodo());

mytodo.removeTodo(todo2.id);
console.log('--- todo2 삭제 후 ---');
console.log('할 일:', mytodo.listTodo());
