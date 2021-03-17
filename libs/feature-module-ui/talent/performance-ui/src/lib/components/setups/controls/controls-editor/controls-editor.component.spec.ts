import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsEditorComponent } from './controls-editor.component';

describe('ControlsEditorComponent', () => {
  let component: ControlsEditorComponent;
  let fixture: ComponentFixture<ControlsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
