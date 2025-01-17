import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PacienteService } from '../services/paciente.service';  // Asegúrate de importar el servicio
import { DuenoService } from '../services/dueno.service';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  modal: any;
  dialogRef: any;
  displayedColumns: string[] = [
    'nombrePaciente',
    'especie',
    'raza',
    'fechaNacimiento',
    'fechaRegistro',
    'dueno',
    'acciones'
  ];



  duenos: any[] = [];
  dueno: any = { id: 0, nombreDueno: '', tipoIdentificacionDueno: '', identificacionDueno: '', ciudad: '', direccion: '', telefono: '' };

  pacientes: any[] = [];
  paciente: any = { id: 0, nombrePaciente: '', especie: '', raza: '', fechaNacimiento: '', fechaRegistro: '', dueno: 0 };

  esEdicion: boolean = false;  // Nueva variable de control
  @ViewChild('modalCrearPaciente') modalCrearPaciente: any = undefined;
  @ViewChild('modalCrearDueno') modalCrearDueno: any = undefined;
  constructor(private pacienteService: PacienteService, private duenoService: DuenoService, private dialog: MatDialog) { }

  abrirModal(): void {
    this.dialogRef = this.dialog.open(this.modalCrearPaciente);
  }
  abrirModaldu(): void {
    this.dialogRef = this.dialog.open(this.modalCrearDueno);
  }


  ngOnInit(): void {
    this.obtenerDuenos();
    this.obtenerPacientes();
  }

  obtenerDuenos(): void {
    this.duenoService.obtenerDuenos().subscribe(
      (data) => {
        this.duenos = data;
      },
      (error) => {
        console.error('Error al obtener dueños', error);
      }
    );
  }


  obtenerPacientes(): void {
    this.pacienteService.obtenerPacientes().subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error) => {
        console.error('Error al obtener pacientes', error);
      }
    );
  }


  editarPaciente(paciente: any): void {
    this.paciente = { ...paciente };
    this.abrirModal();
  }

  editarDueno(dueno: any): void {
    this.dueno = { ...dueno };
    this.abrirModaldu();
  }


  eliminarPaciente(id: number): void {
    this.pacienteService.eliminarPaciente(id).subscribe(
      (response) => {
        this.pacientes = this.pacientes.filter(paciente => paciente.id !== id);
        console.log('Paciente eliminado', response);
      },
      (error) => {
        console.error('Error al eliminar paciente', error);
      }
    );
  }


  eliminarDueno(id: number): void {
    this.duenoService.eliminarDueno(id).subscribe(
      (response) => {
        this.duenos = this.duenos.filter(dueno => dueno.id !== id);
        console.log('dueno eliminado', response);
        alert('Dueño eliminado correctamente');
        this.limpiarFormularioo();
      },
      (error) => {
        console.error('Error al eliminar dueño');
        alert('No se puede eliminar el dueño porque tiene un paciente asociado.');
      }
    );
  }


  guardarPaciente(): void {
    if (this.paciente.id === 0) {
      const pacienteSinId = { ...this.paciente };
      delete pacienteSinId.id;

      this.pacienteService.crearPaciente(pacienteSinId).subscribe(
        (data) => {
          console.log('Paciente creado');
          this.pacientes.push(data); // Agregar a la lista
          this.limpiarFormulario(); // Limpiar formulario
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error al crear paciente', error);
        }
      );
    } else {
      // Actualizar paciente existente
      this.pacienteService.actualizarPaciente(this.paciente.id, this.paciente).subscribe(
        (data) => {
          console.log('Paciente actualizado:', data);

          // Actualizar el paciente en la lista local
          const index = this.pacientes.findIndex(p => p.id === this.paciente.id);
          if (index !== -1) {
            this.pacientes[index] = data;
          }

          this.limpiarFormulario(); // Limpiar formulario
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error al actualizar paciente', error);
        }
      );
    }
  }


  guardarDueno(): void {
    if (this.dueno.id === 0) { // Verificar si es un nuevo dueño

      const duenoSinId = { ...this.dueno };
      delete duenoSinId.id;  // Eliminar el ID ya que es autogenerado

      this.duenoService.crearDueno(duenoSinId).subscribe(
        (data) => {
          console.log('Dueño creado:', data);
          this.duenos.push(data); // Añadir el nuevo dueño a la lista
          this.limpiarFormularioo();
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error al crear dueño:', error);
          // Aquí podrías agregar un mensaje para el usuario en caso de error
        }
      );
    } else { // Si el dueño ya existe, actualizar
      this.duenoService.actualizarDueno(this.dueno.id, this.dueno).subscribe(
        (data) => {
          console.log('Dueño actualizado:', data);

          const index = this.duenos.findIndex(d => d.id === this.dueno.id);
          this.limpiarFormularioo();
          this.dialogRef.close();
          if (index !== -1) {
            this.duenos[index] = data; // Actualizar el dueño en la lista
            // Limpiar el formulario después de la actualización
          }


        },
        (error) => {
          console.error('Error al actualizar dueño:', error);
          // Agregar mensajes para el usuario si es necesario
        }
      );
    }
  }

  limpiarFormulario() {
    this.paciente = { id: 0, nombrePaciente: '', especie: '', raza: '', fechaNacimiento: '', fechaRegistro: '', dueno: 0 };
    this.esEdicion = false; // Volver a estado no edición
  }

  limpiarFormularioo() {
    this.dueno = { id: 0, nombreDueno: '', tipoIdentificacionDueno: '', identificacionDueno: '', ciudad: '', direccion: '', telefono: '' };
  }


