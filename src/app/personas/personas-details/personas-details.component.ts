import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-personas-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1>Detalles de Persona</h1>
    <hr />

    <div *ngIf="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div *ngIf="persona && !loading">
      <dl class="row">
        <dt class="col-sm-2">Cédula</dt>
        <dd class="col-sm-10">{{ persona.cc }}</dd>
        <dt class="col-sm-2">Nombre</dt>
        <dd class="col-sm-10">{{ persona.nombre }}</dd>
        <dt class="col-sm-2">Apellido</dt>
        <dd class="col-sm-10">{{ persona.apellido }}</dd>
        <dt class="col-sm-2">Género</dt>
        <dd class="col-sm-10">{{ persona.genero }}</dd>
        <dt class="col-sm-2">Edad</dt>
        <dd class="col-sm-10">{{ persona.edad }}</dd>
      </dl>
      <div>
        <a [routerLink]="['/personas', persona.cc, 'edit']" class="btn btn-warning">Editar</a>
        <a routerLink="/personas" class="btn btn-secondary ms-2">Volver a la Lista</a>
      </div>
    </div>

    <div *ngIf="loading" class="text-center">
      Cargando...
    </div>
  `
})
export class PersonasDetailsComponent implements OnInit {
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
}

