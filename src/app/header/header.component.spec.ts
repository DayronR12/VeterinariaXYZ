import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';  // Importar MatToolbarModule en el módulo de pruebas
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let router: jasmine.SpyObj<Router>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatToolbarModule],  // Asegúrate de incluir MatToolbarModule en las pruebas
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería eliminar el token y redirigir al login', () => {
    spyOn(localStorage, 'removeItem');  // Espiar el método removeItem de localStorage
    spyOn(router, 'navigate');  // Espiar el método navigate del router

    component.cerrarSesion();  // Llamar al método cerrarSesion

    // Verificar que se haya eliminado el token de localStorage
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');

    // Verificar que se haya navegado a la ruta '/login'
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
