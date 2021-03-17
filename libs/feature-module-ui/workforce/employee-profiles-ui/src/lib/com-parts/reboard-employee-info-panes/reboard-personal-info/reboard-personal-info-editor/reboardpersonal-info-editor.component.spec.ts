import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationEditorComponent } from './personal-information-editor.component';

describe('PersonalInformationEditorComponent', () => {
  let component: PersonalInformationEditorComponent;
  let fixture: ComponentFixture<PersonalInformationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalInformationEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
