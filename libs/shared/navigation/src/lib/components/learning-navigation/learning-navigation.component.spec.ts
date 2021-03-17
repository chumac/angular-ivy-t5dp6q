import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningNavigationComponent } from './learning-navigation.component';

describe('LearningNavigationComponent', () => {
  let component: LearningNavigationComponent;
  let fixture: ComponentFixture<LearningNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearningNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
