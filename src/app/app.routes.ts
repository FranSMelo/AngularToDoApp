import { Routes } from '@angular/router';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'todo/:id', component: TodoDetailsComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];
