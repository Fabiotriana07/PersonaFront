import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-personas-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h1>Crear Nueva Persona</h1>
    <hr />

    <div *ngIf="error" class="alert alert-danger">
      {{ error }}
    </div>

    <form (ngSubmit)="onSubmit()" #personaForm="ngForm">
      <div class="mb-3">
        <label for="cc" class="form-label">Cédula</label>
        <input type="number" class="form-control" id="cc" name="cc" 
               [(ngModel)]="persona.cc" required #cc="ngModel">
        <div *ngIf="cc.invalid && cc.touched" class="text-danger">
          La cédula es requerida
        </div>
      </div>

      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="nombre" name="nombre" 
               [(ngModel)]="persona.nombre" required #nombre="ngModel">
        <div *ngIf="nombre.invalid && nombre.touched" class="text-danger">
          El nombre es requerido
        </div>
      </div>

      <div class="mb-3">
        <label for="apellido" class="form-label">Apellido</label>
        <input type="text" class="form-control" id="apellido" name="apellido" 
               [(ngModel)]="persona.apellido" required #apellido="ngModel">
        <div *ngIf="apellido.invalid && apellido.touched" class="text-danger">
          El apellido es requerido
        </div>
      </div>

      <div class="mb-3">
        <label for="genero" class="form-label">Género</label>
        <select class="form-control" id="genero" name="genero" 
                [(ngModel)]="persona.genero" required #genero="ngModel">
          <option value="">Seleccione...</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="O">Otro</option>
        </select>
        <div *ngIf="genero.invalid && genero.touched" class="text-danger">
          El género es requerido
        </div>
      </div>

      <div class="mb-3">
        <label for="edad" class="form-label">Edad</label>
        <input type="number" class="form-control" id="edad" name="edad" 
               [(ngModel)]="persona.edad" required min="1" #edad="ngModel">
        <div *ngIf="edad.invalid && edad.touched" class="text-danger">
          La edad es requerida y debe ser mayor a 0
        </div>
      </div>

      <button type="submit" class="btn btn-primary" [disabled]="personaForm.invalid || loading">
        {{ loading ? 'Creando...' : 'Crear' }}
      </button>
      <a routerLink="/personas" class="btn btn-secondary ms-2">Cancelar</a>
    </form>
  `
})
export class PersonasCreateComponent {
  persona = {
    cc: 0,
    nombre: '',
    apellido: '',
    genero: '',
    edad: 0
  };
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    if (this.loading) return;
    
    this.loading = true;
    this.error = null;
    
    this.apiService.createPersona(this.persona).subscribe({
      next: () => {
        this.router.navigate(['/personas']);
      },
      error: (err) => {
        this.error = 'Error al crear persona: ' + (err.error?.mensaje || err.message);
        this.loading = false;
      }
    });
  }
}

