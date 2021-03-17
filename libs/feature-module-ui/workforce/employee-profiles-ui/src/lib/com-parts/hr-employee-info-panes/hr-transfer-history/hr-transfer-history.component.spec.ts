import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTransferHistoryComponent } from './hr-transfer-history.component';

describe('HrTransferHistoryComponent', () => {
  let component: HrTransferHistoryComponent;
  let fixture: ComponentFixture<HrTransferHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTransferHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTransferHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
