import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiEmployeeLoadObjectivesComponent } from './multi-employee-load-objectives.component';

describe('MultiEmployeeLoadObjectivesComponent', () => {
  let component: MultiEmployeeLoadObjectivesComponent;
  let fixture: ComponentFixture<MultiEmployeeLoadObjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiEmployeeLoadObjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiEmployeeLoadObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
