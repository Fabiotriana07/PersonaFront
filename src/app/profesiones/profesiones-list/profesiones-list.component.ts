import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profesiones-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Profesiones</h1>
      <div>
        <a routerLink="/profesiones/create" class="btn btn-primary me-2">Crear Nueva Profesión</a>
        <button class="btn btn-info" (click)="getCount()">Ver Conteo Total</button>
      </div>
    </div>

    <div *ngIf="total !== null" class="alert alert-info">
      Total de profesiones: <strong>{{ total }}</strong>
    </div>

    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let profesion of profesiones">
          <td>{{ profesion.id }}</td>
          <td>{{ profesion.nom }}</td>
          <td>{{ profesion.des || '-' }}</td>
          <td>
            <a [routerLink]="['/profesiones', profesion.id]" class="btn btn-sm btn-info me-1">Detalles</a>
            <a [routerLink]="['/profesiones', profesion.id, 'edit']" class="btn btn-sm btn-warning me-1">Editar</a>
            <button class="btn btn-sm btn-danger" (click)="deleteProfesion(profesion.id)">Eliminar</button>
          </td>
        </tr>
        <tr *ngIf="profesiones.length === 0 && !loading">
          <td colspan="4" class="text-center">No hay profesiones registradas</td>
        </tr>
        <tr *ngIf="loading">
          <td colspan="4" class="text-center">Cargando...</td>
        </tr>
      </tbody>
    </table>

    <a routerLink="/" class="btn btn-secondary">Volver al Inicio</a>
  `
})
export class ProfesionesListComponent implements OnInit {
  profesiones: any[] = [];
  loading = false;
  error: string | null = null;
  total: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProfesiones();
  }

  loadProfesiones(): void {
    this.loading = true;
    this.apiService.getProfesiones().subscribe({
      next: (data) => {
        this.profesiones = data;
        this.total = data.length;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar profesiones: ' + err.message;
        this.loading = false;
      }
    });
  }

  getCount(): void {
    this.total = this.profesiones.length;
  }

  deleteProfesion(id: number): void {
    if (confirm('¿Está seguro que desea eliminar esta profesión?')) {
      this.apiService.deleteProfesion(id).subscribe({
        next: () => this.loadProfesiones(),
        error: (err) => this.error = 'Error al eliminar: ' + err.message
      });
    }
  }
}

