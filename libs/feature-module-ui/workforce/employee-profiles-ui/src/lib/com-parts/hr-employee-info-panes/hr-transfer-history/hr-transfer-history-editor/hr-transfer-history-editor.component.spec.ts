import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTransferHistoryEditorComponent } from './hr-transfer-history-editor.component';

describe('HrTransferHistoryEditorComponent', () => {
  let component: HrTransferHistoryEditorComponent;
  let fixture: ComponentFixture<HrTransferHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTransferHistoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTransferHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
