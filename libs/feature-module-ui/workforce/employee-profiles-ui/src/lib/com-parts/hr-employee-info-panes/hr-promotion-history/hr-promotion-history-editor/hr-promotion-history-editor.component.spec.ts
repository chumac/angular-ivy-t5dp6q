import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPromotionHistoryEditorComponent } from './hr-promotion-history-editor.component';

describe('HrPromotionHistoryEditorComponent', () => {
  let component: HrPromotionHistoryEditorComponent;
  let fixture: ComponentFixture<HrPromotionHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPromotionHistoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPromotionHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
