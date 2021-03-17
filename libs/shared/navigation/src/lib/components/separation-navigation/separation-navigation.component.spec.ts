import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparationNavigationComponent } from './separation-navigation.component';

describe('SeparationNavigationComponent', () => {
  let component: SeparationNavigationComponent;
  let fixture: ComponentFixture<SeparationNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeparationNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparationNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
