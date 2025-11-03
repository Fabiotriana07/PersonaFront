import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-personas-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h1>Editar Persona</h1>
    <hr />

    <div *ngIf="error" class="alert alert-danger">
      {{ error }}
    </div>

    <form (ngSubmit)="onSubmit()" #personaForm="ngForm" *ngIf="persona">
      <div class="mb-3">
        <label for="cc" class="form-label">Cédula</label>
        <input type="number" class="form-control" id="cc" name="cc" 
               [(ngModel)]="persona.cc" disabled>
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
        {{ loading ? 'Guardando...' : 'Guardar' }}
      </button>
      <a routerLink="/personas" class="btn btn-secondary ms-2">Cancelar</a>
    </form>
  `
})
export class PersonasEditComponent implements OnInit {
  persona: any = null;
  loading = false;
  error: string | null = null;
  cc: number = 0;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cc = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPersona();
  }

  loadPersona(): void {
    this.loading = true;
    this.apiService.getPersonaByCc(this.cc).subscribe({
      next: (data) => {
        this.persona = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar persona: ' + err.message;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.loading || !this.persona) return;
    
    this.loading = true;
    this.error = null;
    
    this.apiService.updatePersona(this.cc, this.persona).subscribe({
      next: () => {
        this.router.navigate(['/personas']);
      },
      error: (err) => {
        this.error = 'Error al actualizar persona: ' + (err.error?.mensaje || err.message);
        this.loading = false;
      }
    });
  }
}

