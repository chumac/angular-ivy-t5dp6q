import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEmployeeLoadObjectivesEditorComponent } from './single-employee-load-objectives-editor.component';

describe('SingleEmployeeLoadObjectivesEditorComponent', () => {
  let component: SingleEmployeeLoadObjectivesEditorComponent;
  let fixture: ComponentFixture<SingleEmployeeLoadObjectivesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEmployeeLoadObjectivesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEmployeeLoadObjectivesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
