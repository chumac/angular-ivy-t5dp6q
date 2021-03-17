import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDisciplinaryActionsEditorComponent } from './hr-disciplinary-actions-editor.component';

describe('HrDisciplinaryActionsEditorComponent', () => {
  let component: HrDisciplinaryActionsEditorComponent;
  let fixture: ComponentFixture<HrDisciplinaryActionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDisciplinaryActionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDisciplinaryActionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
