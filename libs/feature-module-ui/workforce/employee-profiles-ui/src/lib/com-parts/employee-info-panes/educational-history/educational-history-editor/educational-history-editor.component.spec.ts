import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalHistoryEditorComponent } from './educational-history-editor.component';

describe('EducationalHistoryEditorComponent', () => {
  let component: EducationalHistoryEditorComponent;
  let fixture: ComponentFixture<EducationalHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EducationalHistoryEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
