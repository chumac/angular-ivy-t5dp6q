import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCategoriesComponent } from './staff-categories.component';

describe('StaffCategoriesComponent', () => {
  let component: StaffCategoriesComponent;
  let fixture: ComponentFixture<StaffCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
