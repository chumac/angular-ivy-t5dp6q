import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveEditorComponent } from './objective-editor.component';

describe('ObjectiveEditorComponent', () => {
  let component: ObjectiveEditorComponent;
  let fixture: ComponentFixture<ObjectiveEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
