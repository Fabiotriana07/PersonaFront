import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-estudios-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Estudios</h1>
      <div>
        <a routerLink="/estudios/create" class="btn btn-primary me-2">Crear Nuevo Estudio</a>
        <button class="btn btn-info" (click)="getCount()">Ver Conteo Total</button>
      </div>
    </div>
    <div *ngIf="total !== null" class="alert alert-info">Total: <strong>{{ total }}</strong></div>
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID Profesión</th>
          <th>Cédula Persona</th>
          <th>Fecha</th>
          <th>Universidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let estudio of estudios">
          <td>{{ estudio.idProf }}</td>
          <td>{{ estudio.ccPer }}</td>
          <td>{{ estudio.fecha | date:'short' }}</td>
          <td>{{ estudio.univer || '-' }}</td>
          <td>
            <a [routerLink]="['/estudios', estudio.idProf, estudio.ccPer]" class="btn btn-sm btn-info me-1">Detalles</a>
            <a [routerLink]="['/estudios', estudio.idProf, estudio.ccPer, 'edit']" class="btn btn-sm btn-warning me-1">Editar</a>
            <button class="btn btn-sm btn-danger" (click)="deleteEstudio(estudio.idProf, estudio.ccPer)">Eliminar</button>
          </td>
        </tr>
        <tr *ngIf="estudios.length === 0 && !loading"><td colspan="5" class="text-center">No hay estudios</td></tr>
        <tr *ngIf="loading"><td colspan="5" class="text-center">Cargando...</td></tr>
      </tbody>
    </table>
    <a routerLink="/" class="btn btn-secondary">Volver</a>
  `
})
export class EstudiosListComponent implements OnInit {
  estudios: any[] = [];
  loading = false;
  error: string | null = null;
  total: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEstudios();
  }

  loadEstudios(): void {
    this.loading = true;
    this.apiService.getEstudios().subscribe({
      next: (data) => {
        this.estudios = data;
        this.total = data.length;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error: ' + err.message;
        this.loading = false;
      }
    });
  }

  getCount(): void {
    this.total = this.estudios.length;
  }

  deleteEstudio(idProf: number, ccPer: number): void {
    if (confirm('¿Eliminar este estudio?')) {
      this.apiService.deleteEstudio(idProf, ccPer).subscribe({
        next: () => this.loadEstudios(),
        error: (err) => this.error = 'Error: ' + err.message
      });
    }
  }
}

