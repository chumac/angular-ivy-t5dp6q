import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrIdentificationEditorComponent } from './hr-identification-editor.component';

describe('HrIdentificationEditorComponent', () => {
  let component: HrIdentificationEditorComponent;
  let fixture: ComponentFixture<HrIdentificationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrIdentificationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrIdentificationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
