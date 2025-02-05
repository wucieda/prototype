import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink,ActivatedRouteSnapshot  } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports:[RouterLink,CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: { label: string, url: string }[] = [];


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.buildBreadcrumbs();
  }

  buildBreadcrumbs(): void {
     
    let route = this.activatedRoute.root;
    let url = '';
    this.breadcrumbs = [];
// Agregar "Home" como el primer elemento en el breadcrumb
this.breadcrumbs.push({ label: 'Home', url: '/' });
    route.children.forEach(child => {
      this.addBreadcrumb(child, url);
    });
  }

  private addBreadcrumb(route: any, url: string): void {
    const routeURL: string = route.snapshot.url.map((segment: any) => segment.path).join('/');
    console.log('routeURL=> ',routeURL)
    
    if (routeURL !== '') {
      url += `/${routeURL}`;
      this.breadcrumbs.push({ label: routeURL, url: url });
      console.log("breadcrumbs", this.breadcrumbs)
    }

    if (route.children.length > 0) {
      route.children.forEach((child: ActivatedRouteSnapshot) => this.addBreadcrumb(child, url));    }
  }
}
