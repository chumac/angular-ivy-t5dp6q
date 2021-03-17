import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDependantsEditorComponent } from './hr-dependants-editor.component';

describe('HrDependantsEditorComponent', () => {
  let component: HrDependantsEditorComponent;
  let fixture: ComponentFixture<HrDependantsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDependantsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDependantsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
