import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink,ActivatedRouteSnapshot  } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports:[RouterLink,CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
/**
 * The `BreadcrumbComponent` is responsible for dynamically generating and displaying
 * a breadcrumb navigation based on the current route structure of the Angular application.
 * 
 * This component listens to the activated route and constructs a breadcrumb trail
 * by traversing the route tree, starting from the root. It includes a "Home" link
 * as the first breadcrumb item and appends additional breadcrumbs for each route segment.
 * 
 * @example
 * // Example breadcrumb output for a route like '/products/electronics':
 * [
 *   { label: 'Home', url: '/' },
 *   { label: 'products', url: '/products' },
 *   { label: 'electronics', url: '/products/electronics' }
 * ]
 * 
 * @property {Array<{ label: string, url: string }>} breadcrumbs
 * - An array of breadcrumb objects, where each object contains:
 *   - `label`: The display name of the breadcrumb.
 *   - `url`: The URL path associated with the breadcrumb.
 * 
 * @method ngOnInit
 * - Lifecycle hook that initializes the breadcrumb generation process.
 * 
 * @method buildBreadcrumbs
 * - Constructs the breadcrumb trail by traversing the route tree.
 * 
 * @method private addBreadcrumb
 * - Recursively processes each route segment to build the breadcrumb trail.
 * 
 * @param {any} route - The current route being processed.
 * @param {string} url - The accumulated URL path up to the current route.
 */
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
