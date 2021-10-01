import { EmployeesManagementService } from './../../management/employees-management.service';
import { Employee } from './../../management/employee';
import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  employeesList!: Employee[];
  employeesNumber!: number;
  women!: number;
  men!: number;
  teams!: number;
  bestEmployee!: string;
  newbe!: string;
  data: any;
  dataWomen: any;
  dataMen: any;

  constructor(private service: EmployeesManagementService) { }

  ngOnInit(): void {
    this.getEmployeesStats();
  }

  getEmployeesStats(): void {
    this.service.getEmployees()
      .pipe(tap(employees => this.employeesList = employees),
            tap(list => this.employeesNumber = list.length),
            tap(list => this.countEmployeesByGender(list)),
            tap(list => this.teams = this.service.getTeamsLength(list)),
            tap(list => this.bestEmployee = this.service.getBestEmployee(list)),
            tap(list => this.newbe = this.service.getNewbe(list)))
      .subscribe();
  }

  countEmployeesByGender(list: Employee[]): void {
    let womenCount = 0, menCount = 0;

    list.forEach(employee => employee.sex === 'female' ? womenCount++ : menCount++);

    this.constructDiagram(womenCount, menCount, 'female');
    this.constructDiagram(womenCount, menCount, 'male');
  }

  constructDiagram(women:number, men: number, sex: string) {
    if (sex === 'female') {
      this.dataWomen = {
        labels: ['Femmes', 'Hommes'],
        datasets: [
          {
            data: [women, men],
            backgroundColor: [
              "#4de6ff",
              "#868686"
            ],
            hoverBackgroundColor: [
              "#4de6ff",
              "#868686"
            ],
            borderColor: [
              "#323232",
              "#323232"
            ]
          }
        ]
      }
    }
    else if (sex === 'male') {
      this.dataMen = {
      labels: ['Femmes', 'Hommes' ],
      datasets: [
          {
            data: [women, men],
            backgroundColor: [
                "#868686",
                "#cb3eb9"
            ],
            hoverBackgroundColor: [
              "#868686",
              "#cb3eb9"
            ],
            borderColor: [
              "#323232",
              "#323232"
            ]
          }
        ]
      }
    }
  }
}
