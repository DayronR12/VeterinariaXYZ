import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dueno } from '../interfaces/dueno'; // Tu modelo de dueño
import { environment } from '../utils/environments';

@Injectable({
  providedIn: 'root'
})
export class DuenoService {
  private url = `${environment.urlBack}/api/duenos`; // Cambia esta URL según tu configuración

  constructor(private http: HttpClient) {}

  // Crear un nuevo dueño
  crearDueno(dueno: Dueno): Observable<Dueno> {
    return this.http.post<Dueno>(this.url, dueno);
  }

  // Obtener lista de dueños
  obtenerDuenos(): Observable<Dueno[]> {
    return this.http.get<Dueno[]>(this.url);
  }

  // Obtener un solo dueño por su ID
  obtenerDueno(id: number): Observable<Dueno> {
    return this.http.get<Dueno>(`${this.url}/${id}`);
  }

  // Actualizar un dueño existente
  actualizarDueno(id: number, dueno: Dueno): Observable<Dueno> {
    return this.http.put<Dueno>(`${this.url}/${id}`, dueno);
  }

  // Eliminar un dueño
  eliminarDueno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
