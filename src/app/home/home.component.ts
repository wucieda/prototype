import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';


export interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}

const EMPLOYEES: Employee[] = [
  { id: 1, name: 'Juan Pérez', position: 'Desarrollador', salary: 3000 },
  { id: 2, name: 'Ana López', position: 'Diseñadora', salary: 2800 },
  { id: 3, name: 'Carlos Gómez', position: 'Gerente', salary: 5000 },
  { id: 4, name: 'María Rodríguez', position: 'Tester', salary: 2500 },
  { id: 5, name: 'Pedro Ramírez', position: 'Analista', salary: 3200 },
  { id: 6, name: 'Sofía Méndez', position: 'Desarrollador', salary: 3100 },
  { id: 7, name: 'Luis Fernández', position: 'Diseñador', salary: 2900 },
  { id: 8, name: 'Elena Torres', position: 'Gerente', salary: 5200 },
  { id: 9, name: 'Javier Ortiz', position: 'Tester', salary: 2600 },
  { id: 10, name: 'Camila Suárez', position: 'Analista', salary: 3300 },
  { id: 11, name: 'Gabriel Castro', position: 'Desarrollador', salary: 3400 },
  { id: 12, name: 'Martina Vargas', position: 'Diseñadora', salary: 2750 },
  { id: 13, name: 'Fernando Ríos', position: 'Gerente', salary: 5100 },
  { id: 14, name: 'Daniela Pérez', position: 'Tester', salary: 2550 },
  { id: 15, name: 'Rodrigo López', position: 'Analista', salary: 3450 },
  { id: 16, name: 'Valentina Gómez', position: 'Desarrollador', salary: 3150 },
  { id: 17, name: 'Andrés Silva', position: 'Diseñador', salary: 2850 },
  { id: 18, name: 'Natalia Herrera', position: 'Gerente', salary: 5300 },
  { id: 19, name: 'Tomás Fuentes', position: 'Tester', salary: 2750 },
  { id: 20, name: 'Isabela Molina', position: 'Analista', salary: 3500 },
  { id: 21, name: 'Diego Cabrera', position: 'Desarrollador', salary: 3250 },
  { id: 22, name: 'Lucas Romero', position: 'Diseñador', salary: 2950 },
  { id: 23, name: 'Paula Benítez', position: 'Gerente', salary: 5400 },
  { id: 24, name: 'Emilio Navarro', position: 'Tester', salary: 2800 },
  { id: 25, name: 'Renata Cárdenas', position: 'Analista', salary: 3550 }
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BreadcrumbComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'name', 'position', 'salary', 'actions'];
  dataSource: Employee[] = [...EMPLOYEES];
  filterText: string = '';
  positionFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  sortedColumn: keyof Employee | '' = '';
  sortAscending: boolean = true;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterText = filterValue;
    this.updateFilteredData();
  }

  applyPositionFilter(event: Event) {
    this.positionFilter = (event.target as HTMLSelectElement).value;
    this.updateFilteredData();
  }

  updateFilteredData() {
    this.dataSource = EMPLOYEES.filter(employee =>
      (this.filterText === '' ||
        employee.name.toLowerCase().includes(this.filterText)) &&
      (this.positionFilter === '' ||
        employee.position === this.positionFilter)
    );
  }

  sortTable(column: keyof Employee) {
    if (this.sortedColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortedColumn = column;
      this.sortAscending = true;
    }
    this.dataSource.sort((a, b) => {
      return this.sortAscending
        ? (a[column] > b[column] ? 1 : -1)
        : (a[column] < b[column] ? 1 : -1);
    });
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.dataSource.slice(start, start + this.itemsPerPage);
  }

  getSortIcon(column: keyof Employee): string {
    if (this.sortedColumn === column) {
      return this.sortAscending ? '▲' : '▼';
    }
    return '';
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.dataSource.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  editEmployee(employee: Employee) {
    console.log('Editar', employee);
  }

  viewEmployee(employee: Employee) {
    console.log('Ver', employee);
  }

  deleteEmployee(employee: Employee) {
    this.dataSource = this.dataSource.filter(e => e.id !== employee.id);
    console.log('Eliminar', employee);
  }
}
