import { Component, Input } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="todo-item" [ngClass]="{'completed': todo.completed}">
      <div class="todo-content">
        <div class="checkbox-wrapper">
          <input 
            type="checkbox" 
            [checked]="todo.completed" 
            (change)="toggleTodo()"
            id="todo-{{todo.id}}"
          />
          <label for="todo-{{todo.id}}" class="checkbox-label"></label>
        </div>
        <span class="todo-title">{{ todo.title }}</span>
      </div>
      <button class="delete-btn" (click)="deleteTodo()" title="Excluir tarefa">×</button>
    </div>
  `,
  styles: [`
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      border-bottom: 1px solid #eee;
      background-color: white;
      transition: all 0.3s;
    }
    .todo-item:hover {
      background-color: #f9f9f9;
      transform: translateX(3px);
    }
    .todo-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .checkbox-wrapper {
      position: relative;
    }
    input[type="checkbox"] {
      position: absolute;
      opacity: 0;
    }
    .checkbox-label {
      display: inline-block;
      width: 22px;
      height: 22px;
      border: 2px solid #3498db;
      border-radius: 4px;
      position: relative;
      cursor: pointer;
      transition: all 0.3s;
    }
    .checkbox-label:hover {
      border-color: #2980b9;
    }
    input[type="checkbox"]:checked + .checkbox-label {
      background-color: #2ecc71;
      border-color: #2ecc71;
    }
    input[type="checkbox"]:checked + .checkbox-label:after {
      content: '';
      position: absolute;
      left: 7px;
      top: 3px;
      width: 6px;
      height: 12px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    .todo-title {
      font-size: 16px;
      transition: all 0.3s;
    }
    .completed .todo-title {
      text-decoration: line-through;
      color: #95a5a6;
    }
    .delete-btn {
      background: none;
      border: none;
      color: #e74c3c;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
      padding: 0 5px;
      opacity: 0.5;
      transition: opacity 0.3s;
    }
    .todo-item:hover .delete-btn {
      opacity: 1;
    }
    .delete-btn:hover {
      color: #c0392b;
    }
  `]
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  
  constructor(private todoService: TodoService) {}

  toggleTodo() {
    this.todoService.toggleTodo(this.todo.id);
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id);
  }
}
