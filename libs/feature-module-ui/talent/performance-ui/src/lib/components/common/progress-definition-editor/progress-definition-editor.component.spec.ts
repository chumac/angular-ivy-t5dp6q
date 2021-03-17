import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDefinitionEditorComponent } from './progress-definition-editor.component';

describe('ProgressDefinitionEditorComponent', () => {
  let component: ProgressDefinitionEditorComponent;
  let fixture: ComponentFixture<ProgressDefinitionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressDefinitionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressDefinitionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
