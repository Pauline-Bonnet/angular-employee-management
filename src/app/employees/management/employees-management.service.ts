import { tap } from 'rxjs/internal/operators/tap';
import { Project, ProjectIO } from './project';
import { Employee, EmployeeIO } from './employee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeesManagementService {

  employeesList!: Employee[];
  employeesUrl = 'http://localhost:3000/employees';
  projectsUrl = 'http://localhost:3000/projects';

  constructor(private router: Router, private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.
      get<EmployeeIO[]>(this.employeesUrl)
      .pipe(
        tap(employees => this.employeesList = employees),
        catchError(err => this.handleError(err))
      );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.
      get<Employee>(`http://localhost:3000/employees/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  getProjects(): Observable<Project[]> {
    return this.http.
      get<ProjectIO[]>(this.projectsUrl)
      .pipe(catchError(err => this.handleError(err)));
  }

  getTeamsLength(list: Employee[]): number {
    const teamTab: string[] = [];
    list.forEach(employee => teamTab.includes(employee.team) ? teamTab : teamTab.push(employee.team));
    return teamTab.length;
  }

  getBestEmployee(list: Employee[]): string {
    const bestEmployee = list.reduce((pre, cur) => pre.score < cur.score ? cur : pre);
    return bestEmployee.name;
  }

  getNewbe(list: Employee[]): string {
    const newbe = list.reduce((pre, cur) => new Date(pre.recrutementDate) < new Date(cur.recrutementDate) ? cur : pre);
    return newbe.name;
  }
  
  handleError(response: HttpErrorResponse) {
    if (response.status === 404) {
      this.router.navigate(['not-found']);
    } else {
      this.router.navigate(['server-error']);
    }
    return observableThrowError(response.error || 'Server error');
  }
}
