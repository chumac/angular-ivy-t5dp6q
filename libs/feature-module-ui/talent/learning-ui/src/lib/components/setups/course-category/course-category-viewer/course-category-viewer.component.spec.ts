import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoryViewerComponent } from './course-category-viewer.component';

describe('CourseCategoryViewerComponent', () => {
  let component: CourseCategoryViewerComponent;
  let fixture: ComponentFixture<CourseCategoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCategoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCategoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
