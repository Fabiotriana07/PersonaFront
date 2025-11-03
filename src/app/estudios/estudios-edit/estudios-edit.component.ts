import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-estudios-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h1>Editar Estudio</h1>
    <hr />
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <form (ngSubmit)="onSubmit()" #form="ngForm" *ngIf="estudio">
      <div class="mb-3">
        <label class="form-label">Profesión ID</label>
        <input type="number" class="form-control" [(ngModel)]="estudio.idProf" name="idProf" disabled>
      </div>
      <div class="mb-3">
        <label class="form-label">Persona CC</label>
        <input type="number" class="form-control" [(ngModel)]="estudio.ccPer" name="ccPer" disabled>
      </div>
      <div class="mb-3">
        <label class="form-label">Fecha</label>
        <input type="date" class="form-control" [(ngModel)]="estudio.fecha" name="fecha" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Universidad</label>
        <input type="text" class="form-control" [(ngModel)]="estudio.univer" name="univer">
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="form.invalid || loading">
        {{ loading ? 'Guardando...' : 'Guardar' }}
      </button>
      <a routerLink="/estudios" class="btn btn-secondary ms-2">Cancelar</a>
    </form>
  `
})
export class EstudiosEditComponent implements OnInit {
  estudio: any = null;
  loading = false;
  error: string | null = null;
  idProf: number = 0;
  ccPer: number = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.idProf = Number(this.route.snapshot.paramMap.get('idProf'));
    this.ccPer = Number(this.route.snapshot.paramMap.get('ccPer'));
    this.loadEstudio();
  }

  loadEstudio(): void {
    this.apiService.getEstudios().subscribe({
      next: (data) => {
        this.estudio = data.find((e: any) => e.idProf === this.idProf && e.ccPer === this.ccPer);
        if (this.estudio) {
          // Convertir fecha a formato YYYY-MM-DD para el input date
          const fecha = new Date(this.estudio.fecha);
          this.estudio.fecha = fecha.toISOString().split('T')[0];
        }
      },
      error: (err) => this.error = 'Error: ' + err.message
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.apiService.updateEstudio(this.idProf, this.ccPer, this.estudio).subscribe({
      next: () => this.router.navigate(['/estudios']),
      error: (err) => {
        this.error = 'Error: ' + (err.error?.mensaje || err.message);
        this.loading = false;
      }
    });
  }
}

