import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profesiones-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1>Detalles de Profesión</h1>
    <hr />
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <div *ngIf="profesion && !loading">
      <dl class="row">
        <dt class="col-sm-2">ID</dt>
        <dd class="col-sm-10">{{ profesion.id }}</dd>
        <dt class="col-sm-2">Nombre</dt>
        <dd class="col-sm-10">{{ profesion.nom }}</dd>
        <dt class="col-sm-2">Descripción</dt>
        <dd class="col-sm-10">{{ profesion.des || '-' }}</dd>
      </dl>
      <a [routerLink]="['/profesiones', profesion.id, 'edit']" class="btn btn-warning">Editar</a>
      <a routerLink="/profesiones" class="btn btn-secondary ms-2">Volver</a>
    </div>
  `
})
export class ProfesionesDetailsComponent implements OnInit {
  profesion: any = null;
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getProfesionById(id).subscribe({
      next: (data) => this.profesion = data,
      error: (err) => this.error = 'Error: ' + err.message
    });
  }
}

