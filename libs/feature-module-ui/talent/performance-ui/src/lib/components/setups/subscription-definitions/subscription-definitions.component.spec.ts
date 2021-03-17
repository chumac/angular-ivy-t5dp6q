import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDefinitionsComponent } from './subscriptionDefinitions.component';

describe('SubscriptionDefinitionsComponent', () => {
  let component: SubscriptionDefinitionsComponent;
  let fixture: ComponentFixture<SubscriptionDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