//Excel
  exportarDatosDesdeArreglo(datos: any[], nombreArchivo: string): void {
    if (!datos || datos.length === 0) {
      console.error('No hay datos para exportar');
      return;
    }
  
    // Detecta las columnas a partir de las claves del primer objeto
    const columnas = Object.keys(datos[0]);
  
    // Mapea los datos al formato amigable para Excel
    const datosFormateados = datos.map((dato) => {
      const fila: any = {};
      columnas.forEach((columna) => {
        fila[columna] = dato[columna];
      });
      return fila;
    });
  
    // Crea la hoja de Excel
    const worksheet = XLSX.utils.json_to_sheet(datosFormateados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
  
    // Descarga el archivo
    XLSX.writeFile(workbook, `${nombreArchivo}.xlsx`);
  }

  importarPacientes(event: any): void {
    const archivo = event.target.files[0];
    if (!archivo) {
      console.error('No se seleccionó ningún archivo');
      return;
    }
  
    const lector = new FileReader();
  
    lector.onload = (e: any) => {
      const datosBinarios = e.target.result;
      const libro = XLSX.read(datosBinarios, { type: 'binary' });
      const hojaNombre = libro.SheetNames[0];
      const hoja = libro.Sheets[hojaNombre];
  
      // Convierte los datos de la hoja en JSON
      const pacientesImportados: any[] = XLSX.utils.sheet_to_json(hoja);
  
      // Procesa los datos importados
      pacientesImportados.forEach((pacienteImportado) => {
        const pacienteExistente = this.pacientes.find(
          (p) => p.id === pacienteImportado.id
        );
  
        if (pacienteExistente) {
          // Actualiza los datos del paciente existente
          Object.assign(pacienteExistente, pacienteImportado);
        } else {
          // Crea un nuevo paciente
          this.pacientes.push(pacienteImportado);
        }
      });
  
      console.log('Pacientes importados:', pacientesImportados);
      alert('Importación de pacientes completada.');
      event.target.value = null;
    };
  
    lector.readAsBinaryString(archivo);
  }
  
  importarDuenos(event: any): void {
    const archivo = event.target.files[0];
    if (!archivo) {
      console.error('No se seleccionó ningún archivo');
      return;
    }
  
    const lector = new FileReader();
  
    lector.onload = (e: any) => {
      const datosBinarios = e.target.result;
      const libro = XLSX.read(datosBinarios, { type: 'binary' });
      const hojaNombre = libro.SheetNames[0];
      const hoja = libro.Sheets[hojaNombre];
  
      // Convierte los datos de la hoja en JSON
      const duenosImportados: any[] = XLSX.utils.sheet_to_json(hoja);
  
      // Procesa los datos importados
      duenosImportados.forEach((duenoImportado) => {
        const duenoExistente = this.duenos.find(
          (d) => d.id === duenoImportado.id
        );
  
        if (duenoExistente) {
          // Actualiza los datos del dueño existente
          Object.assign(duenoExistente, duenoImportado);
        } else {
          // Crea un nuevo dueño
          this.duenos.push(duenoImportado);
        }
      });
  
      console.log('Dueños importados:', duenosImportados);
      alert('Importación de dueños completada.');
      event.target.value = null;
    };
  
    lector.readAsBinaryString(archivo);
  }
  
  
  
  
}
