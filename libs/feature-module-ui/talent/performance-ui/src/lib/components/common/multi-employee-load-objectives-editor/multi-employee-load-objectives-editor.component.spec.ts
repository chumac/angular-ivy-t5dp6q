import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiEmployeeLoadObjectivesEditorComponent } from './multi-employee-load-objectives-editor.component';

describe('MultiEmployeeLoadObjectivesEditorComponent', () => {
  let component: MultiEmployeeLoadObjectivesEditorComponent;
  let fixture: ComponentFixture<MultiEmployeeLoadObjectivesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiEmployeeLoadObjectivesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiEmployeeLoadObjectivesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
