import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependantsEditorComponent } from './dependants-editor.component';

describe('DependantsEditorComponent', () => {
  let component: DependantsEditorComponent;
  let fixture: ComponentFixture<DependantsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependantsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependantsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
