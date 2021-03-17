import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHistoryEditorComponent } from './work-history-editor.component';

describe('WorkHistoryEditorComponent', () => {
  let component: WorkHistoryEditorComponent;
  let fixture: ComponentFixture<WorkHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkHistoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
