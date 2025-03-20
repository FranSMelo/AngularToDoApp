import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-stats',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="stats-container">
      <div class="stats-item">
        <span class="stat-value">{{ todoService.totalCount() }}</span>
        <span class="stat-label">Total</span>
      </div>
      
      <div class="stats-item">
        <span class="stat-value" [ngClass]="{'highlight': todoService.pendingCount() > 0}">
          {{ todoService.pendingCount() }}
        </span>
        <span class="stat-label">Pendentes</span>
      </div>
      
      <div class="stats-item">
        <span class="stat-value" [ngClass]="{'highlight': todoService.completedCount() > 0}">
          {{ todoService.completedCount() }}
        </span>
        <span class="stat-label">Concluídas</span>
      </div>
      
      <div class="stats-item progress-container">
        <div class="progress-bar">
          <div class="progress" [style.width.%]="todoService.completionRate()"></div>
        </div>
        <span class="stat-label">{{ todoService.completionRate() }}% concluído</span>
      </div>
    </div>
    
    <div class="actions">
      <button class="action-btn" (click)="todoService.markAllCompleted()">
        Marcar Todas como Concluídas
      </button>
      <button class="action-btn danger" (click)="todoService.clearCompleted()">
        Limpar Concluídas
      </button>
    </div>
  `,
  styles: [`
    .stats-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr) 2fr;
      gap: 15px;
      margin-bottom: 20px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 8px;
    }
    
    .stats-item {
      text-align: center;
      display: flex;
      flex-direction: column;
    }
    
    .stat-value {
      font-size: 1.8rem;
      font-weight: bold;
      color: #2c3e50;
    }
    
    .stat-label {
      font-size: 0.8rem;
      color: #7f8c8d;
      margin-top: 5px;
    }
    
    .highlight {
      color: #3498db;
    }
    
    .progress-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .progress-bar {
      width: 100%;
      height: 10px;
      background-color: #ecf0f1;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 5px;
    }
    
    .progress {
      height: 100%;
      background-color: #2ecc71;
      border-radius: 5px;
      transition: width 0.3s ease;
    }
    
    .actions {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    
    .action-btn {
      padding: 8px 12px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 0.9rem;
      transition: background-color 0.3s;
    }
    
    .action-btn:hover {
      background-color: #2980b9;
    }
    
    .danger {
      background-color: #e74c3c;
    }
    
    .danger:hover {
      background-color: #c0392b;
    }
  `]
})
export class TodoStatsComponent {
  constructor(protected todoService: TodoService) {}
}
