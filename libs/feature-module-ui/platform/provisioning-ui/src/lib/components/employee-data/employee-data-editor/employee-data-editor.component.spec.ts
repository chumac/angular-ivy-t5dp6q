import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataEditorComponent } from './employee-data-editor.component';

describe('EmployeeDataEditorComponent', () => {
  let component: EmployeeDataEditorComponent;
  let fixture: ComponentFixture<EmployeeDataEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDataEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
