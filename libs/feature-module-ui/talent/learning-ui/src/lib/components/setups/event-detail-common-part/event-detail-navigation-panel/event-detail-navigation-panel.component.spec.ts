import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailNavigationPanelComponent } from './event-detail-navigation-panel.component';

describe('EventDetailNavigationPanelComponent', () => {
  let component: EventDetailNavigationPanelComponent;
  let fixture: ComponentFixture<EventDetailNavigationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailNavigationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailNavigationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
