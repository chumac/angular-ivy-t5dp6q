import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrWorkHistoryEditorComponent } from './hr-work-history-editor.component';

describe('HrWorkHistoryEditorComponent', () => {
  let component: HrWorkHistoryEditorComponent;
  let fixture: ComponentFixture<HrWorkHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrWorkHistoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrWorkHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
