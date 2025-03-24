import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, NgFor, NgIf],
  template: `
    <div class="todo-list-container">
      <h2>Minhas Tarefas</h2>
      <div class="todo-list" *ngIf="todos().length > 0">
        <app-todo-item 
          *ngFor="let todo of todos(); trackBy: trackById" 
          [todo]="todo"
        ></app-todo-item>
      </div>
      <div *ngIf="todos().length === 0" class="empty-state">
        <div class="empty-icon">📋</div>
        <p>Sua lista de tarefas está vazia</p>
        <p class="empty-subtitle">Adicione uma nova tarefa</p>
      </div>
    </div>
  `,
  styles: [`
    .todo-list-container {
      width: 100%;
    }
    h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.5rem;
      border-bottom: 2px solid #f1f1f1;
      padding-bottom: 10px;
    }
    .todo-list {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .empty-state {
      margin-top: 30px;
      text-align: center;
      color: #7f8c8d;
      padding: 30px;
      background-color: #f8f9fa;
      border-radius: 8px;
    }
    .empty-icon {
      font-size: 40px;
      margin-bottom: 15px;
    }
    .empty-subtitle {
      margin-top: 10px;
      font-size: 0.9rem;
      color: #95a5a6;
    }
  `]
})
export class TodoListComponent {
  todos: ReturnType<TodoService['getTodos']>;
  
  constructor(protected todoService: TodoService) {
    this.todos = this.todoService.getTodos();
  }
  
  // Update trackBy to handle string or number IDs
  trackById(index: number, todo: {id: string | number}) {
    return todo.id;
  }
}
