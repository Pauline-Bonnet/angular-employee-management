import { EmployeesManagementService } from './../../management/employees-management.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../management/employee';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  employeesList!: Employee[];
  searchText!: string;
  empty!: boolean;

  constructor(private service: EmployeesManagementService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.service.getEmployees()
      .pipe(
        tap(employees => this.employeesList = employees),
        tap(() => this.empty = this.employeesList.length <= 0)
      ).subscribe();
  }
}
