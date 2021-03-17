import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarCardComponent } from './event-calendar-card.component';

describe('EventCalendarCardComponent', () => {
  let component: EventCalendarCardComponent;
  let fixture: ComponentFixture<EventCalendarCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventCalendarCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
