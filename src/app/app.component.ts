import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Person API</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/personas" routerLinkActive="active">Personas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/profesiones" routerLinkActive="active">Profesiones</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/telefonos" routerLinkActive="active">Teléfonos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/estudios" routerLinkActive="active">Estudios</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar-nav .nav-link.active {
      font-weight: bold;
    }
  `]
})
export class AppComponent {
  title = 'Person API - Frontend';
}

