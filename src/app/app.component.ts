import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoStatsComponent } from './components/todo-stats/todo-stats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoFormComponent, TodoListComponent, TodoStatsComponent],
  template: `
    <div class="container">
      <header>
        <h1>{{ title }}</h1>
        <p class="subtitle">Aqui pode gerir as suas tarefas diarias!</p>
      </header>
      <main>
        <app-todo-form></app-todo-form>
        <app-todo-stats></app-todo-stats>
        <app-todo-list></app-todo-list>
      </main>
      <footer>
        <p>Desenvolvido com Angular {{ angularVersion }}</p>
        <p>Francisco Melo</p>
      </footer>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      text-align: center;
      margin-bottom: 30px;
    }
    h1 {
      color: #2c3e50;
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    .subtitle {
      color:rgb(32, 250, 86);
      font-size: 1rem;
    }
    p {
      color: #2c3e50;
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
    main {
      background-color: #ffffff;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    footer {
      text-align: center;
      margin-top: 30px;
      color: #95a5a6;
      font-size: 0.9rem;
    }
  `]
})
export class AppComponent {
  title = 'Lista de Tarefas';
  angularVersion = '19.2';
}
