import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationEditorComponent } from './identification-editor.component';

describe('IdentificationEditorComponent', () => {
  let component: IdentificationEditorComponent;
  let fixture: ComponentFixture<IdentificationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
