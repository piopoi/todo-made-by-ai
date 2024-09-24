'use client';

import React, { useState } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { Todo } from './types/todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string, date: string) => {
    const newTodo = { id: Date.now(), text, completed: false, date };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdateTodo = (id: number, date: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, date } : todo
    ));
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <AddTodo onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        onUpdate={handleUpdateTodo}
      />
    </div>
  );
}