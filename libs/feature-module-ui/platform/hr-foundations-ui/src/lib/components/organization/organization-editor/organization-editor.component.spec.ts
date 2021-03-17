import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationEditorComponent } from './organization-editor.component';

describe('OrganizationEditorComponent', () => {
  let component: OrganizationEditorComponent;
  let fixture: ComponentFixture<OrganizationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
