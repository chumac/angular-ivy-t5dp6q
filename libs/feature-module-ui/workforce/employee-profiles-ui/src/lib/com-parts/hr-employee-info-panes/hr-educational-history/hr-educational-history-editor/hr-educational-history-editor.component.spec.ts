import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEducationalHistoryEditorComponent } from './hr-educational-history-editor.component';

describe('HrEducationalHistoryEditorComponent', () => {
  let component: HrEducationalHistoryEditorComponent;
  let fixture: ComponentFixture<HrEducationalHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEducationalHistoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEducationalHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
