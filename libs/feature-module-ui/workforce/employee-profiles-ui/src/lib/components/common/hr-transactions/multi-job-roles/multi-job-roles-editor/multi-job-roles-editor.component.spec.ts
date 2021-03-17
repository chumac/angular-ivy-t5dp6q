import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiJobRolesEditorComponent } from './multi-job-roles-editor.component';

describe('MultiJobRolesEditorComponent', () => {
  let component: MultiJobRolesEditorComponent;
  let fixture: ComponentFixture<MultiJobRolesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiJobRolesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiJobRolesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
