import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUserGroupsEditorComponent } from './custom-user-groups-editor.component';

describe('CustomUserGroupsEditorComponent', () => {
  let component: CustomUserGroupsEditorComponent;
  let fixture: ComponentFixture<CustomUserGroupsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomUserGroupsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUserGroupsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
