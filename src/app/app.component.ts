import { Component} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal'; // Importa el módulo
import { CommonModule } from '@angular/common';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NzModalModule, RouterOutlet,BreadcrumbComponent], // Importa el módulo aquí
  templateUrl: 'app.component.html',
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