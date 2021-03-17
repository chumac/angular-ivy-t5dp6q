import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectivesEditorComponent } from './objectives-editor.component';

describe('ObjectivesEditorComponent', () => {
  let component: ObjectivesEditorComponent;
  let fixture: ComponentFixture<ObjectivesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectivesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
