import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyEditorComponent } from './faculty-editor.component';

describe('FacultyEditorComponent', () => {
  let component: FacultyEditorComponent;
  let fixture: ComponentFixture<FacultyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
