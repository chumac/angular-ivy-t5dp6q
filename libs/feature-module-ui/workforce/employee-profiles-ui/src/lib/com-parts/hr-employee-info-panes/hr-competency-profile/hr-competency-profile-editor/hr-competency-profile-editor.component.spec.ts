import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCompetencyProfileEditorComponent } from './hr-competency-profile-editor.component';

describe('HrCompetencyProfileEditorComponent', () => {
  let component: HrCompetencyProfileEditorComponent;
  let fixture: ComponentFixture<HrCompetencyProfileEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrCompetencyProfileEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrCompetencyProfileEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
