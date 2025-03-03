import { Component } from '@angular/core';

@Component({
  selector: 'app-header2',
  imports: [],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.scss'
})
export class Header2Component {
  activeLink: string = 'dashboard'; // Establece un valor predeterminado
  isMenuOpen: boolean = false; // Estado del menú desplegable

  setActive(link: string) {
    this.activeLink = link;
    this.isMenuOpen = false; // Cerrar el menú al seleccionar un enlace (opcional)
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alternar el estado del menú
  }

}
