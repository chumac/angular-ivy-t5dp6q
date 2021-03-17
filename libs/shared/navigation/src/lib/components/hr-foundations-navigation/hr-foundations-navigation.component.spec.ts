import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFoundationsNavigationComponent } from './hr-foundations-navigation.component';

describe('HrFoundationsNavigationComponent', () => {
  let component: HrFoundationsNavigationComponent;
  let fixture: ComponentFixture<HrFoundationsNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFoundationsNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFoundationsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
