import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTrainingHistoryEditorComponent } from './hr-training-history-editor.component';

describe('HrTrainingHistoryEditorComponent', () => {
  let component: HrTrainingHistoryEditorComponent;
  let fixture: ComponentFixture<HrTrainingHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTrainingHistoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTrainingHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
