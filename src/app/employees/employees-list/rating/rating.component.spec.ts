import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.score = 84;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });  

  it('should return a rounded score out of 10', () => {
    component.ngOnInit();
    expect(component.score).toEqual(8);
  })
});
