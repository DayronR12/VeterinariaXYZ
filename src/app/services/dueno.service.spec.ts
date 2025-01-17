import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DuenoService } from './dueno.service';
import { Dueno } from '../interfaces/dueno'; // Tu interfaz Dueno
import { environment } from '../utils/environments';

describe('DuenoService', () => {
  let service: DuenoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DuenoService]
    });
    service = TestBed.inject(DuenoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new dueno', () => {
    const duenoMock: Dueno = {
      id: 1,
      nombreDueno: 'Juan',
      tipoIdentificacionDueno: 'C.C.',
      identificacionDueno: '1234567890',
      ciudad: 'Bogotá',
      direccion: 'Calle Ficticia',
      telefono: '1234567890'
    };

    service.crearDueno(duenoMock).subscribe((response) => {
      expect(response).toEqual(duenoMock);
    });

    const req = httpMock.expectOne(`${environment.urlBack}/api/duenos`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(duenoMock);
    req.flush(duenoMock); // Simula una respuesta del servidor
  });

  it('should fetch a list of duenos', () => {
    const duenosMock: Dueno[] = [
      {
        id: 1,
        nombreDueno: 'Juan',
        tipoIdentificacionDueno: 'C.C.',
        identificacionDueno: '1234567890',
        ciudad: 'Bogotá',
        direccion: 'Calle Ficticia',
        telefono: '1234567890'
      },
      {
        id: 2,
        nombreDueno: 'Maria',
        tipoIdentificacionDueno: 'C.C.',
        identificacionDueno: '9876543210',
        ciudad: 'Medellín',
        direccion: 'Calle Real',
        telefono: '9876543210'
      }
    ];

    service.obtenerDuenos().subscribe((response) => {
      expect(response).toEqual(duenosMock);
    });

    const req = httpMock.expectOne(`${environment.urlBack}/api/duenos`);
    expect(req.request.method).toBe('GET');
    req.flush(duenosMock); // Simula una respuesta del servidor
  });

  it('should fetch a single dueno by ID', () => {
    const duenoMock: Dueno = {
      id: 1,
      nombreDueno: 'Juan',
      tipoIdentificacionDueno: 'C.C.',
      identificacionDueno: '1234567890',
      ciudad: 'Bogotá',
      direccion: 'Calle Ficticia',
      telefono: '1234567890'
    };

    service.obtenerDueno(1).subscribe((response) => {
      expect(response).toEqual(duenoMock);
    });

    const req = httpMock.expectOne(`${environment.urlBack}/api/duenos/1`);
    expect(req.request.method).toBe('GET');
    req.flush(duenoMock); // Simula una respuesta del servidor
  });

  it('should update an existing dueno', () => {
    const duenoMock: Dueno = {
      id: 1,
      nombreDueno: 'Juan',
      tipoIdentificacionDueno: 'C.C.',
      identificacionDueno: '1234567890',
      ciudad: 'Bogotá',
      direccion: 'Calle Ficticia',
      telefono: '1234567890'
    };

    service.actualizarDueno(1, duenoMock).subscribe((response) => {
      expect(response).toEqual(duenoMock);
    });

    const req = httpMock.expectOne(`${environment.urlBack}/api/duenos/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(duenoMock);
    req.flush(duenoMock); // Simula una respuesta del servidor
  });

  it('should delete a dueno', () => {
    service.eliminarDueno(1).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.urlBack}/api/duenos/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simula una respuesta vacía del servidor
  });

  afterEach(() => {
    httpMock.verify();
  });
});
