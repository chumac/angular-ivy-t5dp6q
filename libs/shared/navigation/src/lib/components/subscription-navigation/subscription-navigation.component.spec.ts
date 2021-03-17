import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionNavigationComponent } from './subscription-navigation.component';

describe('SubscriptionNavigationComponent', () => {
  let component: SubscriptionNavigationComponent;
  let fixture: ComponentFixture<SubscriptionNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
