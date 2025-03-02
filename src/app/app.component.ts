import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Header2Component } from "./header2/header2.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, Header2Component], // Importa el módulo aquí
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor( ) { }

}