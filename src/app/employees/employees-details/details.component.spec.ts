import { of } from 'rxjs';
import { rebelMock } from './../management/helpers/employees.helper';
import { EmployeesManagementService } from './../management/employees-management.service';
import { ButtonModule } from 'primeng/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let employeeManagementServiceStub: any;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ DetailsComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, ButtonModule ],
      providers: [
        { provide: EmployeesManagementService, useFactory: employeeManagementServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    debug = fixture.debugElement;
    element = debug.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with employee', () => {
    beforeEach(() => {
      const employeeManagementServiceStub = TestBed.inject(EmployeesManagementService);
      spyOn(employeeManagementServiceStub, 'getEmployee').and.returnValue(
        of(rebelMock)
      );
      fixture.detectChanges();
    });

    it('displays employee\'s name when initialized with an employee', () => {
      const h1 = fixture.debugElement.query(By.css('h1'));
      expect(h1).toBeTruthy();
      expect(h1.nativeElement.textContent).toBe('Fifoo');
    });
    
    it('displays employee\'s email adress when initialized with an employee', () => {
      const email = fixture.debugElement.query(By.css('p:nth-of-type(1)'));
      expect(email).toBeTruthy();
      expect(email.nativeElement.textContent).toBe('Contact : rebel@gmail.com');
    });

    it('displays employee\'s job position when initialized with an employee', () => {
      const position = fixture.debugElement.query(By.css('p:nth-of-type(2)'));
      expect(position).toBeTruthy();
      expect(position.nativeElement.textContent).toBe('Position : Frontend Engineer');
    });

    it('displays employee\'s team when initialized with an employee', () => {
      const team = fixture.debugElement.query(By.css('p:nth-of-type(3)'));
      expect(team).toBeTruthy();
      expect(team.nativeElement.textContent).toBe('Equipe d\'intervention : A');
    });

    it('displays employee\'s recrutement date when initialized with an employee', () => {
      const date = fixture.debugElement.query(By.css('p:nth-of-type(4)'));
      expect(date).toBeTruthy();
      expect(date.nativeElement.textContent).toBe('Recrutement : 01/02/2015');
    });

    it('calls router to go back when Back button is clicked', () => {
      const router = spyOn(TestBed.inject(Router), 'navigate').and.callFake(() => new Promise(() => true));
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      expect(router).toHaveBeenCalledWith(['/']);
    });

    describe('with projects', () => {
      beforeEach(() => {
        const employeeManagementServiceStub = TestBed.inject(EmployeesManagementService);
        spyOn(employeeManagementServiceStub, 'getProjects').and.returnValue(of());
        fixture.detectChanges();
      });

      it('should call the method getProjects in component', () => {
        const projectsCall = spyOn(component, 'getProjects').and.callThrough();
        expect(projectsCall).not.toHaveBeenCalled();
        component.ngOnInit();
        expect(projectsCall).toHaveBeenCalledTimes(1);
      });
    })
  });
});
