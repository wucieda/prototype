import { Component, Input } from '@angular/core';
import { Employee } from '../models/employee.model';
import { CommonModule } from '@angular/common'; // 📌 Importar CommonModule

@Component({
  selector: 'app-employee-table',
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {

  @Input() employees: Employee[] = [];

  get totalSalary(): number {
    return this.employees.reduce((sum, emp) => sum + emp.salary, 0);
  }

  get totalAge(): number {
    return this.employees.reduce((sum, emp) => sum + emp.age, 0);
  }

}
