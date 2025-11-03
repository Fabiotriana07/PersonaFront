import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Personas
  getPersonas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/personas`);
  }

  getPersonaByCc(cc: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/personas/${cc}`);
  }

  createPersona(persona: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/personas`, persona);
  }

  updatePersona(cc: number, persona: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/personas/${cc}`, persona);
  }

  deletePersona(cc: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/personas/${cc}`);
  }

  // Profesiones
  getProfesiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesiones`);
  }

  getProfesionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profesiones/${id}`);
  }

  createProfesion(profesion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/profesiones`, profesion);
  }

  updateProfesion(id: number, profesion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profesiones/${id}`, profesion);
  }

  deleteProfesion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/profesiones/${id}`);
  }

  // Teléfonos
  getTelefonos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/telefonos`);
  }

  getTelefonoByNumero(numero: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/telefonos/${numero}`);
  }

  createTelefono(telefono: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/telefonos`, telefono);
  }

  updateTelefono(numero: string, telefono: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/telefonos/${numero}`, telefono);
  }

  deleteTelefono(numero: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/telefonos/${numero}`);
  }

  // Estudios
  getEstudios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estudios`);
  }

  getEstudioByPersona(ccPersona: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estudios/persona/${ccPersona}`);
  }

  createEstudio(estudio: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/estudios`, estudio);
  }

  updateEstudio(idProf: number, ccPer: number, estudio: any): Observable<any> {
    // El PUT de estudios no requiere parámetros en la URL, solo el body
    return this.http.put<any>(`${this.apiUrl}/estudios`, estudio);
  }

  deleteEstudio(idProf: number, ccPer: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/estudios/${idProf}/${ccPer}`);
  }
}

