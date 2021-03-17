import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentStatusEditorComponent } from './employment-status-editor.component';

describe('EmploymentStatusEditorComponent', () => {
  let component: EmploymentStatusEditorComponent;
  let fixture: ComponentFixture<EmploymentStatusEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploymentStatusEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentStatusEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
