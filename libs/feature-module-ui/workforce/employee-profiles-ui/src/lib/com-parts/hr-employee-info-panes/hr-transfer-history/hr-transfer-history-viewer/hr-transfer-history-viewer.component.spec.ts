import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTransferHistoryViewerComponent } from './hr-transfer-history-viewer.component';

describe('HrTransferHistoryViewerComponent', () => {
  let component: HrTransferHistoryViewerComponent;
  let fixture: ComponentFixture<HrTransferHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTransferHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTransferHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
