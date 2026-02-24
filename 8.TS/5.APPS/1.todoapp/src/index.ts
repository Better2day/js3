import { Todo } from './todo';

// 우리가 정한 자료구조를 배열 형태로 빈 값으로 추기화
const todos: Todo[] = [];

// 반환값이 없을 때도 없다고 명시 (void)
function addTodo(title: string): void {
  const newTodo: Todo = { id: Date.now(), title, completed: false };
  todos.push(newTodo);
  console.log('Todo 추가 완료:', newTodo);
}

addTodo('TS 공부하기');
addTodo('프로젝트 완성하기');

// console.log(`Todo listi: ${todos}`); // [object Object]라고 나온다.
console.log('Todo listi:', todos); // 이렇게 하면 객체 배열을 제대로 출력

