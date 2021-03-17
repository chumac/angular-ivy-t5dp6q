import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProfilePictureComponent } from './hr-profile-picture.component';

describe('HrProfilePictureComponent', () => {
  let component: HrProfilePictureComponent;
  let fixture: ComponentFixture<HrProfilePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrProfilePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
