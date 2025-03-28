import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Modal';
  @Output() closeModal = new EventEmitter<void>();
  @Output() acceptModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  accept() {
    this.acceptModal.emit();
  }
}
