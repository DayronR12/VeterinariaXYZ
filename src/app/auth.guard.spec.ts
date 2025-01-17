import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Asegúrate de que la ruta esté correcta

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Crear un espía para el Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should return true if token is present', () => {
    // Simular que el token está en localStorage
    spyOn(localStorage, 'getItem').and.returnValue('fake_token');

    // Ejecutar canActivate y verificar el comportamiento
    const result = authGuard.canActivate();

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login if token is absent', () => {
    // Simular que no hay token en localStorage
    spyOn(localStorage, 'getItem').and.returnValue(null);

    // Ejecutar canActivate y verificar el comportamiento
    const result = authGuard.canActivate();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
