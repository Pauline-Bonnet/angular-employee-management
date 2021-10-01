import { EmployeesManagementService } from './../../management/employees-management.service';
import { of } from 'rxjs';
import { employeesListMock } from './../../management/helpers/employees.helper';
import { FilterPipe } from './../filter/filter.pipe';
import { Employee } from './../../management/employee';
import { CardModule } from 'primeng/card';
import { StatisticsComponent } from './../../statistics-area/statistics/statistics.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { DebugElement, Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'filterPipe'})
class MockFilterPipe implements PipeTransform {
    transform(items: Employee[], searchText: string) {
        searchText = searchText.toLocaleLowerCase();
        const result = items.filter(employee => {
            return employee.name.toLocaleLowerCase().includes(searchText);
        });
    }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(() => {
    const employeeManagementServiceStub = () => ({
      getEmployees: () => ({ subscribe: (f: any) => f({}) })
    });

    TestBed.configureTestingModule({
      declarations: [ ListComponent, StatisticsComponent, MockFilterPipe  ],
      imports: [ HttpClientTestingModule, RouterTestingModule, CardModule ],
      providers: [ 
        {provide: EmployeesManagementService, useFactory: employeeManagementServiceStub},
        {provide: FilterPipe, useClass: MockFilterPipe}, 
      ]
    });

    spyOn(MockFilterPipe.prototype, 'transform');
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    debug = fixture.debugElement;
    element = debug.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('use cases', () => {
    beforeEach(() => {
      const employeeManagementServiceStub = TestBed.inject(EmployeesManagementService);
      spyOn(employeeManagementServiceStub, 'getEmployees').and.returnValue(
        of(employeesListMock)
      );
      fixture.detectChanges();
    });

    it('should starts with list of employees returned by getEmployees', () => {
      const employees = component.employeesList;
      expect(employees.length).toBe(3);
    });
  });
});
