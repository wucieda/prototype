import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { ReactiveFormsModule } from '@angular/forms';
import { DataGenerator } from './data-generator';
import { Data, Table } from '../models/table.model';


interface TableRow {
  id: number;
  Name: string;
  Age: number;
  Email: string;
  status: string;
  [key: string]: any; // Permite acceder con claves dinámicas
}

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzIconModule,
    NzAlertModule,
    ReactiveFormsModule
  ]
})
export class EditableTableComponent {
  title = '';

  table: Table; // Definimos la tabla dinámica
  data: Data[]; // Datos de la tabla

  // Propiedades para notificaciones
  notification: string | null = null;
  notificationType: 'success' | 'info' | 'warning' | 'error' = 'info';

  constructor(private message: NzMessageService) {
    // Generar tabla y datos automáticamente
    this.table = DataGenerator.generateTable('empleados');
    this.data = DataGenerator.generateData(this.table, 8); // Generar 8 filas de datos

  }

  // Mostrar notificaciones
  showNotification(message: string, type: 'success' | 'info' | 'warning' | 'error') {
    this.notification = message;
    this.notificationType = type;
    setTimeout(() => this.notification = null, 3000);
  }

  /** 🟢 Agregar una nueva fila */
  addRow() {
    const emptyRow: Data = {
      rowId: Date.now().toString(),
      action: 'UPDATE_INSERT', // Indica que es nueva
      status: 'new', // 🟢 Marcar como nueva fila
      values: this.table.fields.map(field => field.type === 'number' ? 0 : '')
    };
    this.data.unshift(emptyRow);
    this.showNotification('New row added', 'success');
  }

  /** 🔵 Marcar fila como modificada */
  markModified(row: Data) {
    if (row.status !== 'new') {
      row.action = 'UPDATE_INSERT'; // Cambia el estado a "actualizar insertar"
      row.status = 'modified'; // 🔵 Cambia el estado a "modificado"

    }
  }

  /** ❌ Marcar fila como eliminada */
  deleteRow(row: Data) {
    row.action = 'DELETE';
    row.status = 'deleted'; // 🔴 Marcar fila para eliminar
    //this.data = this.data.filter(r => r !== row);
    this.showNotification('Row deleted', 'error');
  }

  /** 💾 Guardar cambios */
  saveChanges() {
    this.showNotification('Changes saved successfully', 'success');
  }

  /** 🔄 Resetear cambios */
  resetChanges() {
    this.data = DataGenerator.generateData(this.table, 5);
    this.showNotification('Changes reset', 'warning');
  }
}
