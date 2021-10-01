import { EmployeesManagementService } from './../../management/employees-management.service';
import { ChartModule } from 'primeng/chart';
import { CardStatComponent } from './../card-stat/card-stat.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StatisticsComponent } from './statistics.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { employeesListMock } from '../../management/helpers/employees.helper';
import { By } from '@angular/platform-browser';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let employeeManagementServiceStub: any;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ StatisticsComponent, CardStatComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, ChartModule ],
      providers: [
        { provide: EmployeesManagementService, useFactory: employeeManagementServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    debug = fixture.debugElement;
    element = debug.nativeElement as HTMLElement;
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;

    const employeeManagementServiceStub = TestBed.inject(EmployeesManagementService);
    spyOn(employeeManagementServiceStub, 'getEmployees').and.returnValue(
      of(employeesListMock)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When there is a list of employees', () => {
    beforeEach(() => {
      const stats = spyOn(component, 'getEmployeesStats').and.callThrough();
      expect(stats).not.toHaveBeenCalled();
      component.ngOnInit();
      expect(stats).toHaveBeenCalledTimes(1);
    });

    it('should display the number of teams', () => {
      const teamsNumber = component.teams;
      expect(teamsNumber).toEqual(2);
    });

    it('should display the number of employees', () => {
      const employeesNumber = component.employeesNumber;
      expect(employeesNumber).toEqual(3);
    });

    it('should display the name of best employee', () => {
      const best = component.bestEmployee;
      expect(best).toEqual('Rebelle 2');
    });

    it('should display the name of last employee', () => {
      const newGuy = component.newbe;
      expect(newGuy).toEqual('Rebelle 3');
    });
  });
});
