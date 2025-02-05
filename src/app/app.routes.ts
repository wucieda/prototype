import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { TablaComponent } from './tabla/tabla.component';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      data: { breadcrumb: 'Inicio' }
    },
    {
      path: 'products',
      component: ProductsComponent,
      data: { breadcrumb: 'products' }
    },
    {
      path: 'products/:id',
      component: ProductsDetailComponent,
      data: { breadcrumb: 'products/:id' }
    },
    {
      path: 'tabla',
      component: TablaComponent,
      data: { breadcrumb: 'tabla' }
    }
  ];