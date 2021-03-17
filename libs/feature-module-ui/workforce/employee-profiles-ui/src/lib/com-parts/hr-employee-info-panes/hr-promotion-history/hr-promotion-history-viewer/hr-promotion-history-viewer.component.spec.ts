import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPromotionHistoryViewerComponent } from './hr-promotion-history-viewer.component';

describe('HrPromotionHistoryViewerComponent', () => {
  let component: HrPromotionHistoryViewerComponent;
  let fixture: ComponentFixture<HrPromotionHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPromotionHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPromotionHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
