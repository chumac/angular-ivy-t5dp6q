import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailParticipantsComponent } from './event-detail-participants.component';

describe('EventDetailParticipantsComponent', () => {
  let component: EventDetailParticipantsComponent;
  let fixture: ComponentFixture<EventDetailParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
