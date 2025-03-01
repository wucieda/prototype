import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TableRow {
  id?: number;
  name: string;
  value: string;
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
  initialData: TableRow[] = [
    { id: 1, name: 'Item 1', value: 'Value 1', status: 'unchanged' },
    { id: 2, name: 'Item 2', value: 'Value 2', status: 'unchanged' }
  ];
  data: TableRow[] = JSON.parse(JSON.stringify(this.initialData));
  notification: string | null = null;
  notificationType: string = '';

  addRow() {
    //this.data.push({ name: '', value: '', status: 'new' });
    this.data.push({ id: Date.now(), name: '', value: '', status: 'new' });
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
    this.showNotification("Changes saved successfully!",'success');
  }

  resetChanges() {
    this.data = JSON.parse(JSON.stringify(this.initialData));
    this.showNotification("Changes have been reset.",'info');
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
