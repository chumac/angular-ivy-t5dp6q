import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineManagersEditorComponent } from './lineManagers-editor.component';

describe('LineManagersEditorComponent', () => {
  let component: LineManagersEditorComponent;
  let fixture: ComponentFixture<LineManagersEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineManagersEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineManagersEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
