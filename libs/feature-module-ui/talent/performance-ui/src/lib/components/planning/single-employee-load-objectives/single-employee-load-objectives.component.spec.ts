import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEmployeeLoadObjectivesComponent } from './single-employee-load-objectives.component';

describe('SingleEmployeeLoadObjectivesComponent', () => {
  let component: SingleEmployeeLoadObjectivesComponent;
  let fixture: ComponentFixture<SingleEmployeeLoadObjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEmployeeLoadObjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEmployeeLoadObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
