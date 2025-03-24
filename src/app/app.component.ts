import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  template: `
    <div class="container">
      <header>
        <h1>{{ title }}</h1>
        <p class="subtitle">Aqui pode gerir as suas tarefas diarias!</p>
      </header>
      <main>
        <router-outlet></router-outlet>
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
  title = 'MyReminder';
  angularVersion = '17.0.0';
}
