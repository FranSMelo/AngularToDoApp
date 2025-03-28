import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Alterar de http://localhost:3000/todos para /api/todos
  private apiUrl = '/api/todos';
  
  // Signals para estado da aplicação
  private todos = signal<Todo[]>([]);
  private isLoading = signal<boolean>(false);
  
  constructor(private http: HttpClient) {
    this.loadTodos();
    console.log('TodoService inicializado - Carregando dados do servidor...');
  }

  private async loadTodos() {
    try {
      this.isLoading.set(true);
      console.log('Buscando todos da API...');
      const todos = await firstValueFrom(this.http.get<Todo[]>(this.apiUrl));
      this.todos.set(todos);
      console.log(`${todos.length} tarefas carregadas com sucesso!`);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  getTodos() {
    return this.todos.asReadonly();
  }
  
  getLoadingState() {
    return this.isLoading.asReadonly();
  }

  async addTodo(title: string) {
    if (!title.trim()) return;
    
    try {
      this.isLoading.set(true);
      console.log(`Adicionando tarefa: "${title}"`);
      
      const newTodo = { title: title.trim(), completed: false };
      const savedTodo = await firstValueFrom(this.http.post<Todo>(this.apiUrl, newTodo));
      
      this.todos.update(todos => [...todos, savedTodo]);
      console.log(`Tarefa adicionada com ID: ${savedTodo.id}`);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      await this.loadTodos(); // Recarregar em caso de erro
    } finally {
      this.isLoading.set(false);
    }
  }

  async toggleTodo(id: string | number) {
    try {
      this.isLoading.set(true);
      const todo = this.todos().find(t => t.id === id);
      
      if (!todo) {
        console.error(`Tarefa com ID ${id} não encontrada`);
        return;
      }
      
      console.log(`Alterando status da tarefa ${id} para ${!todo.completed ? 'concluída' : 'pendente'}`);
      
      const updatedTodo = { ...todo, completed: !todo.completed };
      await firstValueFrom(this.http.put<Todo>(`${this.apiUrl}/${id}`, updatedTodo));
      
      this.todos.update(todos =>
        todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      );
      
      console.log(`Status da tarefa ${id} alterado com sucesso`);
    } catch (error) {
      console.error(`Erro ao alterar status da tarefa ${id}:`, error);
      await this.loadTodos(); // Recarregar em caso de erro
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteTodo(id: string | number) {
    try {
      this.isLoading.set(true);
      console.log(`Excluindo tarefa ${id}...`);
      
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      
      this.todos.update(todos => todos.filter(todo => todo.id !== id));
      console.log(`Tarefa ${id} excluída com sucesso`);
    } catch (error) {
      console.error(`Erro ao excluir tarefa ${id}:`, error);
      await this.loadTodos(); // Recarregar em caso de erro
    } finally {
      this.isLoading.set(false);
    }
  }

  async clearCompleted() {
    try {
      this.isLoading.set(true);
      console.log('Excluindo todas as tarefas concluídas...');
      
      const completedTodos = this.todos().filter(todo => todo.completed);
      console.log(`${completedTodos.length} tarefas concluídas encontradas`);
      
      // Delete each completed todo
      for (const todo of completedTodos) {
        await firstValueFrom(this.http.delete(`${this.apiUrl}/${todo.id}`));
        console.log(`Tarefa ${todo.id} excluída`);
      }
      
      this.todos.update(todos => todos.filter(todo => !todo.completed));
      console.log('Tarefas concluídas removidas com sucesso');
    } catch (error) {
      console.error('Erro ao limpar tarefas concluídas:', error);
      await this.loadTodos(); // Recarregar em caso de erro
    } finally {
      this.isLoading.set(false);
    }
  }

  async markAllCompleted() {
    try {
      this.isLoading.set(true);
      console.log('Marcando todas as tarefas como concluídas...');
      
      const incompleteTodos = this.todos().filter(todo => !todo.completed);
      console.log(`${incompleteTodos.length} tarefas pendentes encontradas`);
      
      const updates = incompleteTodos.map(async todo => {
        const updatedTodo = { ...todo, completed: true };
        await firstValueFrom(this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, updatedTodo));
        console.log(`Tarefa ${todo.id} marcada como concluída`);
        return updatedTodo;
      });
      
      await Promise.all(updates);
      
      this.todos.update(todos =>
        todos.map(todo => ({ ...todo, completed: true }))
      );
      
      console.log('Todas as tarefas foram marcadas como concluídas');
    } catch (error) {
      console.error('Erro ao marcar todas as tarefas como concluídas:', error);
      await this.loadTodos(); // Recarregar em caso de erro
    } finally {
      this.isLoading.set(false);
    }
  }

  // Métodos para estatísticas
  totalCount() {
    return this.todos().length;
  }
  
  completedCount() {
    return this.todos().filter(todo => todo.completed).length;
  }
  
  pendingCount() {
    return this.todos().filter(todo => !todo.completed).length;
  }
  
  completionRate() {
    const total = this.totalCount();
    if (total === 0) return 0;
    return Math.round((this.completedCount() / total) * 100);
  }

  async getTodoById(id: string | number): Promise<Todo | null> {
    try {
      this.isLoading.set(true);
      console.log(`Buscando tarefa com ID: ${id}`);
      const todo = await firstValueFrom(this.http.get<Todo>(`${this.apiUrl}/${id}`));
      return todo;
    } catch (error) {
      console.error(`Erro ao buscar tarefa ${id}:`, error);
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Add this new method to update a todo
  async updateTodo(todo: Todo): Promise<void> {
    try {
      this.isLoading.set(true);
      console.log(`Atualizando tarefa ${todo.id}...`);
      
      await firstValueFrom(this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo));
      
      this.todos.update(todos =>
        todos.map(t => t.id === todo.id ? todo : t)
      );
      
      console.log(`Tarefa ${todo.id} atualizada com sucesso`);
    } catch (error) {
      console.error(`Erro ao atualizar tarefa ${todo.id}:`, error);
      await this.loadTodos(); // Recarregar em caso de erro
    } finally {
      this.isLoading.set(false);
    }
  }
}