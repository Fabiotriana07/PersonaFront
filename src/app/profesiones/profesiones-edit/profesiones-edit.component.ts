import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profesiones-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h1>Editar Profesión</h1>
    <hr />
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <form (ngSubmit)="onSubmit()" #form="ngForm" *ngIf="profesion">
      <div class="mb-3">
        <label class="form-label">ID</label>
        <input type="number" class="form-control" [(ngModel)]="profesion.id" name="id" disabled>
      </div>
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input type="text" class="form-control" [(ngModel)]="profesion.nom" name="nom" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Descripción</label>
        <textarea class="form-control" [(ngModel)]="profesion.des" name="des" rows="4"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="form.invalid || loading">
        {{ loading ? 'Guardando...' : 'Guardar' }}
      </button>
      <a routerLink="/profesiones" class="btn btn-secondary ms-2">Cancelar</a>
    </form>
  `
})
export class ProfesionesEditComponent implements OnInit {
  profesion: any = null;
  loading = false;
  error: string | null = null;
  id: number = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProfesion();
  }

  loadProfesion(): void {
    this.apiService.getProfesionById(this.id).subscribe({
      next: (data) => this.profesion = data,
      error: (err) => this.error = 'Error: ' + err.message
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.apiService.updateProfesion(this.id, this.profesion).subscribe({
      next: () => this.router.navigate(['/profesiones']),
      error: (err) => {
        this.error = 'Error: ' + (err.error?.mensaje || err.message);
        this.loading = false;
      }
    });
  }
}

