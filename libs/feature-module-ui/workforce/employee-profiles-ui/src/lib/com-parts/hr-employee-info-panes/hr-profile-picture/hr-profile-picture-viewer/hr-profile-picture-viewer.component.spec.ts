import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProfilePictureViewerComponent } from './hr-profile-picture-viewer.component';

describe('HrProfilePictureViewerComponent', () => {
  let component: HrProfilePictureViewerComponent;
  let fixture: ComponentFixture<HrProfilePictureViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrProfilePictureViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrProfilePictureViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
