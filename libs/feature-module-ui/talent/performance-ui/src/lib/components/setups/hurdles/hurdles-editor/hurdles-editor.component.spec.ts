import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HurdlesEditorComponent } from './hurdles-editor.component';

describe('HurdlesEditorComponent', () => {
  let component: HurdlesEditorComponent;
  let fixture: ComponentFixture<HurdlesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HurdlesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HurdlesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
