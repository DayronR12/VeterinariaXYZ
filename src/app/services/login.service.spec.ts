import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';  // Asegúrate de que la ruta sea correcta
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Asegúrate de importar HttpClientTestingModule
      providers: [LoginService],  // Asegúrate de que el LoginService esté incluido en los providers
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a token when login is successful', () => {
    const service: LoginService = TestBed.inject(LoginService);
    const mockResponse = { token: 'fake-token' };
    
    // Espiar el método login del servicio y devolver un observable con la respuesta falsa
    spyOn(service, 'login').and.returnValue(of(mockResponse));

  });
  
});
