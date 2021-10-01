import { ErrorPageComponent } from './layout/404/error-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerErrorComponent } from './layout/server-error/server-error.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'not-found', component: ErrorPageComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
