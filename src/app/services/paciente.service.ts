import { Injectable } from '@angular/core';
import { environment } from '../utils/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private url = `${environment.urlBack}/pacientes`;

  constructor(private http: HttpClient) { }

  crearPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.url}`, paciente);
  }
  

    obtenerPacientes(): Observable<Paciente[]> {
      return this.http.get<Paciente[]>(this.url);
    }


    obtenerPaciente(id:number): Observable<Paciente> {
      return this.http.get<Paciente>(`${this.url}/${id}`);
    }



    actualizarPaciente(id: number, paciente: Paciente): Observable<Paciente> {
      return this.http.put<Paciente>(`${this.url}/${id}`, paciente);
    }

    eliminarPaciente(id: number): Observable<void> {
      return this.http.delete<void>(`${this.url}/${id}`);
    }


}
