import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditableTableComponent } from './editable-table.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('EditableTableComponent', () => {
  let component: EditableTableComponent;
  let fixture: ComponentFixture<EditableTableComponent>;

  const mockDatasets = [
    [
      { id: 1, Name: 'Alice', Age: 25, status: 'unchanged' },
      { id: 2, Name: 'Bob', Age: 30, status: 'unchanged' }
    ],
    [
      { id: 1, Product: 'Laptop', Price: 1200, Stock: 10, status: 'unchanged' },
      { id: 2, Product: 'Mouse', Price: 25, Stock: 50, status: 'unchanged' }
    ]
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],
      declarations: [EditableTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTableComponent);
    component = fixture.componentInstance;
    component.datasets = mockDatasets;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the first dataset on init', () => {
    component.ngOnInit();
    expect(component.data.length).toBe(2);
    expect(component.columns).toEqual(['Name', 'Age']);
  });

  it('should load a selected dataset', () => {
    component.loadDataset(1);
    expect(component.data.length).toBe(2);
    expect(component.columns).toEqual(['Product', 'Price', 'Stock']);
  });

  it('should add a new row', () => {
    component.addRow();
    expect(component.data.length).toBe(3);
    expect(component.data[2].status).toBe('new');
  });

  it('should mark a row as modified', () => {
    const row = component.data[0];
    component.markModified(row);
    expect(row.status).toBe('modified');
  });

  it('should mark a row for deletion', () => {
    const row = component.data[0];
    component.markForDeletion(row);
    expect(row.status).toBe('deleted');
  });

  it('should save changes', () => {
    spyOn(console, 'log');
    component.data[0].status = 'modified';
    component.saveChanges();
    expect(console.log).toHaveBeenCalledWith('Modifying:', [component.data[0]]);
  });

  it('should reset changes', () => {
    component.data[0].status = 'modified';
    component.resetChanges();
    expect(component.data[0].status).toBe('unchanged');
  });

  it('should show notification', () => {
    jasmine.clock().install();
    component.showNotification('Test message', 'success');
    expect(component.notification).toBe('Test message');
    jasmine.clock().tick(3001);
    expect(component.notification).toBeNull();
    jasmine.clock().uninstall();
  });
});
