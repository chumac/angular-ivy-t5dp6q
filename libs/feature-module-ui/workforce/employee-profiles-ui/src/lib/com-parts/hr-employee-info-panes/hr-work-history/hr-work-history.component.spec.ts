import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrWorkHistoryComponent } from './hr-work-history.component';

describe('HrWorkHistoryComponent', () => {
  let component: HrWorkHistoryComponent;
  let fixture: ComponentFixture<HrWorkHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrWorkHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrWorkHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
