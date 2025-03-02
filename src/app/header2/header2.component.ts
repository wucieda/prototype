import { Component } from '@angular/core';

@Component({
  selector: 'app-header2',
  imports: [],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.scss'
})
export class Header2Component {
  activeLink: string = '';

  setActive(link: string) {
    this.activeLink = link;
  }

}
