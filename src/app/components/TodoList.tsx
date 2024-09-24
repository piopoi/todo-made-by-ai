import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, date: string) => void; // 추가
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onUpdate }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          date={todo.date} // 추가
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate} // 추가
        />
      ))}
    </div>
  );
};

export default TodoList;