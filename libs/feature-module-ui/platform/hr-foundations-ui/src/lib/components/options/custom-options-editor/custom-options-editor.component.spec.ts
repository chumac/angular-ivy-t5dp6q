import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOptionsEditorComponent } from './custom-options-editor.component';

describe('CustomOptionsEditorComponent', () => {
  let component: CustomOptionsEditorComponent;
  let fixture: ComponentFixture<CustomOptionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomOptionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomOptionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
