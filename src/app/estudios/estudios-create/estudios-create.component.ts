import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-estudios-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h1>Crear Nuevo Estudio</h1>
    <hr />
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <form (ngSubmit)="onSubmit()" #form="ngForm">
      <div class="mb-3">
        <label class="form-label">Profesión</label>
        <select class="form-control" [(ngModel)]="estudio.idProf" name="idProf" required>
          <option value="">Seleccione una profesión...</option>
          <option *ngFor="let profesion of profesiones" [value]="profesion.id">
            {{ profesion.nom }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Persona</label>
        <select class="form-control" [(ngModel)]="estudio.ccPer" name="ccPer" required>
          <option value="">Seleccione una persona...</option>
          <option *ngFor="let persona of personas" [value]="persona.cc">
            {{ persona.nombre }} {{ persona.apellido }} (CC: {{ persona.cc }})
          </option>
        </select>
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
        {{ loading ? 'Creando...' : 'Crear' }}
      </button>
      <a routerLink="/estudios" class="btn btn-secondary ms-2">Cancelar</a>
    </form>
  `
})
export class EstudiosCreateComponent implements OnInit {
  estudio = { idProf: 0, ccPer: 0, fecha: '', univer: '' };
  personas: any[] = [];
  profesiones: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadPersonas();
    this.loadProfesiones();
  }

  loadPersonas(): void {
    this.apiService.getPersonas().subscribe({
      next: (data) => this.personas = data,
      error: () => {}
    });
  }

  loadProfesiones(): void {
    this.apiService.getProfesiones().subscribe({
      next: (data) => this.profesiones = data,
      error: () => {}
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.apiService.createEstudio(this.estudio).subscribe({
      next: () => this.router.navigate(['/estudios']),
      error: (err) => {
        this.error = 'Error: ' + (err.error?.mensaje || err.message);
        this.loading = false;
      }
    });
  }
}

