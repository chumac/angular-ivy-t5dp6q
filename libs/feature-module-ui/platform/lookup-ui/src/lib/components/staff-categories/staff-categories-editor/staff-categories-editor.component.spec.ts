import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCategoriesEditorComponent } from './staff-categories-editor.component';

describe('StaffCategoriesEditorComponent', () => {
  let component: StaffCategoriesEditorComponent;
  let fixture: ComponentFixture<StaffCategoriesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffCategoriesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCategoriesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
