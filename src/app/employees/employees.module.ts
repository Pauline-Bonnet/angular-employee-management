import { GetAgePipe } from './management/age-management/age-management.pipe';
import { FilterPipe } from './employees-list/filter/filter.pipe';
import { DetailsComponent } from './employees-details/details.component';
import { CardStatComponent } from './statistics-area/card-stat/card-stat.component';
import { CardComponent } from './employees-list/card/card.component';
import { ListComponent } from './employees-list/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { StatisticsComponent } from './statistics-area/statistics/statistics.component';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { GuardService } from './management/guard.service';
import { RatingComponent } from './employees-list/rating/rating.component';
import { InputTextModule } from 'primeng/inputtext';

const EMPLOYEES_ROUTES: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', children : [
    { path: '', component: ListComponent },
    { path: ':id', component: DetailsComponent, canActivate: [ GuardService ] }
  ]},
];

@NgModule({
  declarations: [
    ListComponent, 
    CardComponent,
    GetAgePipe,
    StatisticsComponent,
    CardStatComponent,
    DetailsComponent,
    RatingComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EMPLOYEES_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    RatingModule,
    ChartModule,
    ButtonModule,
    InputTextModule
  ],
  providers: []
})
export class EmployeesModule { }
