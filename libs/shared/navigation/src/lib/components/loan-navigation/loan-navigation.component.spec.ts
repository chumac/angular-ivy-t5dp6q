import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanNavigationComponent } from './loan-navigation.component';

describe('LoanNavigationComponent', () => {
  let component: LoanNavigationComponent;
  let fixture: ComponentFixture<LoanNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
