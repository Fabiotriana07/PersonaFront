import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // Configurar headers para ngrok (evitar página de advertencia)
    this.headers = new HttpHeaders({
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true' // Evita la página de advertencia de ngrok
      // Nota: No incluimos 'Content-Type' en GET requests para evitar preflight
    });
  }

  private getOptions() {
    return { 
      headers: this.headers
    };
  }

  private getPostOptions() {
    // Para POST/PUT, sí necesitamos Content-Type
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      })
    };
  }

  // Personas
  getPersonas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/personas`, this.getOptions());
  }

  getPersonaByCc(cc: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/personas/${cc}`, this.getOptions());
  }

  createPersona(persona: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/personas`, persona, this.getPostOptions());
  }

  updatePersona(cc: number, persona: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/personas/${cc}`, persona, this.getPostOptions());
  }

  deletePersona(cc: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/personas/${cc}`, this.getOptions());
  }

  // Profesiones
  getProfesiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesiones`, this.getOptions());
  }

  getProfesionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profesiones/${id}`, this.getOptions());
  }

  createProfesion(profesion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/profesiones`, profesion, this.getPostOptions());
  }

  updateProfesion(id: number, profesion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profesiones/${id}`, profesion, this.getPostOptions());
  }

  deleteProfesion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/profesiones/${id}`, this.getOptions());
  }

  // Teléfonos
  getTelefonos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/telefonos`, this.getOptions());
  }

  getTelefonoByNumero(numero: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/telefonos/${numero}`, this.getOptions());
  }

  createTelefono(telefono: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/telefonos`, telefono, this.getPostOptions());
  }

  updateTelefono(numero: string, telefono: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/telefonos/${numero}`, telefono, this.getPostOptions());
  }

  deleteTelefono(numero: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/telefonos/${numero}`, this.getOptions());
  }

  // Estudios
  getEstudios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estudios`, this.getOptions());
  }

  getEstudioByPersona(ccPersona: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estudios/persona/${ccPersona}`, this.getOptions());
  }

  createEstudio(estudio: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/estudios`, estudio, this.getPostOptions());
  }

  updateEstudio(idProf: number, ccPer: number, estudio: any): Observable<any> {
    // El PUT de estudios no requiere parámetros en la URL, solo el body
    return this.http.put<any>(`${this.apiUrl}/estudios`, estudio, this.getPostOptions());
  }

  deleteEstudio(idProf: number, ccPer: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/estudios/${idProf}/${ccPer}`, this.getOptions());
  }
}

