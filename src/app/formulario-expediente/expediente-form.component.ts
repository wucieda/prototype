import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expediente-form',
  templateUrl: './expediente-form.component.html',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  standalone: true,
  styleUrls: ['./expediente-form.component.scss']
})
export class ExpedienteFormComponent {
  expedienteForm: FormGroup;
  tabla1Datos = [
    { id: 1, atributo1: 'Valor 1A', atributo2: 'Valor 1B', atributo3: 'Valor 1C', atributo4: 'Valor 1D', atributo5: 'Valor 1E', atributo6: 'Valor 1F', atributo7: 'Valor 1G', atributo8: 'Valor 1H', atributo9: 'Valor 1I', atributo10: 'Valor 1J' },
    { id: 2, atributo1: 'Valor 2A', atributo2: 'Valor 2B', atributo3: 'Valor 2C', atributo4: 'Valor 2D', atributo5: 'Valor 2E', atributo6: 'Valor 2F', atributo7: 'Valor 2G', atributo8: 'Valor 2H', atributo9: 'Valor 2I', atributo10: 'Valor 2J' }
  ];

  tabla2Datos = [
    { id: 1, atributo1: 'Data 1A', atributo2: 'Data 1B', atributo3: 'Data 1C', atributo4: 'Data 1D', atributo5: 'Data 1E', atributo6: 'Data 1F', atributo7: 'Data 1G', atributo8: 'Data 1H', atributo9: 'Data 1I', atributo10: 'Data 1J' },
    { id: 2, atributo1: 'Data 2A', atributo2: 'Data 2B', atributo3: 'Data 2C', atributo4: 'Data 2D', atributo5: 'Data 2E', atributo6: 'Data 2F', atributo7: 'Data 2G', atributo8: 'Data 2H', atributo9: 'Data 2I', atributo10: 'Data 2J' }
  ];

  constructor(private fb: FormBuilder) {
    this.expedienteForm = this.fb.group({
      idExpediente: ['', Validators.required],
      numeroExpediente: ['', Validators.required],
      tipoExpediente: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      estado: ['', Validators.required],
      descripcion: [''],
      cliente: this.fb.group({
        idCliente: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        dni: ['', [Validators.required, Validators.minLength(8)]],
        telefono: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        direccion: ['', Validators.required]
      }),
      abogadoAsignado: this.fb.group({
        idAbogado: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        especialidad: ['', Validators.required]
      }),
      documentos: this.fb.array([]),
      juzgado: ['', Validators.required],
      juezAsignado: ['', Validators.required],
      ultimaActualizacion: ['', Validators.required],
      notificaciones: this.fb.array([]),
      plazos: this.fb.group({
        fechaAudiencia: ['', Validators.required],
        fechaLimitePruebas: ['', Validators.required]
      }),
      observaciones: [''],
      montoReclamado: ['', Validators.required],
      moneda: ['', Validators.required],
      prioridad: ['', Validators.required],
      etapaProceso: ['', Validators.required],
      origen: ['', Validators.required],
      referenciasExternas: this.fb.array([]),
      tipoCaso: ['', Validators.required],
      resultadoEsperado: ['', Validators.required],
      fechaCierre: ['']
    });
  }

  get documentos() {
    return this.expedienteForm.get('documentos') as FormArray;
  }

  get notificaciones() {
    return this.expedienteForm.get('notificaciones') as FormArray;
  }

  get referenciasExternas() {
    return this.expedienteForm.get('referenciasExternas') as FormArray;
  }

  agregarDocumento() {
    this.documentos.push(this.fb.group({
      idDocumento: ['', Validators.required],
      tipo: ['', Validators.required],
      nombreArchivo: ['', Validators.required],
      fechaSubida: ['']
    }));
  }

  agregarNotificacion() {
    this.notificaciones.push(this.fb.group({
      idNotificacion: ['', Validators.required],
      fecha: ['', Validators.required],
      detalle: ['', Validators.required]
    }));
  }

  agregarReferenciaExterna() {
    this.referenciasExternas.push(this.fb.control(''));
  }

  submit() {
    if (this.expedienteForm.valid) {
      console.log(this.expedienteForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
