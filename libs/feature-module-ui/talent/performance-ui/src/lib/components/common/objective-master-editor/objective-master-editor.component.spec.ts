import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveMasterEditorComponent } from './objective-master-editor.component';

describe('ObjectiveMasterEditorComponent', () => {
  let component: ObjectiveMasterEditorComponent;
  let fixture: ComponentFixture<ObjectiveMasterEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveMasterEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveMasterEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
