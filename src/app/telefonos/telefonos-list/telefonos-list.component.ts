import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-telefonos-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Teléfonos</h1>
      <div>
        <a routerLink="/telefonos/create" class="btn btn-primary me-2">Crear Nuevo Teléfono</a>
        <button class="btn btn-info" (click)="getCount()">Ver Conteo Total</button>
      </div>
    </div>
    <div *ngIf="total !== null" class="alert alert-info">Total: <strong>{{ total }}</strong></div>
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Número</th>
          <th>Operador</th>
          <th>Cédula Dueño</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let telefono of telefonos">
          <td>{{ telefono.num }}</td>
          <td>{{ telefono.oper || '-' }}</td>
          <td>{{ telefono.duenio }}</td>
          <td>
            <a [routerLink]="['/telefonos', telefono.num]" class="btn btn-sm btn-info me-1">Detalles</a>
            <a [routerLink]="['/telefonos', telefono.num, 'edit']" class="btn btn-sm btn-warning me-1">Editar</a>
            <button class="btn btn-sm btn-danger" (click)="deleteTelefono(telefono.num)">Eliminar</button>
          </td>
        </tr>
        <tr *ngIf="telefonos.length === 0 && !loading"><td colspan="4" class="text-center">No hay teléfonos</td></tr>
        <tr *ngIf="loading"><td colspan="4" class="text-center">Cargando...</td></tr>
      </tbody>
    </table>
    <a routerLink="/" class="btn btn-secondary">Volver</a>
  `
})
export class TelefonosListComponent implements OnInit {
  telefonos: any[] = [];
  loading = false;
  error: string | null = null;
  total: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTelefonos();
  }

  loadTelefonos(): void {
    this.loading = true;
    this.apiService.getTelefonos().subscribe({
      next: (data) => {
        this.telefonos = data;
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
    this.total = this.telefonos.length;
  }

  deleteTelefono(num: string): void {
    if (confirm('¿Eliminar este teléfono?')) {
      this.apiService.deleteTelefono(num).subscribe({
        next: () => this.loadTelefonos(),
        error: (err) => this.error = 'Error: ' + err.message
      });
    }
  }
}

