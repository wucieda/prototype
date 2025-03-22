import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditableTableComponent } from './editable-table.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { provideAnimations } from '@angular/platform-browser/animations';


describe('EditableTableComponent', () => {
  let component: EditableTableComponent;
  let fixture: ComponentFixture<EditableTableComponent>;
  let messageService: NzMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableTableComponent, FormsModule, NzTableModule, NzButtonModule, NzInputModule, NzSelectModule],
      providers: [NzMessageService,provideAnimations()] // Agregar NzMessageService para evitar errores de inyección
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTableComponent);
    component = fixture.componentInstance;
    messageService = TestBed.inject(NzMessageService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar la tabla con datos', () => {
    expect(component.table).toBeDefined();
    expect(component.data.length).toBeGreaterThan(0);
  });

  it('debería renderizar la tabla con las columnas correctas', () => {
    fixture.detectChanges();
    const headers = fixture.debugElement.queryAll(By.css('th'));
    expect(headers.length).toBe(component.table.fields.length + 1); // +1 por la columna de acciones
  });

  it('debería agregar una nueva fila cuando se hace clic en "Add Row"', () => {
    const initialLength = component.data.length;
    const addButton = fixture.debugElement.query(By.css('button[nzType="primary"]'));
    addButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.data.length).toBe(initialLength + 1);
  });

  it('debería eliminar una fila cuando se hace clic en "Delete"', () => {
    const initialLength = component.data.length;
    component.deleteRow(component.data[0]);
    fixture.detectChanges();
    expect(component.data.length).toBe(initialLength - 1);
  });

  it('debería marcar una fila como modificada al cambiar un valor', () => {
    const input = fixture.debugElement.query(By.css('input input'));
    input.nativeElement.value = 'Nuevo Valor';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.data[0].action).toBe('UPDATE_INSERT');
  });

  it('debería mostrar notificación al agregar una fila', () => {
    spyOn(messageService, 'success');
    component.addRow();
    expect(messageService.success).toHaveBeenCalledWith('New row added');
  });

  it('debería mostrar notificación al eliminar una fila', () => {
    spyOn(messageService, 'success');
    component.deleteRow(component.data[0]);
    expect(messageService.success).toHaveBeenCalledWith('Row deleted');
  });

  it('debería mostrar notificación al guardar cambios', () => {
    spyOn(messageService, 'success');
    component.saveChanges();
    expect(messageService.success).toHaveBeenCalledWith('Changes saved successfully');
  });

  it('debería mostrar notificación al resetear los cambios', () => {
    spyOn(messageService, 'warning');
    component.resetChanges();
    expect(messageService.warning).toHaveBeenCalledWith('Changes reset');
  });
});
