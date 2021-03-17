import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDefinitionsViewerComponent } from './subscriptionDefinitions-viewer.component';

describe('SubscriptionDefinitionsViewerComponent', () => {
  let component: SubscriptionDefinitionsViewerComponent;
  let fixture: ComponentFixture<SubscriptionDefinitionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionDefinitionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDefinitionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
