import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-estudios-details',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <h1>Detalles de Estudio</h1>
    <hr />
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <div *ngIf="estudio && !loading">
      <dl class="row">
        <dt class="col-sm-2">Profesión ID</dt>
        <dd class="col-sm-10">{{ estudio.idProf }}</dd>
        <dt class="col-sm-2">Persona CC</dt>
        <dd class="col-sm-10">{{ estudio.ccPer }}</dd>
        <dt class="col-sm-2">Fecha</dt>
        <dd class="col-sm-10">{{ estudio.fecha | date:'short' }}</dd>
        <dt class="col-sm-2">Universidad</dt>
        <dd class="col-sm-10">{{ estudio.univer || '-' }}</dd>
      </dl>
      <a [routerLink]="['/estudios', estudio.idProf, estudio.ccPer, 'edit']" class="btn btn-warning">Editar</a>
      <a routerLink="/estudios" class="btn btn-secondary ms-2">Volver</a>
    </div>
  `
})
export class EstudiosDetailsComponent implements OnInit {
  estudio: any = null;
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idProf = Number(this.route.snapshot.paramMap.get('idProf'));
    const ccPer = Number(this.route.snapshot.paramMap.get('ccPer'));
    this.loadEstudio(idProf, ccPer);
  }

  loadEstudio(idProf: number, ccPer: number): void {
    this.apiService.getEstudios().subscribe({
      next: (data) => {
        this.estudio = data.find((e: any) => e.idProf === idProf && e.ccPer === ccPer);
        if (!this.estudio) {
          this.error = 'Estudio no encontrado';
        }
      },
      error: (err) => this.error = 'Error: ' + err.message
    });
  }
}

