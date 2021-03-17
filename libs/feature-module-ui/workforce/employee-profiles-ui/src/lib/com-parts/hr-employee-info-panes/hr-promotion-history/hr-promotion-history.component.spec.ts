import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPromotionHistoryComponent } from './hr-promotion-history.component';

describe('HrPromotionHistoryComponent', () => {
  let component: HrPromotionHistoryComponent;
  let fixture: ComponentFixture<HrPromotionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPromotionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPromotionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
