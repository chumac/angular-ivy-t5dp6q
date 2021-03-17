import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePictureEditorComponent } from './profile-picture-editor.component';

describe('ProfilePictureEditorComponent', () => {
  let component: ProfilePictureEditorComponent;
  let fixture: ComponentFixture<ProfilePictureEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePictureEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePictureEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
