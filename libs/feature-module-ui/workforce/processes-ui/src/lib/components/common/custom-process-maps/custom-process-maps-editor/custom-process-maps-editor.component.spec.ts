import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProcessMapsEditorComponent } from './customProcessMaps-editor.component';

describe('CustomProcessMapsEditorComponent', () => {
  let component: CustomProcessMapsEditorComponent;
  let fixture: ComponentFixture<CustomProcessMapsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomProcessMapsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProcessMapsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
