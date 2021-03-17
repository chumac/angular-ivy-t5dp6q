import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUserGroupSetupsEditorComponent } from './custom-user-group-setups-editor.component';

describe('CustomUserGroupSetupsEditorComponent', () => {
  let component: CustomUserGroupSetupsEditorComponent;
  let fixture: ComponentFixture<CustomUserGroupSetupsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomUserGroupSetupsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUserGroupSetupsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
