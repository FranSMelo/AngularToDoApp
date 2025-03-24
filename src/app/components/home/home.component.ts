import { Component } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoStatsComponent } from '../todo-stats/todo-stats.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoFormComponent, TodoListComponent, TodoStatsComponent],
  template: `
    <app-todo-form></app-todo-form>
    <app-todo-stats></app-todo-stats>
    <app-todo-list></app-todo-list>
  `
})
export class HomeComponent {}
