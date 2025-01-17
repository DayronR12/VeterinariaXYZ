import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let router: jasmine.SpyObj<Router>;
  let dialog: MatDialog;
  beforeEach(() => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialog); // Inyectamos el servicio MatDialog
  });

  it('debería mostrar error si el formulario es inválido', () => {
    // Configuramos el formulario para que esté inválido
    component.loginForm.controls['usuario'].setValue('');
    component.loginForm.controls['contra'].setValue('');
    spyOn(console, 'log');

    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Formulario no válido');
  });

  it('debería llamar a loginService y redirigir cuando el formulario es válido', () => {
    const credenciales = { usuario: 'usuario', contra: '1234' };
    component.loginForm.controls['usuario'].setValue(credenciales.usuario);
    component.loginForm.controls['contra'].setValue(credenciales.contra);
    loginService.login.and.returnValue(of({ token: 'fake-token' }));
    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigate');
    component.onSubmit();
    expect(loginService.login).toHaveBeenCalledWith(credenciales);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
    expect(router.navigate).toHaveBeenCalledWith(['/principal']);
  });

  it('should call login service when form is valid', () => {
    const loginService = TestBed.inject(LoginService);
    const router = TestBed.inject(Router);
    spyOn(loginService, 'login').and.returnValue(of({ token: 'fake-token' }));
    spyOn(router, 'navigate');
    
    component.loginForm.setValue({ usuario: 'Usuario1', clave: 'password123' });
    component.onSubmit();
    
    expect(loginService.login).toHaveBeenCalled();
    expect(localStorage.getItem('token')).toBe('fake-token');
    expect(router.navigate).toHaveBeenCalledWith(['/principal']);
  });
  
  it('should not call login service when form is invalid', () => {
    const loginService = TestBed.inject(LoginService);
    spyOn(loginService, 'login');
    
    component.loginForm.setValue({ usuario: '', clave: '' });
    component.onSubmit();
    
    expect(loginService.login).not.toHaveBeenCalled();
  });
  
  
  
});
