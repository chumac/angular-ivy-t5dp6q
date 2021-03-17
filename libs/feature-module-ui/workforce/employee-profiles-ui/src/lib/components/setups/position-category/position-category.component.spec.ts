import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCategoryComponent } from './position-category.component';

describe('PositionCategoryComponent', () => {
  let component: PositionCategoryComponent;
  let fixture: ComponentFixture<PositionCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
