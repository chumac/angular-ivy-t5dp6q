import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProfilePictureEditorComponent } from './hr-profile-picture-editor.component';

describe('HrProfilePictureEditorComponent', () => {
  let component: HrProfilePictureEditorComponent;
  let fixture: ComponentFixture<HrProfilePictureEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrProfilePictureEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrProfilePictureEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
