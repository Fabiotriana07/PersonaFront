import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-telefonos-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h1>Editar Teléfono</h1>
    <hr />
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <form (ngSubmit)="onSubmit()" #form="ngForm" *ngIf="telefono">
      <div class="mb-3">
        <label class="form-label">Número</label>
        <input type="text" class="form-control" [(ngModel)]="telefono.num" name="num" disabled>
      </div>
      <div class="mb-3">
        <label class="form-label">Operador</label>
        <input type="text" class="form-control" [(ngModel)]="telefono.oper" name="oper">
      </div>
      <div class="mb-3">
        <label class="form-label">Dueño (Persona)</label>
        <select class="form-control" [(ngModel)]="telefono.duenio" name="duenio" required>
          <option value="">Seleccione...</option>
          <option *ngFor="let persona of personas" [value]="persona.cc">
            {{ persona.nombre }} {{ persona.apellido }} (CC: {{ persona.cc }})
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="form.invalid || loading">
        {{ loading ? 'Guardando...' : 'Guardar' }}
      </button>
      <a routerLink="/telefonos" class="btn btn-secondary ms-2">Cancelar</a>
    </form>
  `
})
export class TelefonosEditComponent implements OnInit {
  telefono: any = null;
  personas: any[] = [];
  loading = false;
  error: string | null = null;
  numero: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.numero = this.route.snapshot.paramMap.get('id') || '';
    this.loadTelefono();
    this.loadPersonas();
  }

  loadTelefono(): void {
    this.apiService.getTelefonoByNumero(this.numero).subscribe({
      next: (data) => this.telefono = data,
      error: (err) => this.error = 'Error: ' + err.message
    });
  }

  loadPersonas(): void {
    this.apiService.getPersonas().subscribe({
      next: (data) => this.personas = data,
      error: () => {}
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.apiService.updateTelefono(this.numero, this.telefono).subscribe({
      next: () => this.router.navigate(['/telefonos']),
      error: (err) => {
        this.error = 'Error: ' + (err.error?.mensaje || err.message);
        this.loading = false;
      }
    });
  }
}

