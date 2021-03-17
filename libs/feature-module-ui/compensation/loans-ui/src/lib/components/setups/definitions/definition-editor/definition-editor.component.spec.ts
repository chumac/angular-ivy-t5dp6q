import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionEditorComponent } from './definition-editor.component';

describe('DefinitionEditorComponent', () => {
  let component: DefinitionEditorComponent;
  let fixture: ComponentFixture<DefinitionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
