import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShimmerPlaceholderComponent } from './shimmer-placeholder.component';

describe('ShimmerPlaceholderComponent', () => {
  let component: ShimmerPlaceholderComponent;
  let fixture: ComponentFixture<ShimmerPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShimmerPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShimmerPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
