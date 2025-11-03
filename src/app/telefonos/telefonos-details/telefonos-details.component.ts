import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-telefonos-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1>Detalles de Teléfono</h1>
    <hr />
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <div *ngIf="telefono && !loading">
      <dl class="row">
        <dt class="col-sm-2">Número</dt>
        <dd class="col-sm-10">{{ telefono.num }}</dd>
        <dt class="col-sm-2">Operador</dt>
        <dd class="col-sm-10">{{ telefono.oper || '-' }}</dd>
        <dt class="col-sm-2">Cédula Dueño</dt>
        <dd class="col-sm-10">{{ telefono.duenio }}</dd>
      </dl>
      <a [routerLink]="['/telefonos', telefono.num, 'edit']" class="btn btn-warning">Editar</a>
      <a routerLink="/telefonos" class="btn btn-secondary ms-2">Volver</a>
    </div>
  `
})
export class TelefonosDetailsComponent implements OnInit {
  telefono: any = null;
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const numero = this.route.snapshot.paramMap.get('id') || '';
    this.apiService.getTelefonoByNumero(numero).subscribe({
      next: (data) => this.telefono = data,
      error: (err) => this.error = 'Error: ' + err.message
    });
  }
}

