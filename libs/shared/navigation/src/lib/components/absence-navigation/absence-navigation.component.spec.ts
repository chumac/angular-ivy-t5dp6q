import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceNavigationComponent } from './absence-navigation.component';

describe('AbsenceNavigationComponent', () => {
  let component: AbsenceNavigationComponent;
  let fixture: ComponentFixture<AbsenceNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
