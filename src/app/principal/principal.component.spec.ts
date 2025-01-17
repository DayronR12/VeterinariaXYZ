import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalComponent } from './principal.component';  // Asegúrate de que el nombre del componente sea correcto
import { MatDialog } from '@angular/material/dialog';
import { DuenoService } from '../services/dueno.service';
import { PacienteService } from '../services/paciente.service';
import { of } from 'rxjs';
import * as XLSX from 'xlsx';

describe('PrincipalComponent', () => {
  let component: PrincipalComponent;
  let fixture: ComponentFixture<PrincipalComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let duenoService: jasmine.SpyObj<DuenoService>;
  let pacienteService: jasmine.SpyObj<PacienteService>;

  beforeEach(() => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const duenoServiceSpy = jasmine.createSpyObj('DuenoService', ['obtenerDuenos']);
    const pacienteServiceSpy = jasmine.createSpyObj('PacienteService', ['obtenerPacientes']);

    TestBed.configureTestingModule({
      declarations: [PrincipalComponent],  // Asegúrate de que el nombre del componente sea correcto
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: DuenoService, useValue: duenoServiceSpy },
        { provide: PacienteService, useValue: pacienteServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(PrincipalComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    duenoService = TestBed.inject(DuenoService) as jasmine.SpyObj<DuenoService>;
    pacienteService = TestBed.inject(PacienteService) as jasmine.SpyObj<PacienteService>;
    fixture.detectChanges();
  });

  it('should open the modal when abrirModal is called', () => {
    // Actúa: Llamamos al método que queremos probar
    component.abrirModal();
  
    // Assert: Verificamos que el método 'open' del dialog haya sido llamado
    expect(dialog.open).toHaveBeenCalled();
    // Assert adicional: Aseguramos que el modal se abra de forma esperada
    expect(dialog.open).toHaveBeenCalledWith(component.modal); 
  });
  
  it('should open the modal with the correct modal when abrirModaldu is called', () => {
    // Actúa: Llamamos al método que queremos probar
    component.abrirModaldu();
  
    // Assert: Verificamos que el método 'open' haya sido llamado
    expect(dialog.open).toHaveBeenCalled();
    // Assert adicional: Aseguramos que el modal correcto haya sido abierto
    expect(dialog.open).toHaveBeenCalledWith(component.modalCrearDueno);
  });
  
  it('should call obtenerDuenos when the component initializes', () => {
    // Actúa: Espiamos el método 'obtenerDuenos' para verificar si es llamado
    spyOn(component, 'obtenerDuenos');
    
    // Llamamos a 'ngOnInit', que debería invocar 'obtenerDuenos'
    component.ngOnInit();  
  
    // Assert: Verificamos que 'obtenerDuenos' haya sido llamado
    expect(component.obtenerDuenos).toHaveBeenCalled();
  });
  
  it('should call obtenerPacientes when the component initializes', () => {
    // Actúa: Espiamos el método 'obtenerPacientes' para verificar si es llamado
    spyOn(component, 'obtenerPacientes');
    
    // Llamamos a 'ngOnInit', que debería invocar 'obtenerPacientes'
    component.ngOnInit();  
  
    // Assert: Verificamos que 'obtenerPacientes' haya sido llamado
    expect(component.obtenerPacientes).toHaveBeenCalled();
  });
  
  it('should correctly fetch the owners from the service', () => {
    // Actúa: Definimos un mock de los datos esperados
    const duenosMock = [{
      id: 1,
      nombreDueno: 'Juan',
      tipoIdentificacionDueno: 'CC',
      identificacionDueno: '1234567890',
      ciudad: 'Bogotá',
      direccion: 'Calle 123',
      telefono: '3001234567'
    }];
    
    // Simulamos que el servicio devuelve los dueños mockeados
    duenoService.obtenerDuenos.and.returnValue(of(duenosMock));
    
    // Llamamos al método 'obtenerDuenos'
    component.obtenerDuenos();  
    
    // Assert: Verificamos que los dueños fueron correctamente asignados al componente
    expect(component.duenos).toEqual(duenosMock);
  });
  
  it('should correctly fetch the patients from the service', () => {
    // Actúa: Definimos un mock de los datos esperados
    const pacientesMock = [{
      id: 1,
      nombrePaciente: 'Carlos',
      primerNombre: 'Carlos',
      primerApellido: 'Pérez',
      edad: 30,
      telefono: '3001234567',
      direccion: 'Calle 456'
    }];
    
    // Simulamos que el servicio devuelve los pacientes mockeados
    pacienteService.obtenerPacientes.and.returnValue(of(pacientesMock));
    
    // Llamamos al método 'obtenerPacientes'
    component.obtenerPacientes();  
    
    // Assert: Verificamos que los pacientes fueron correctamente asignados al componente
    expect(component.pacientes).toEqual(pacientesMock);
  });
  
  it('should assign the correct patient and open the modal when editing a patient', () => {
    // Actúa: Definimos un paciente mock
    const pacienteMock = { id: 1, nombrePaciente: 'Carlos' };
    
    // Espiamos el método 'abrirModal' para verificar que haya sido llamado
    spyOn(component, 'abrirModal');
    
    // Llamamos al método 'editarPaciente'
    component.editarPaciente(pacienteMock);
    
    // Assert: Verificamos que el paciente sea correctamente asignado
    expect(component.paciente).toEqual(pacienteMock);
    // Assert adicional: Verificamos que el modal haya sido abierto
    expect(component.abrirModal).toHaveBeenCalled();
  });
  
  it('should assign the correct owner and open the modal when editing an owner', () => {
    // Actúa: Definimos un dueño mock
    const duenoMock = { id: 1, nombreDueno: 'Juan' };
    
    // Espiamos el método 'abrirModaldu' para verificar que haya sido llamado
    spyOn(component, 'abrirModaldu');
    
    // Llamamos al método 'editarDueno'
    component.editarDueno(duenoMock);
    
    // Assert: Verificamos que el dueño sea correctamente asignado
    expect(component.dueno).toEqual(duenoMock);
    // Assert adicional: Verificamos que el modal haya sido abierto
    expect(component.abrirModaldu).toHaveBeenCalled();
  });
  
  it('should delete a patient and update the patient list correctly', () => {
    // Actúa: Definimos un paciente mock
    const pacientesMock = [{ id: 1, nombrePaciente: 'Carlos' }];
    
    // Asignamos el paciente al componente
    component.pacientes = pacientesMock;
    
    // Simulamos que el servicio de eliminación devuelve una respuesta vacía
    spyOn(pacienteService, 'eliminarPaciente').and.returnValue(of());
    
    // Llamamos al método 'eliminarPaciente' con el id del paciente
    component.eliminarPaciente(1);
    
    // Assert: Verificamos que el paciente fue eliminado de la lista
    expect(component.pacientes.length).toBe(0);
  });
  
  it('should delete an owner and update the owner list correctly', () => {
    // Actúa: Definimos un dueño mock
    const duenosMock = [{ id: 1, nombreDueno: 'Juan' }];
    
    // Asignamos el dueño al componente
    component.duenos = duenosMock;
    
    // Simulamos que el servicio de eliminación devuelve una respuesta vacía
    spyOn(duenoService, 'eliminarDueno').and.returnValue(of());
    
    // Simulamos una llamada de 'alert' para verificar que se muestre el mensaje
    spyOn(window, 'alert');
    
    // Llamamos al método 'eliminarDueno' con el id del dueño
    component.eliminarDueno(1);
    
    // Assert: Verificamos que el dueño fue eliminado de la lista
    expect(component.duenos.length).toBe(0);
    // Assert adicional: Verificamos que el mensaje de confirmación se haya mostrado
    expect(window.alert).toHaveBeenCalledWith('Dueño eliminado correctamente');
  });
  
  it('should save a new patient correctly and update the patient list', () => {
    // Actúa: Definimos un paciente nuevo mock
    const nuevoPaciente = { id: 0, nombrePaciente: 'Carlos', primerNombre: 'Carlos', primerApellido: 'Pérez', edad: 30, telefono: '3001234567', direccion: 'Calle 456' };
    const pacienteCreado = { ...nuevoPaciente, id: 1 };  // Simulamos que el paciente fue creado y tiene un ID asignado
    
    // Simulamos la creación del paciente en el servicio
    spyOn(pacienteService, 'crearPaciente').and.returnValue(of(pacienteCreado));
    
    // Espiamos los métodos necesarios para verificar que se llamen
    spyOn(component, 'limpiarFormulario');
    spyOn(component.dialogRef, 'close');
    
    // Asignamos el paciente al componente
    component.paciente = nuevoPaciente;
    
    // Llamamos al método 'guardarPaciente'
    component.guardarPaciente();
    
    // Assert: Verificamos que el paciente haya sido agregado a la lista
    expect(component.pacientes.length).toBeGreaterThan(0);
    // Assert adicional: Verificamos que se haya limpiado el formulario y cerrado el modal
    expect(component.limpiarFormulario).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
  
  it('should update a patient correctly and reflect the changes in the patient list', () => {
    // Actúa: Definimos un paciente mock y su versión actualizada
    const pacienteExistente = { id: 1, nombrePaciente: 'Carlos' };
    const pacienteActualizado = { ...pacienteExistente, nombrePaciente: 'Carlos Actualizado' };
    
    // Simulamos la actualización del paciente
     
    
    // Espiamos los métodos necesarios
    spyOn(component, 'limpiarFormulario');
    spyOn(component.dialogRef, 'close');
    
    // Asignamos el paciente existente al componente
    component.paciente = pacienteExistente;
    
    // Llamamos al método 'guardarPaciente' para actualizar
    component.guardarPaciente();
    
    // Assert: Verificamos que el paciente haya sido actualizado correctamente
    expect(component.pacientes.some(p => p.id === pacienteActualizado.id && p.nombrePaciente === 'Carlos Actualizado')).toBeTrue();
    // Assert adicional: Verificamos que se haya limpiado el formulario y cerrado el modal
    expect(component.limpiarFormulario).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
  
  
  

});
