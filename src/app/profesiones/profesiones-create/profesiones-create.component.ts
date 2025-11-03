import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profesiones-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h1>Crear Nueva Profesión</h1>
    <hr />
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <form (ngSubmit)="onSubmit()" #form="ngForm">
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input type="text" class="form-control" [(ngModel)]="profesion.nom" name="nom" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Descripción</label>
        <textarea class="form-control" [(ngModel)]="profesion.des" name="des" rows="4"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="form.invalid || loading">
        {{ loading ? 'Creando...' : 'Crear' }}
      </button>
      <a routerLink="/profesiones" class="btn btn-secondary ms-2">Cancelar</a>
    </form>
  `
})
export class ProfesionesCreateComponent {
  profesion = { nom: '', des: '' };
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.apiService.createProfesion(this.profesion).subscribe({
      next: () => this.router.navigate(['/profesiones']),
      error: (err) => {
        this.error = 'Error: ' + (err.error?.mensaje || err.message);
        this.loading = false;
      }
    });
  }
}

