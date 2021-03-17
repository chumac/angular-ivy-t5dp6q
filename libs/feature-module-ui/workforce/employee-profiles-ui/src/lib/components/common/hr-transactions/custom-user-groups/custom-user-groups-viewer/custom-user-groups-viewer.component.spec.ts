import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUserGroupsViewerComponent } from './custom-user-groups-viewer.component';

describe('CustomUserGroupsViewerComponent', () => {
  let component: CustomUserGroupsViewerComponent;
  let fixture: ComponentFixture<CustomUserGroupsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomUserGroupsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUserGroupsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
