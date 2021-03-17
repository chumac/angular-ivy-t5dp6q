import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyNavigationComponent } from './competency-navigation.component';

describe('CompetencyNavigationComponent', () => {
  let component: CompetencyNavigationComponent;
  let fixture: ComponentFixture<CompetencyNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencyNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
