import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Situation {
  idDate: number;
  version: string;
  entity: string;
  space: string;
}

interface ID {
  ID_BACK: string;
  ID_LEG: string;
}

interface Operation {
  situation: Situation;
  id: ID;
}

interface Entry {
  op1: Operation;
  op2: Operation;
  ptc: string;
  ptcOk: boolean;
}

@Component({
  selector: 'app-relations',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './relations.component.html',
  styleUrl: './relations.component.scss'
})
export class RelationsComponent {
  data = [
    {
      op1: {
        situation: { idDate: 20240731, version: 'develop', entity: 'bank', space: 'Berlin' },
        id: { ID_BACK: 'OPE001', ID_LEG: 'LEG001' }
      },
      op2: {
        situation: { idDate: 20240731, version: 'develop', entity: 'bank', space: 'Berlin' },
        id: { ID_BACK: 'OPE011', ID_LEG: 'LEG011' }
      },
      ptc: '25',
      ptcOk: true
    },
    {
      op1: {
        situation: { idDate: 20240731, version: 'develop', entity: 'bank', space: 'Berlin' },
        id: { ID_BACK: 'OPE002', ID_LEG: 'LEG002' }
      },
      op2: {
        situation: { idDate: 20240731, version: 'develop', entity: 'bank', space: 'Berlin' },
        id: { ID_BACK: 'OPE012', ID_LEG: 'LEG012' }
      },
      ptc: '30',
      ptcOk: true
    }
  ];

  editMode = false;
  editingIndex: number | null = null;
  editForm = { selectedIdBack: '', ptc: '' };

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.editingIndex = null;
  }

  editEntry(index: number): void {
    this.editingIndex = index;
    const entry = this.data[index];
    this.editForm = {
      selectedIdBack: entry.op2.id.ID_BACK,
      ptc: entry.ptc
    };
  }

  cancelEdit(): void {
    this.editingIndex = null;
  }

  saveEdit(index: number): void {
    const selectedOp2 = this.data.find(
      e => e.op2.id.ID_BACK === this.editForm.selectedIdBack
    )?.op2;

    if (selectedOp2) {
      this.data[index].op2 = JSON.parse(JSON.stringify(selectedOp2));
    }

    this.data[index].ptc = String(this.editForm.ptc);
    this.editingIndex = null;
  }

  deleteEntry(index: number): void {
    this.data.splice(index, 1);
    if (this.editingIndex === index) {
      this.editingIndex = null;
    }
  }
  submitAll(): void {
    // Aquí iría la llamada real a tu servicio HTTP

    console.table(JSON.stringify(this.data, null, 2));
    
  }

}