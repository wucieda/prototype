import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { TablaComponent } from './tabla/tabla.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { Calendar2Component } from './calendar2/calendar2.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { AppComponent } from './app.component';
import { Header2Component } from './header2/header2.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [

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
    path: 'tablas',
    component: TablaComponent,
    data: { breadcrumb: 'tablas' }
  },
  {
    path: 'employee',
    component: EmployeeFormComponent,
    data: { breadcrumb: 'employee' }
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    data: { breadcrumb: 'calendar' }
  },

  {
    path: 'calendar2',
    component: Calendar2Component,
    data: { breadcrumb: 'calendar2' }
  },
  {
    path: 'edit-table',
    component: EditableTableComponent,
    data: { breadcrumb: 'edit-table' }
  },
  {
    path: 'header2',
    component: Header2Component,
    data: { breadcrumb: 'header2' }
  },
  {
    path: 'header',
    component: HeaderComponent,
    data: { breadcrumb: 'header' }
  },
  {
    path: '',
    component: AppComponent,
    data: { breadcrumb: 'home' }
  }


];