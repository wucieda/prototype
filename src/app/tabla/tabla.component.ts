import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {
  // Datos de ejemplo
  datos = [
    { nombre: 'Juan Pérez', edad: 28, ciudad: 'Madrid', pais: 'España' },
    { nombre: 'Ana Gómez', edad: 34, ciudad: 'Buenos Aires', pais: 'Argentina' },
    { nombre: 'Carlos Ruiz', edad: 22, ciudad: 'Ciudad de México', pais: 'México' },
    { nombre: 'Laura Fernández', edad: 30, ciudad: 'Bogotá', pais: 'Colombia' },
    { nombre: 'Pedro Sánchez', edad: 40, ciudad: 'Lima', pais: 'Perú' },
    { nombre: 'María López', edad: 25, ciudad: 'Santiago', pais: 'Chile' },
    { nombre: 'José García', edad: 33, ciudad: 'Caracas', pais: 'Venezuela' },
    { nombre: 'Lucía Martínez', edad: 29, ciudad: 'Quito', pais: 'Ecuador' },
  ];

  // Variables para filtrado y paginación
  filters = {
    nombre: '',
    ciudad: '',
    pais: ''
  };
  filteredData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumnName: string = '';

  constructor() {
    this.applyFilter();
  }

  // Aplicar filtro y paginación
  applyFilter(): void {
    this.filteredData = this.datos.filter((item) =>
      item.nombre.toLowerCase().includes(this.filters.nombre.toLowerCase()) &&
      item.ciudad.toLowerCase().includes(this.filters.ciudad.toLowerCase()) &&
      item.pais.toLowerCase().includes(this.filters.pais.toLowerCase())
    );

    // Ordenar datos si hay una columna seleccionada
    if (this.sortColumnName) {
      this.sortData(this.sortColumnName);
    }

    // Paginar datos
    this.filteredData = this.paginateData(this.filteredData);
  }

  // Ordenar datos
  sortData(column: string): void {
    if (this.sortColumnName === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumnName = column;
      this.sortDirection = 'asc';
    }

    this.filteredData.sort((a, b) => {
      if (a[column] < b[column]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Paginar datos
  paginateData(data: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return data.slice(startIndex, endIndex);
  }

  // Cambiar de página
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilter();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilter();
    }
  }

  // Calcular el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  // Ordenar al hacer clic en una columna
  sortColumn(column: string): void {
    this.sortData(column);
    this.applyFilter();
  }
}