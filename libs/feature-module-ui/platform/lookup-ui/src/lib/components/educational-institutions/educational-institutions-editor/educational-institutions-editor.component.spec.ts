import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalInstitutionsEditorComponent } from './educational-institutions-editor.component';

describe('EducationalInstitutionsEditorComponent', () => {
  let component: EducationalInstitutionsEditorComponent;
  let fixture: ComponentFixture<EducationalInstitutionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalInstitutionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalInstitutionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
