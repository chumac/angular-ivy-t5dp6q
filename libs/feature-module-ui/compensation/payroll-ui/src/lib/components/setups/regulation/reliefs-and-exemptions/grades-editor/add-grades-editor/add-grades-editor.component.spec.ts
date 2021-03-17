import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGradesEditorComponent } from './add-grades-editor.component';

describe('AddGradesEditorComponent', () => {
  let component: AddGradesEditorComponent;
  let fixture: ComponentFixture<AddGradesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGradesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGradesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
