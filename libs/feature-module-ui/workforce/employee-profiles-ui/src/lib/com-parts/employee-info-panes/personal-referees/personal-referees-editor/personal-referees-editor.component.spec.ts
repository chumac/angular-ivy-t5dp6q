import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalRefereesEditorComponent } from './personal-referees-editor.component';

describe('PersonalRefereesEditorComponent', () => {
  let component: PersonalRefereesEditorComponent;
  let fixture: ComponentFixture<PersonalRefereesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalRefereesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalRefereesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
