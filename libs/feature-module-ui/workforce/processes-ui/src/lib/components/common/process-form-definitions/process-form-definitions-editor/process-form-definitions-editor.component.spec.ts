import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessFormDefinitionsEditorComponent } from './processFormDefinitions-editor.component';

describe('ProcessFormDefinitionsEditorComponent', () => {
  let component: ProcessFormDefinitionsEditorComponent;
  let fixture: ComponentFixture<ProcessFormDefinitionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessFormDefinitionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessFormDefinitionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
