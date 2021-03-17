import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsViewerComponent } from './subscriptions-viewer.component';

describe('SubscriptionsViewerComponent', () => {
  let component: SubscriptionsViewerComponent;
  let fixture: ComponentFixture<SubscriptionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionsViewerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
