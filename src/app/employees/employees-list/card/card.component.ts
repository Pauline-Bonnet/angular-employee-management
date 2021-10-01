import { GetAgePipe } from './../../management/age-management/age-management.pipe';
import { Employee } from './../../management/employee';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [ GetAgePipe ]
})
export class CardComponent implements OnInit {

  @Input() employee!: Employee;
  recrutement!: Date;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.recrutement = new Date(this.employee.recrutementDate);
  }

  seeDetails(employee: Employee): void {
    this.router.navigate(['employees/', employee.id]);
  }
}
