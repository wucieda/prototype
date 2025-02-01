import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal'; // Importa el módulo
import { CommonModule } from '@angular/common';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NzModalModule], // Importa el módulo aquí
  template: `
    <button nz-button (click)="openModal()">Abrir Modal</button>
  `,
})
export class AppComponent {
  constructor(private modalService: NzModalService) {}

  openModal(): void {
    this.modalService.create({
      nzTitle: 'Título del Modal',
      nzContent: CustomModalComponent,
      nzFooter: [
        {
          label: 'Cerrar',
          onClick: () => this.modalService.closeAll(),
        },
      ],
    });
  }
}