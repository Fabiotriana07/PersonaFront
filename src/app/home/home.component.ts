import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="text-center">
      <h1 class="display-4 mb-4">Bienvenido a Person API</h1>
      <p class="lead mb-5">Sistema de gestión de personas, profesiones, estudios y teléfonos</p>
      
      <div class="row">
        <div class="col-md-3 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Personas</h5>
              <p class="card-text">Gestión de personas</p>
              <a routerLink="/personas" class="btn btn-primary">Ir a Personas</a>
            </div>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Profesiones</h5>
              <p class="card-text">Gestión de profesiones</p>
              <a routerLink="/profesiones" class="btn btn-primary">Ir a Profesiones</a>
            </div>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Teléfonos</h5>
              <p class="card-text">Gestión de teléfonos</p>
              <a routerLink="/telefonos" class="btn btn-primary">Ir a Teléfonos</a>
            </div>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Estudios</h5>
              <p class="card-text">Gestión de estudios</p>
              <a routerLink="/estudios" class="btn btn-primary">Ir a Estudios</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Documentación API</h5>
              <p class="card-text">Accede a la documentación interactiva de Swagger</p>
              <a href="http://localhost:5204/swagger" target="_blank" class="btn btn-success">Ver Swagger</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
}

