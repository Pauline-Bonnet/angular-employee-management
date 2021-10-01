import { rebelMock } from './../../management/helpers/employees.helper';
import { RatingComponent } from './../rating/rating.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FilterPipe } from './../filter/filter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from './card.component';
import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Pipe({name: 'getAge'})
class MockAgePipe implements PipeTransform {
    transform(birthDate: string): number {
        const [yearBirth, monthBirth, dayBirth] =  birthDate.split('-')
        const newDate = new Date(
            parseInt(yearBirth), 
            parseInt(monthBirth), 
            parseInt(dayBirth)
        );

        const today = new Date();
        const age = today.getFullYear() - newDate.getFullYear();
        const month = today.getMonth() - newDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < newDate.getDate())) {
            return age - 1;
        }
        return age;
    }
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debug: DebugElement;
  let element: HTMLElement;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent, RatingComponent, MockAgePipe ],
      imports: [ RouterTestingModule, HttpClientTestingModule, CardModule, ButtonModule ],
      providers: [
          { provide: FilterPipe, useClass: MockAgePipe },
          { provide: Router, useValue: routerSpy }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const employee = rebelMock;
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.employee = employee;
    fixture.detectChanges();

    debug = fixture.debugElement;
    element = debug.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display employee\'s name', () => {
      const name = fixture.debugElement.query(By.css('p-card .p-card-title'));
      expect(name).toBeTruthy();
      expect(name.nativeElement.textContent).toBe(' Fifoo ')
  })

  it('should display employee\'s email address', () => {
    const email = fixture.debugElement.query(By.css('p:nth-of-type(2)'));
    expect(email).toBeTruthy();
    expect(email.nativeElement.textContent).toBe('Contact : rebel@gmail.com');
  });

  it('should display employee\'s age', () => {
    const age = fixture.debugElement.query(By.css('p:nth-of-type(3)'));
    expect(age).toBeTruthy();
    expect(age.nativeElement.textContent).toBe('Âge : 24 ans');
  });

  it('should display employee\'s recrutement date', () => {
    const recrutement = fixture.debugElement.query(By.css('p:nth-of-type(4)'));
    expect(recrutement).toBeTruthy();
    expect(recrutement.nativeElement.textContent).toBe('Recrutement dans l\'alliance : 01/02/2015');
  });

  it('should redirect to employee\'s details when click on button', () => {
    const employee = rebelMock;  
    const button = element.querySelector('p-button') as HTMLButtonElement;
      expect(button).toBeTruthy();

      button.click();

      fixture.whenStable();
      fixture.detectChanges();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['employees/', employee.id]);
  })
});
