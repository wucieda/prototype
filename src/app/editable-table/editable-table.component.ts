import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TableRow {
  id?: number;
  [key: string]: any;
  status?: 'new' | 'modified' | 'deleted' | 'unchanged';
}

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class EditableTableComponent {
  datasets: TableRow[][] = [
    // Dataset 1: 2 columnas
    [
      { id: 1, Name: "Alice", Age: 25, status: "unchanged" },
      { id: 2, Name: "Bob", Age: 30, status: "unchanged" }
    ],

    // Dataset 2: 3 columnas
    [
      { id: 1, Product: "Laptop", Price: 1200, Stock: 10, status: "unchanged" },
      { id: 2, Product: "Mouse", Price: 25, Stock: 50, status: "unchanged" }
    ],

    // Dataset 3: 4 columnas
    [
      { id: 1, Country: "USA", Capital: "Washington", Population: 331, Continent: "North America", status: "unchanged" },
      { id: 2, Country: "France", Capital: "Paris", Population: 67, Continent: "Europe", status: "unchanged" }
    ],

    // Dataset 4: 5 columnas
    [
      { id: 1, Employee: "John Doe", Department: "IT", Role: "Developer", Salary: 5000, Experience: 3, status: "unchanged" },
      { id: 2, Employee: "Jane Smith", Department: "HR", Role: "Manager", Salary: 6000, Experience: 5, status: "unchanged" }
    ],

    // Dataset 5: 7 columnas
    [
      { id: 1, Model: "Tesla Model S", Year: 2022, Price: 79999, Range: "390 miles", Battery: "100 kWh", Seats: 5, status: "unchanged" },
      { id: 2, Model: "Ford Mustang", Year: 2021, Price: 55000, Range: "300 miles", Battery: "80 kWh", Seats: 4, status: "unchanged" }
    ]
  ];

  data: TableRow[] = [];
  columns: string[] = [];
  notification: string | null = null;
  notificationType: string = '';

  ngOnInit() {

    this.data = JSON.parse(JSON.stringify(this.datasets[4])).map((row: TableRow) => ({
      ...row,
      status: row.status as 'new' | 'modified' | 'deleted' | 'unchanged' | undefined
    }));

    this.columns = Object.keys(this.data[0] || {}).filter(key => key !== 'id' && key !== 'status');
    //if (this.datasets.length > 0) {
    //this.loadDataset(0);
    //}
  }

  loadDataset(index: number) {
    this.data = JSON.parse(JSON.stringify(this.datasets[index])).map((row: TableRow) => ({
      ...row,
      status: row.status as 'new' | 'modified' | 'deleted' | 'unchanged' | undefined
    }));
  }


  addRow() {
    const newRow: TableRow = { id: Date.now(), status: 'new' };
    this.columns.forEach(col => newRow[col] = '');
    this.data.push(newRow);
  }

  markModified(row: TableRow) {
    if (row.status !== 'new') {
      row.status = 'modified';
    }
  }

  markForDeletion(row: TableRow) {
    row.status = 'deleted';
  }

  saveChanges() {
    const toCreate = this.data.filter(row => row.status === 'new');
    const toModify = this.data.filter(row => row.status === 'modified');
    const toDelete = this.data.filter(row => row.status === 'deleted');

    console.log('Creating:', toCreate);
    console.log('Modifying:', toModify);
    console.log('Deleting:', toDelete);

    this.data = this.data.filter(row => row.status !== 'deleted').map(row => ({ ...row, status: 'unchanged' }));
    this.showNotification("Changes saved successfully!", 'success');
  }

  resetChanges() {
    this.data = JSON.parse(JSON.stringify(this.datasets[0]));
    this.showNotification("Changes have been reset.", 'info');
  }

  showNotification(message: string, type: 'success' | 'error' | 'info') {
    this.notification = message;
    this.notificationType = type;
    setTimeout(() => {
      this.notification = null;
      this.notificationType = '';
    }, 3000);
  }
}
