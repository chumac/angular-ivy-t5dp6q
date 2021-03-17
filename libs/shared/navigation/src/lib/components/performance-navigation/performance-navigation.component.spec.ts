import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceNavigationComponent } from './performance-navigation.component';

describe('PerformanceNavigationComponent', () => {
  let component: PerformanceNavigationComponent;
  let fixture: ComponentFixture<PerformanceNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
