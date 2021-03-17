import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrVacationHistoryComponent } from './hr-vacation-history.component';

describe('HrVacationHistoryComponent', () => {
  let component: HrVacationHistoryComponent;
  let fixture: ComponentFixture<HrVacationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrVacationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrVacationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
