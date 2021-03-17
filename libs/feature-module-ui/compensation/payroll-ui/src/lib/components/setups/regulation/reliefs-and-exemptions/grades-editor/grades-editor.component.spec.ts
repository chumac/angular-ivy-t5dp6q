import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesEditorComponent } from './grades-editor.component';

describe('GradesEditorComponent', () => {
  let component: GradesEditorComponent;
  let fixture: ComponentFixture<GradesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
