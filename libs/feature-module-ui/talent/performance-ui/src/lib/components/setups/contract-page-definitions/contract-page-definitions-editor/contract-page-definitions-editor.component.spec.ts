import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPageDefinitionsEditorComponent } from './contractPageDefinitions-editor.component';

describe('ContractPageDefinitionsEditorComponent', () => {
  let component: ContractPageDefinitionsEditorComponent;
  let fixture: ComponentFixture<ContractPageDefinitionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPageDefinitionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPageDefinitionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
