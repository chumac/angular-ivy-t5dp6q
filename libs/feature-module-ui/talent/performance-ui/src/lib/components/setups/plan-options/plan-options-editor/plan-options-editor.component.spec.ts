import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanOptionsEditorComponent } from './planOptions-editor.component';

describe('PlanOptionsEditorComponent', () => {
  let component: PlanOptionsEditorComponent;
  let fixture: ComponentFixture<PlanOptionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanOptionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanOptionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
