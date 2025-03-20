import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="todo-form">
      <input 
        type="text" 
        placeholder="O que precisa ser feito?" 
        [(ngModel)]="newTodoTitle" 
        (keyup.enter)="addTodo()"
        class="todo-input"
      />
      <button (click)="addTodo()" class="add-button" [disabled]="!newTodoTitle.trim()">
        <span>Adicionar</span>
      </button>
    </div>
  `,
  styles: [`
    .todo-form {
      display: flex;
      margin-bottom: 25px;
      gap: 10px;
    }
    .todo-input {
      flex: 1;
      padding: 12px 15px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      transition: border-color 0.3s;
    }
    .todo-input:focus {
      border-color: #3498db;
      outline: none;
    }
    .add-button {
      padding: 0 20px;
      background-color: #2ecc71;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
      display: flex;
      align-items: center;
    }
    .add-button:hover:not([disabled]) {
      background-color: #27ae60;
    }
    .add-button[disabled] {
      background-color: #95a5a6;
      cursor: not-allowed;
      opacity: 0.7;
    }
  `]
})
export class TodoFormComponent {
  newTodoTitle = '';

  constructor(private todoService: TodoService) {}

  addTodo() {
    this.todoService.addTodo(this.newTodoTitle);
    this.newTodoTitle = '';
  }
}
