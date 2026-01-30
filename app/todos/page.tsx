"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Todo {
  id: string;
  text: string;
  status: "todo" | "in-progress" | "completed";
  createdAt: string;
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      // Migrate old todos that used 'completed' boolean
      const parsed = JSON.parse(stored);
      const migrated = parsed.map((todo: Todo & { completed?: boolean }) => ({
        ...todo,
        status: todo.status || (todo.completed ? "completed" : "todo"),
      }));
      setTodos(migrated);
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      status: "todo",
      createdAt: new Date().toISOString(),
    };

    setTodos([todo, ...todos]);
    setNewTodo("");
  };

  const updateStatus = (id: string, status: Todo["status"]) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const todoItems = todos.filter((t) => t.status === "todo");
  const inProgressItems = todos.filter((t) => t.status === "in-progress");
  const completedItems = todos.filter((t) => t.status === "completed");

  const Column = ({ 
    title, 
    items, 
    status, 
    color 
  }: { 
    title: string; 
    items: Todo[]; 
    status: Todo["status"]; 
    color: string;
  }) => (
    <div className="flex-1 min-w-[280px]">
      <div className={`${color} rounded-t-xl px-4 py-3`}>
        <h2 className="font-semibold text-white flex items-center justify-between">
          {title}
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
            {items.length}
          </span>
        </h2>
      </div>
      <div className="bg-gray-100 rounded-b-xl p-3 min-h-[400px] space-y-3">
        {items.map((todo) => (
          <div
            key={todo.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 group"
          >
            <p className="text-gray-800 mb-3">{todo.text}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {status !== "todo" && (
                  <button
                    onClick={() => updateStatus(todo.id, "todo")}
                    className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600"
                  >
                    ← Todo
                  </button>
                )}
                {status !== "in-progress" && (
                  <button
                    onClick={() => updateStatus(todo.id, "in-progress")}
                    className="text-xs px-2 py-1 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                  >
                    {status === "todo" ? "Start →" : "← In Progress"}
                  </button>
                )}
                {status !== "completed" && (
                  <button
                    onClick={() => updateStatus(todo.id, "completed")}
                    className="text-xs px-2 py-1 rounded bg-green-100 hover:bg-green-200 text-green-700"
                  >
                    Done ✓
                  </button>
                )}
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>No tasks</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Kanban Board</h1>
          {todos.length > 0 && (
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <span className="text-lg font-semibold text-gray-700">
                <span className="text-green-600">{completedItems.length}</span>
                <span className="text-gray-400"> of </span>
                <span className="text-blue-600">{todos.length}</span>
                <span className="text-gray-500 ml-1">completed</span>
              </span>
            </div>
          )}
        </div>

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Add Task
            </button>
          </div>
        </form>

        {/* Kanban Board */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          <Column title="📋 To Do" items={todoItems} status="todo" color="bg-gray-500" />
          <Column title="🔄 In Progress" items={inProgressItems} status="in-progress" color="bg-yellow-500" />
          <Column title="✅ Completed" items={completedItems} status="completed" color="bg-green-500" />
        </div>

        {todos.length === 0 && isLoaded && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-6xl mb-4">📋</p>
            <p>Your kanban board is empty. Add a task above!</p>
          </div>
        )}
      </div>
    </main>
  );
}
