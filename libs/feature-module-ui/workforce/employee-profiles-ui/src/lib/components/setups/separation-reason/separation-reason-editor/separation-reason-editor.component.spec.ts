import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparationReasonEditorComponent } from './separation-reason-editor.component';

describe('SeparationReasonEditorComponent', () => {
  let component: SeparationReasonEditorComponent;
  let fixture: ComponentFixture<SeparationReasonEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparationReasonEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparationReasonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
