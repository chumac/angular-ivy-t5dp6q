import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationCategoriesComponent } from './qualification-categories.component';

describe('QualificationCategoriesComponent', () => {
  let component: QualificationCategoriesComponent;
  let fixture: ComponentFixture<QualificationCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
