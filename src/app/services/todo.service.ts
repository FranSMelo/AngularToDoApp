import { Injectable, signal, computed } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = signal<Todo[]>([
    { id: 1, title: 'Estudar Angular', completed: false },
    { id: 2, title: 'Criar aplicativo Todo', completed: false },
    { id: 3, title: 'Aprender sobre Signals', completed: true }
  ]);

  // Computed values for statistics
  completedCount = computed(() => this.todos().filter(todo => todo.completed).length);
  pendingCount = computed(() => this.todos().filter(todo => !todo.completed).length);
  totalCount = computed(() => this.todos().length);
  completionRate = computed(() => {
    const total = this.totalCount();
    return total > 0 ? Math.round((this.completedCount() / total) * 100) : 0;
  });

  getTodos() {
    return this.todos.asReadonly();
  }

  addTodo(title: string) {
    if (title.trim()) {
      const newId = this.todos().length > 0 
        ? Math.max(...this.todos().map(todo => todo.id)) + 1 
        : 1;
        
      this.todos.update(todos => [
        ...todos,
        { id: newId, title: title.trim(), completed: false }
      ]);
    }
  }

  toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  clearCompleted() {
    this.todos.update(todos => todos.filter(todo => !todo.completed));
  }

  markAllCompleted() {
    this.todos.update(todos =>
      todos.map(todo => ({ ...todo, completed: true }))
    );
  }
}
