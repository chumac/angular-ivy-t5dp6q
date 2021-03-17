import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPaymentsViewerComponent } from './hr-payments-viewer.component';

describe('HrPaymentsViewerComponent', () => {
  let component: HrPaymentsViewerComponent;
  let fixture: ComponentFixture<HrPaymentsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPaymentsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPaymentsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
