import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditableTableComponent } from './editable-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { DataGenerator } from './data-generator';
import { Data, Table } from '../models/table.model';

describe('EditableTableComponent', () => {
  let component: EditableTableComponent;
  let fixture: ComponentFixture<EditableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NzTableModule,
        NzButtonModule,
        NzInputModule,
        NzSelectModule,
        NzIconModule,
        NzAlertModule
      ],
      providers: [NzMessageService],
      declarations: [EditableTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /** ✅ 1. Verificar que el componente se crea correctamente */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /** ✅ 2. Verificar que la tabla tiene datos iniciales */
  it('should initialize with data', () => {
    expect(component.data.length).toBeGreaterThan(0);
  });

  /** ✅ 3. Agregar una nueva fila y verificar que el estado sea "new" */
  it('should add a new row with status "new"', () => {
    const initialLength = component.data.length;
    component.addRow();
    fixture.detectChanges();

    expect(component.data.length).toBe(initialLength + 1);
    expect(component.data[0].status).toBe('new'); // La fila nueva debe estar al inicio y tener status 'new'
  });

  /** ✅ 4. Modificar una fila y verificar que el estado cambie a "modified" */
  it('should mark a row as "modified" when edited', () => {
    const row = component.data[0];
    component.markModified(row);
    fixture.detectChanges();

    expect(row.status).toBe('modified'); // La fila debe cambiar a "modified"
  });

  /** ✅ 5. Marcar una fila para eliminar y verificar que el estado sea "deleted" */
  it('should mark a row as "deleted" when deleteRow is called', () => {
    const row = component.data[0];
    component.deleteRow(row);
    fixture.detectChanges();

    expect(row.status).toBe('deleted'); // La fila debe cambiar a "deleted"
  });

  /** ✅ 6. Mostrar una notificación al agregar una fila */
  it('should show a notification when a row is added', () => {
    component.addRow();
    fixture.detectChanges();

    expect(component.notification).toBe('New row added');
    expect(component.notificationType).toBe('success');
  });

  /** ✅ 7. Mostrar una notificación al eliminar una fila */
  it('should show a notification when a row is deleted', () => {
    const row = component.data[0];
    component.deleteRow(row);
    fixture.detectChanges();

    expect(component.notification).toBe('Row deleted');
    expect(component.notificationType).toBe('error');
  });

  /** ✅ 8. Guardar cambios y mostrar notificación */
  it('should save changes and show a success notification', () => {
    component.saveChanges();
    fixture.detectChanges();

    expect(component.notification).toBe('Changes saved successfully');
    expect(component.notificationType).toBe('success');
  });

  /** ✅ 9. Resetear cambios y verificar que la cantidad de filas cambie */
  it('should reset changes and reload data', () => {
    component.addRow(); // Agregar fila para cambiar la cantidad
    fixture.detectChanges();
    const newLength = component.data.length;

    component.resetChanges();
    fixture.detectChanges();

    expect(component.data.length).not.toBe(newLength); // Debe restaurar la cantidad original de filas
    expect(component.notification).toBe('Changes reset');
    expect(component.notificationType).toBe('warning');
  });
});
