import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePictureViewerComponent } from './profile-picture-viewer.component';

describe('ProfilePictureViewerComponent', () => {
  let component: ProfilePictureViewerComponent;
  let fixture: ComponentFixture<ProfilePictureViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePictureViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePictureViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
