import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="details-container" *ngIf="todo">
      <div class="details-header">
        <h2>Detalhes da Tarefa</h2>
        <button class="back-button" (click)="goBack()">Voltar à Lista</button>
      </div>
      
      <div class="details-form">
        <div class="form-group">
          <label for="title">Título</label>
          <input 
            type="text" 
            id="title"
            [(ngModel)]="editedTodo.title" 
            class="detail-input"
          />
        </div>
        
        <div class="form-group">
          <label for="description">Descrição</label>
          <textarea 
            id="description"
            [(ngModel)]="editedTodo.description" 
            class="detail-textarea"
            placeholder="Adicione uma descrição para esta tarefa..."
            rows="4"
          ></textarea>
        </div>
        
        <div class="form-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              [(ngModel)]="editedTodo.completed"
            />
            <span>Concluída</span>
          </label>
        </div>
        
        <div class="details-actions">
          <button 
            class="action-btn save" 
            (click)="saveTodo()" 
            [disabled]="!isChanged()"
          >
            Salvar Alterações
          </button>
          <button class="action-btn danger" (click)="deleteTodo()">
            Excluir Tarefa
          </button>
        </div>
      </div>
    </div>
    <div class="details-container error" *ngIf="!todo && !loading">
      <div class="empty-state">
        <div class="empty-icon">❓</div>
        <p>Tarefa não encontrada</p>
        <button class="back-button" (click)="goBack()">Voltar à Lista</button>
      </div>
    </div>
    <div class="details-container" *ngIf="loading">
      <div class="empty-state">
        <div class="empty-icon">⌛</div>
        <p>Carregando...</p>
      </div>
    </div>
  `,
  styles: [`
    .details-container {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .details-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    
    h2 {
      color: #2c3e50;
      margin: 0;
    }
    
    .back-button {
      background-color: #95a5a6;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 8px 15px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }
    
    .back-button:hover {
      background-color: #7f8c8d;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      color: #2c3e50;
      font-weight: 500;
    }
    
    .detail-input, .detail-textarea {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      transition: border-color 0.3s;
      box-sizing: border-box;
    }
    
    .detail-input:focus, .detail-textarea:focus {
      border-color: #3498db;
      outline: none;
    }
    
    .checkbox-group label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    
    .checkbox-group input {
      margin-right: 10px;
    }
    
    .details-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }
    
    .action-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    
    .save {
      background-color: #2ecc71;
      color: white;
    }
    
    .save:hover:not([disabled]) {
      background-color: #27ae60;
    }
    
    .save[disabled] {
      background-color: #95a5a6;
      cursor: not-allowed;
      opacity: 0.7;
    }
    
    .danger {
      background-color: #e74c3c;
      color: white;
    }
    
    .danger:hover {
      background-color: #c0392b;
    }
    
    .empty-state {
      text-align: center;
      padding: 30px 0;
    }
    
    .empty-icon {
      font-size: 40px;
      margin-bottom: 15px;
    }
  `]
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo | null = null;
  editedTodo: Todo = {} as Todo;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const todoId = params.get('id');
      if (todoId) {
        this.loadTodo(todoId);
      } else {
        this.loading = false;
      }
    });
  }

  async loadTodo(id: string | number) {
    this.loading = true;
    try {
      const todo = await this.todoService.getTodoById(id);
      this.todo = todo;
      if (todo) {
        // Create a copy to track changes
        this.editedTodo = { ...todo };
      }
    } catch (error) {
      console.error('Error loading todo details:', error);
    } finally {
      this.loading = false;
    }
  }

  isChanged(): boolean {
    if (!this.todo) return false;
    return this.todo.title !== this.editedTodo.title ||
           this.todo.completed !== this.editedTodo.completed ||
           this.todo.description !== this.editedTodo.description;
  }

  async saveTodo() {
    if (!this.todo || !this.isChanged()) return;
    
    try {
      await this.todoService.updateTodo(this.editedTodo);
      // Update our local reference after save
      this.todo = { ...this.editedTodo };
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  }

  async deleteTodo() {
    if (!this.todo) return;
    
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await this.todoService.deleteTodo(this.todo.id);
        this.goBack();
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
