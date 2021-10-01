import { EmployeesManagementService } from './../management/employees-management.service';
import { Project } from './../management/project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { Employee } from '../management/employee';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  employee!: Employee;
  recrutement!: Date;
  projects!: Project[];
  employeeProjectsName!: string[];
  
  constructor(private service: EmployeesManagementService, 
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {
    this.getEmployeeInformations();
  }

  getEmployeeInformations(): void {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.service.getEmployee(id)
                    .pipe(tap(employee => this.employee = employee),
                          tap(() => this.employee === undefined ? this.router.navigate(['not-found']) : true),
                          tap(() => this.recrutement = new Date(this.employee.recrutementDate)),
                          tap(() => this.getProjects()))
                    .subscribe();
  }

  getProjects(): void {
    this.service.getProjects()
                .pipe(tap(projects => this.projects = projects),
                      tap(projects => this.getEmployeeProjectsName(projects)))
                .subscribe();
  }

  getEmployeeProjectsName(projects: Project[]): void {
    this.employeeProjectsName = projects
      .filter(project => this.employee.projects.includes(project.id))
      .map(project => project.name);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
