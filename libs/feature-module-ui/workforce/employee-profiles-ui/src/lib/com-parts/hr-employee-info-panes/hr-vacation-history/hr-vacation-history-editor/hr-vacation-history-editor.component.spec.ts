import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrVacationHistoryEditorComponent } from './hr-vacation-history-editor.component';

describe('HrVacationHistoryEditorComponent', () => {
  let component: HrVacationHistoryEditorComponent;
  let fixture: ComponentFixture<HrVacationHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrVacationHistoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrVacationHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
