import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PacienteService } from './paciente.service';
import { Paciente } from '../interfaces/paciente';
import { environment } from '../utils/environments';

describe('PacienteService', () => {
  let service: PacienteService;
  let httpMock: HttpTestingController;

  // Paciente de ejemplo para las pruebas
  const pacienteMock: Paciente = {
    id: 1,
    primerNombre: 'Juan',
    primerApellido: 'Pérez',
    edad: 30,
    telefono: '1234567890',
    direccion: 'Calle Ficticia 123'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PacienteService]
    });

    service = TestBed.inject(PacienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica si hay solicitudes pendientes
    httpMock.verify();
  });

  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new paciente', () => {
    service.crearPaciente(pacienteMock).subscribe((paciente) => {
      expect(paciente).toEqual(pacienteMock);
    });

    const req = httpMock.expectOne(`${environment.urlBack}/pacientes`);
    expect(req.request.method).toBe('POST');
    req.flush(pacienteMock);
  });

  it('should fetch pacientes', () => {
    const pacientesMock: Paciente[] = [pacienteMock];

    service.obtenerPacientes().subscribe((pacientes) => {
      expect(pacientes.length).toBe(1);
      expect(pacientes).toEqual(pacientesMock);
    });

    const req = httpMock.expectOne(`${environment.urlBack}/pacientes`);
    expect(req.request.method).toBe('GET');
    req.flush(pacientesMock);
  });

  it('should fetch a single paciente by id', () => {
    service.obtenerPaciente(1).subscribe((paciente) => {
      expect(paciente).toEqual(pacienteMock);
    });

    const req = httpMock.expectOne(`${environment.urlBack}/pacientes/1`);
    expect(req.request.method).toBe('GET');
    req.flush(pacienteMock);
  });

  it('should update a paciente', () => {
    const updatedPaciente = { ...pacienteMock, nombre: 'Juan Pérez Actualizado' };

    service.actualizarPaciente(1, updatedPaciente).subscribe((paciente) => {
      expect(paciente).toEqual(updatedPaciente);
    });

    const req = httpMock.expectOne(`${environment.urlBack}/pacientes/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPaciente);
  });

  it('should delete a paciente', () => {
    service.eliminarPaciente(1).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.urlBack}/pacientes/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
