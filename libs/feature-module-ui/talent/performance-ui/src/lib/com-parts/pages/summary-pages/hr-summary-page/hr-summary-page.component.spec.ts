import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSummaryPageComponent } from './hr-summary-page.component';

describe('HrSummaryPageComponent', () => {
  let component: HrSummaryPageComponent;
  let fixture: ComponentFixture<HrSummaryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrSummaryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
