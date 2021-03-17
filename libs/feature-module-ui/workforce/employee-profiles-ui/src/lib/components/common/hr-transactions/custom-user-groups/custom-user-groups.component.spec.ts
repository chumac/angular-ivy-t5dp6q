import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUserGroupsComponent } from './custom-user-groups.component';

describe('CustomUserGroupsComponent', () => {
  let component: CustomUserGroupsComponent;
  let fixture: ComponentFixture<CustomUserGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomUserGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
