import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-personas-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Personas</h1>
      <div>
        <a routerLink="/personas/create" class="btn btn-primary me-2">Crear Nueva Persona</a>
        <button class="btn btn-info" (click)="getCount()">Ver Conteo Total</button>
      </div>
    </div>

    <div *ngIf="total !== null" class="alert alert-info">
      Total de personas: <strong>{{ total }}</strong>
    </div>

    <div *ngIf="error" class="alert alert-danger">
      {{ error }}
    </div>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Cédula</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Género</th>
          <th>Edad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let persona of personas">
          <td>{{ persona.cc }}</td>
          <td>{{ persona.nombre }}</td>
          <td>{{ persona.apellido }}</td>
          <td>{{ persona.genero }}</td>
          <td>{{ persona.edad }}</td>
          <td>
            <a [routerLink]="['/personas', persona.cc]" class="btn btn-sm btn-info me-1">Detalles</a>
            <a [routerLink]="['/personas', persona.cc, 'edit']" class="btn btn-sm btn-warning me-1">Editar</a>
            <button class="btn btn-sm btn-danger" (click)="deletePersona(persona.cc)">Eliminar</button>
          </td>
        </tr>
        <tr *ngIf="personas.length === 0 && !loading">
          <td colspan="6" class="text-center">No hay personas registradas</td>
        </tr>
        <tr *ngIf="loading">
          <td colspan="6" class="text-center">Cargando...</td>
        </tr>
      </tbody>
    </table>

    <a routerLink="/" class="btn btn-secondary">Volver al Inicio</a>
  `
})
export class PersonasListComponent implements OnInit {
  personas: Persona[] = [];
  loading = false;
  error: string | null = null;
  total: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.loading = true;
    this.error = null;
    this.apiService.getPersonas().subscribe({
      next: (data) => {
        this.personas = data;
        this.total = data.length;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar personas: ' + err.message;
        this.loading = false;
      }
    });
  }

  getCount(): void {
    this.total = this.personas.length;
  }

  deletePersona(cc: number): void {
    if (confirm('¿Está seguro que desea eliminar esta persona?')) {
      this.apiService.deletePersona(cc).subscribe({
        next: () => {
          this.loadPersonas();
        },
        error: (err) => {
          this.error = 'Error al eliminar persona: ' + err.message;
        }
      });
    }
  }
}

