import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from './models/employee.model';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeTableComponent, RouterOutlet], // Importa el módulo aquí
  templateUrl: 'app.component.html',
})
export class AppComponent {

  title='prototype';

  employees: Employee[] = [
    { id: 1, name: 'Juan Pérez', department: 'Ventas', salary: 2500, age: 30 },
    { id: 2, name: 'María López', department: 'IT', salary: 3500, age: 25 },
    { id: 3, name: 'Carlos Sánchez', department: 'Marketing', salary: 3000, age: 40 },
    { id: 4, name: 'Ana García', department: 'Recursos Humanos', salary: 2700, age: 35 },
    { id: 5, name: 'David Herrera', department: 'IT', salary: 3800, age: 28 },
    { id: 6, name: 'Patricia Gómez', department: 'Ventas', salary: 2600, age: 29 },
    { id: 7, name: 'Jorge Ramírez', department: 'Contabilidad', salary: 2900, age: 33 },
    { id: 8, name: 'Sandra Ortega', department: 'IT', salary: 4000, age: 26 },
    { id: 9, name: 'Fernando Díaz', department: 'Marketing', salary: 3100, age: 37 },
    { id: 10, name: 'Mónica Fernández', department: 'Ventas', salary: 2700, age: 31 },
    { id: 11, name: 'Raúl Castro', department: 'Contabilidad', salary: 3200, age: 39 },
    { id: 12, name: 'Lucía Mendoza', department: 'IT', salary: 4200, age: 27 },
    { id: 13, name: 'Tomás Suárez', department: 'Marketing', salary: 3300, age: 32 },
    { id: 14, name: 'Elena Vargas', department: 'Ventas', salary: 2800, age: 34 },
    { id: 15, name: 'Gabriel Rojas', department: 'IT', salary: 4100, age: 29 }
  ];

}